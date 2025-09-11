import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react'

export default function AdminProductsIndex({ products }: any) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.data.map((p: any) => {
          const cover = p.images?.[0]
          return (
            <Link key={p.id} href={`/admin/products/${p.id}/edit`} className="border rounded p-3 flex gap-3">
              <div className="size-20 rounded overflow-hidden bg-gray-100 dark:bg-gray-900">
                {cover ? <img src={`/storage/${cover.path}`} className="h-full w-full object-cover" /> : null}
              </div>
              <div className="flex-1">
                <div className="font-medium">{p.name}</div>
                <div className="text-sm opacity-80">${p.price} — {p.category?.name}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
    </div>
  </AppLayout>
  )
}


