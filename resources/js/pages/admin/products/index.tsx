import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react'
import { Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export default function AdminProductsIndex({ products }: { products: PaginatedResponse<Product> }) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Products',
      href: '/admin/products',
    },
  ];
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Products" />
    <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Products</h1>
        <button onClick={() => router.visit('/admin/products/create')} className="border px-3 py-1 rounded">New</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.data.map((p: Product) => {
          const cover = p.images?.[0]
          return (
            <div key={p.id} className="border rounded-lg p-4 flex flex-col h-full group relative hover:shadow-md transition-shadow">
              <Link href={`/admin/products/${p.id}/edit`} className="flex-1 flex flex-col">
                <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 mb-3">
                  {cover ? (
                    <img 
                      src={`/storage/${cover.path}`} 
                      alt={p.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://placehold.co/400x400?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-lg mb-1 line-clamp-2">{p.name}</div>
                  <div className="flex items-center gap-2 mb-1">
                    {p.sale_price ? (
                      <>
                        <span className="text-red-600 font-semibold">${p.sale_price}</span>
                        <span className="text-gray-500 line-through text-sm">${p.price}</span>
                      </>
                    ) : (
                      <span className="font-semibold">${p.price}</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {p.category?.name || 'Uncategorized'}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {p.is_featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Featured
                      </span>
                    )}
                    {!p.is_active && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              <div className="flex flex-col gap-2 absolute top-2 right-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.get(`/admin/products/${p.id}/edit`);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (confirm('Are you sure you want to delete this product?')) {
                      router.delete(`/admin/products/${p.id}`, {
                        preserveScroll: true,
                        onSuccess: () => {
                          // Optional: Show a success message
                        },
                      });
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
    </div>
  </AppLayout>
  )
}


