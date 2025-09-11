import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types';
import { Form, Head,  router } from '@inertiajs/react'
import { Category } from '@/types';

export default function AdminCategoryForm({ category }: { category: Category }) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Categories',
      href: '/admin/categories',
    },
  ];
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Categories" />
    <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
    <div className="p-6 max-w-2xl">
      <h1 className="text-xl font-semibold mb-4">{category ? 'Edit' : 'New'} Category</h1>
      <Form
        method={category ? 'post' : 'post'}
        action={category ? `/admin/categories/${category.id}` : `/admin/categories`}
        transform={(data) => {
          if (category) (data as Category)._method = 'put'
          return data
        }}
        encType="multipart/form-data"
      >
        {({ processing, errors }) => (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input name="name" defaultValue={category?.name ?? ''} className="w-full border rounded px-2 py-1 bg-transparent" />
              {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
            </div>
            <div>
              <label className="block text-sm mb-1">Description</label>
              <textarea name="description" defaultValue={category?.description ?? ''} className="w-full border rounded px-2 py-1 bg-transparent" />
            </div>
            <div>
              <label className="block text-sm mb-1">Image</label>
              <input type="file" name="image" />
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="is_active" defaultChecked={category?.is_active ?? true} /> Active
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="is_featured" defaultChecked={category?.is_featured ?? false} /> Featured
              </label>
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={processing} className="border rounded px-3 py-1">{processing ? 'Saving...' : 'Save'}</button>
              <button type="button" onClick={() => router.visit('/admin/categories')} className="border rounded px-3 py-1">Cancel</button>
            </div>
          </div>
        )}
      </Form>
    </div>
    </div>
  </AppLayout>
  )
}


