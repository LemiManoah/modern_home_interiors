import ShopHeader from '@/components/shop/header'
import Footer from '@/components/shop/footer'
import { Link } from '@inertiajs/react'
import { useState } from 'react'

export default function ProductShow({ product, similar }: any) {
  const [active, setActive] = useState(product.images?.[0] ?? null)
  return (
    <div className="min-h-screen flex flex-col">
      <ShopHeader />
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div>
          <div className="aspect-square overflow-hidden rounded border bg-gray-50 dark:bg-gray-900">
            {active ? (
              <img src={`/storage/${active.path}`} alt={product.name} className="h-full w-full object-cover" />
            ) : null}
          </div>
          <div className="mt-2 grid grid-cols-5 gap-2">
            {product.images?.map((img: any) => (
              <button key={img.id} className={`aspect-square border rounded overflow-hidden ${active?.id === img.id ? 'ring-2 ring-black dark:ring-white' : ''}`} onClick={() => setActive(img)}>
                <img src={`/storage/${img.path}`} alt="thumb" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="mt-2 text-xl font-medium">${product.price}</div>
          <p className="mt-4 opacity-80 whitespace-pre-line">{product.description}</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            {product.tags?.map((t: any) => (
              <span key={t.id} className="text-xs border rounded px-2 py-0.5">{t.name}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-10 w-full">
        <h2 className="text-lg font-semibold mb-3">Similar products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {similar.map((p: any) => {
            const cover = p.images?.[0]
            return (
              <Link key={p.id} href={`/products/${p.id}`} className="group">
                <div className="aspect-square overflow-hidden rounded border bg-gray-50 dark:bg-gray-900">
                  {cover ? (
                    <img src={`/storage/${cover.path}`} alt={p.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                  ) : null}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span>{p.name}</span>
                  <span className="font-medium">${p.price}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}


