import { Link, router } from '@inertiajs/react'

type Image = { id: number; path: string; is_primary: boolean; position: number }
type Product = { id: number; name: string; price: string; images: Image[]; description?: string }
type Category = { id: number; name: string; products: Product[] }

export default function ProductsByCategory({ categories }: { categories: Category[] }) {
  return (
    <div className="w-full space-y-16 md:space-y-24 mt-16">
      <h1 className="text-3xl md:text-4xl font-light tracking-wider uppercase ml-4 md:ml-8">Explore Our Products</h1>
      {categories.map((category) => (
        <section key={category.id} className="w-full">
          {/* Category Header */}
          <div className="w-full px-4 md:px-8 lg:px-12 mb-6 md:mb-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <h2 className="text-2xl md:text-3xl font-light tracking-wider uppercase">
                  {category.name}
                </h2>
                <button
                  onClick={() => router.visit(`/catalogue?category_id=${category.id}`)}
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200 flex items-center"
                >
                  View all
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full overflow-x-auto">
            <div className="inline-flex space-x-6 px-4 md:px-8 lg:px-12 pb-8">
              {category.products.map((product) => {
                const cover = product.images.find((i) => i.is_primary) ?? product.images[0]
                return (
                  <div key={product.id} className="w-48 md:w-60 flex-shrink-0 group">
                    <Link href={`/products/${product.id}`} className="block">
                      {/* Product Image */}
                      <div className="relative overflow-hidden bg-gray-50 aspect-[2/3] mb-3">
                        {cover ? (
                          <img
                            src={`/storage/${cover.path}`}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300" />
                      </div>

                      {/* Product Info */}
                      <div className="px-1">
                        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-xs text-gray-500 mb-1 line-clamp-2 h-8">
                            {product.description}
                          </p>
                        )}
                        <p className="text-sm font-medium">${product.price}</p>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
