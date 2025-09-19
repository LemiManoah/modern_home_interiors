import ShopHeader from '@/components/shop/header'
import Footer from '@/components/shop/footer'
import { Link } from '@inertiajs/react'
import { useState } from 'react'
import { MessageSquare, Phone } from 'lucide-react'
import { Product, ProductImage } from '@/types'

export default function ProductShow({ product, similar }: { product: Product; similar: Product[] }) {
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
            {product.images?.map((img: ProductImage) => (
              <button key={img.id} className={`aspect-square border rounded overflow-hidden ${active?.id === img.id ? 'ring-2 ring-black dark:ring-white' : ''}`} onClick={() => setActive(img)}>
                <img src={`/storage/${img.path}`} alt="thumb" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <div className="flex items-baseline gap-3 mt-2">
              {product.sale_price ? (
                <>
                  <span className="text-2xl font-bold text-red-600">
                    UGX {Number(product.sale_price).toLocaleString('en-US')}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    UGX {Number(product.price).toLocaleString('en-US')}
                  </span>
                  <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded">
                    {Math.round(((product.price - product.sale_price) / product.price) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold">
                  UGX {Number(product.price).toLocaleString('en-US')}
                </span>
              )}
            </div>
            {product.stock_quantity > 0 ? (
              <div className="mt-2 text-sm text-green-600">
                In Stock ({product.stock_quantity} available)
              </div>
            ) : (
              <div className="mt-2 text-sm text-red-600">Out of Stock</div>
            )}
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">Product Details</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{product.description}</p>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">Category</h3>
            <p className="text-gray-700 dark:text-gray-300">{product.category?.name || 'Uncategorized'}</p>
          </div>

          {/* Contact Section */}
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Contact Seller</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Interested in this product? Contact us directly for more information or to place an order.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`https://wa.me/256775394449?text=I'm interested in ${encodeURIComponent(product.name)} (${window.location.href})`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="tel:+256775394449"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-10 w-full">
        <h2 className="text-lg font-semibold mb-3">Similar products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {similar.map((p: Product) => {
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
                  <span className="font-medium">UGX {Number(p.price).toLocaleString('en-US')}</span>
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


