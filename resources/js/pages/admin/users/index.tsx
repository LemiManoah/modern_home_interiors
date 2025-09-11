import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react'

export default function AdminUsersIndex({ users }: any) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Users',
      href: '/admin/users',
    },
  ];
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Users" />
    <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Users</h1>
        <button onClick={() => router.visit('/admin/users/create')} className="border px-3 py-1 rounded">New</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((u: any) => (
              <tr key={u.id} className="border-b">
                <td className="py-2 pr-4">{u.name}</td>
                <td className="py-2 pr-4">{u.email}</td>
                <td className="py-2">
                  <button onClick={() => router.visit(`/admin/users/${u.id}/edit`)} className="underline">Edit</button>
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


