import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react'

export default function AdminCategoriesIndex({ categories }: any) {
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
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Categories</h1>
        <button onClick={() => router.visit('/admin/categories/create')} className="border px-3 py-1 rounded">New</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Active</th>
              <th className="py-2 pr-4">Featured</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.data.map((c: any) => (
              <tr key={c.id} className="border-b">
                <td className="py-2 pr-4">{c.name}</td>
                <td className="py-2 pr-4">{c.is_active ? 'Yes' : 'No'}</td>
                <td className="py-2 pr-4">{c.is_featured ? 'Yes' : 'No'}</td>
                <td className="py-2">
                  <button onClick={() => router.visit(`/admin/categories/${c.id}/edit`)} className="underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </AppLayout>
  )
}


