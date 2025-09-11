  import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types';
import { Form, Head, router } from '@inertiajs/react'

  export default function AdminUserForm({ user }: any) {
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
      <div className="p-6 max-w-2xl">
        <h1 className="text-xl font-semibold mb-4">{user ? 'Edit' : 'New'} User</h1>
        <Form
          method="post"
          action={user ? `/admin/users/${user.id}/update` : `/admin/users/store`}
          transform={(data) => {
            if (user) (data as any)._method = 'put'
            return data
          }}
        >
          {({ processing, errors }) => (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input name="name" defaultValue={user?.name ?? ''} className="w-full border rounded px-2 py-1 bg-transparent" />
                {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input name="email" type="email" defaultValue={user?.email ?? ''} className="w-full border rounded px-2 py-1 bg-transparent" />
                {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
              </div>
              <div>
                <label className="block text-sm mb-1">Password {user && <span className="opacity-70">(leave blank to keep)</span>}</label>
                <input name="password" type="password" className="w-full border rounded px-2 py-1 bg-transparent" />
                {errors.password && <div className="text-red-600 text-sm">{errors.password}</div>}
              </div>
              <div className="flex gap-2">
                <button disabled={processing} className="border rounded px-3 py-1">{processing ? 'Saving...' : 'Save'}</button>
                <button onClick={() => router.visit('/admin/users')} className="border rounded px-3 py-1">Cancel</button>
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  </AppLayout>
    )
  }


