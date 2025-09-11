import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types';
import { Form, Link, useForm, router, Head } from '@inertiajs/react'
import { useState } from 'react'

export default function AdminProductForm({ product, categories }: any) {
  const [previews, setPreviews] = useState<string[]>([])
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Products',
      href: '/admin/products',
    },
  ];
  function onFilesChanged(files: FileList | null) {
    if (!files) return
    const urls = Array.from(files).map((f) => URL.createObjectURL(f))
    setPreviews(urls)
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Products" />
    <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
    <div className="p-6 max-w-3xl">
      <h1 className="text-xl font-semibold mb-4">{product ? 'Edit' : 'New'} Product</h1>
      <Form
        method="post"
        action={product ? `/admin/products/${product.id}/update` : `/admin/products/store`}
        transform={(data) => {
          if (product) (data as any)._method = 'put'
          return data
        }}
        encType="multipart/form-data"
      >
        {({ processing, errors }) => (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input name="name" defaultValue={product?.name ?? ''} className="w-full border rounded px-2 py-1 bg-transparent" />
                {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
              </div>
              <div>
                <label className="block text-sm mb-1">Price</label>
                <input name="price" type="number" step="0.01" defaultValue={product?.price ?? ''} className="w-full border rounded px-2 py-1 bg-transparent" />
                {errors.price && <div className="text-red-600 text-sm">{errors.price}</div>}
              </div>
              <div>
                <label className="block text-sm mb-1">Category</label>
                <select name="category_id" defaultValue={product?.category_id ?? ''} className="w-full border rounded px-2 py-1 bg-transparent">
                  <option value="">Select...</option>
                  {categories.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {errors.category_id && <div className="text-red-600 text-sm">{errors.category_id}</div>}
              </div>
              <div className="flex gap-4 items-end">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="is_active" defaultChecked={product?.is_active ?? true} /> Active
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="is_featured" defaultChecked={product?.is_featured ?? false} /> Featured
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Description</label>
              <textarea name="description" defaultValue={product?.description ?? ''} className="w-full border rounded px-2 py-1 bg-transparent" />
            </div>

            <div>
              <label className="block text-sm mb-1">Images (you can select multiple)</label>
              <input type="file" name="images[]" multiple onChange={(e) => onFilesChanged(e.currentTarget.files)} />
              <input type="hidden" name="primary_image_index" value={0} />
              <div className="mt-2 grid grid-cols-5 gap-2">
                {previews.map((src, idx) => (
                  <div key={idx} className="aspect-square border rounded overflow-hidden">
                    <img src={src} className="h-full w-full object-cover" />
                  </div>
                ))}
                {!previews.length && product?.images?.map((img: any) => (
                  <div key={img.id} className="aspect-square border rounded overflow-hidden">
                    <img src={`/storage/${img.path}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button disabled={processing} className="border rounded px-3 py-1">{processing ? 'Saving...' : 'Save'}</button>
              <button onClick={() => router.visit('/admin/products')} className="border rounded px-3 py-1">Cancel</button>
            </div>
          </div>
        )}
      </Form>
    </div>
    </div>
  </AppLayout>
  )
}


