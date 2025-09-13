import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react'
import { Category } from '@/types';

export default function AdminCategoryForm({ category }: { category: Category }) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Categories',
      href: '/admin/categories',
    },
  ];
  const { data, setData, post, put, processing, errors } = useForm({
    name: category?.name || '',
    description: category?.description || '',
    is_active: category?.is_active ?? true,
    is_featured: category?.is_featured ?? false,
    image: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (category) {
      put(`/admin/categories/${category.id}`, {
        onSuccess: () => {
          router.visit('/admin/categories');
        },
        preserveScroll: true,
      });
    } else {
      post('/admin/categories', {
        onSuccess: () => {
          router.visit('/admin/categories');
        },
        preserveScroll: true,
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Categories" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="p-6 max-w-2xl">
          <h1 className="text-xl font-semibold mb-4">{category ? 'Edit' : 'New'} Category</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  className="w-full border rounded px-2 py-1 bg-transparent"
                />
                {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
              </div>
              <div>
                <label htmlFor="description" className="block text-sm mb-1">Description</label>
                <textarea
                  id="description"
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                  className="w-full border rounded px-2 py-1 bg-transparent"
                />
                {errors.description && <div className="text-red-600 text-sm">{errors.description}</div>}
              </div>
              <div>
                <label htmlFor="image" className="block text-sm mb-1">Image</label>
                <input
                  id="image"
                  type="file"
                  onChange={e => setData('image', e.target.files ? e.target.files[0] : null)}
                  className="w-full"
                />
                {errors.image && <div className="text-red-600 text-sm">{errors.image}</div>}
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={data.is_active}
                    onChange={e => setData('is_active', e.target.checked)}
                    className="rounded"
                  />
                  Active
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={data.is_featured}
                    onChange={e => setData('is_featured', e.target.checked)}
                    className="rounded"
                  />
                  Featured
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={processing}
                  className="border rounded px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => router.visit('/admin/categories')}
                  className="border rounded px-3 py-1 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}


