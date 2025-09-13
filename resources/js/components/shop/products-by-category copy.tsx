import { Link, router } from '@inertiajs/react'
import { useState, useEffect } from 'react'

interface ProductImage {
  id: number;
  path: string;
  is_primary: boolean;
  position: number;
}

interface Product {
  id: number;
  name: string;
  price: string;
  sale_price: string | null;
  description?: string;
  images: ProductImage[];
}

interface Category {
  id: number;
  name: string;
  products: Product[];
}

const ProductImageDisplay = ({ product }: { product: Product }) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [imageSrc, setImageSrc] = useState<string>('');
  
  const primaryImagePath =
    product.images.find(img => img.is_primary)?.path ||
    product.images[0]?.path || '';

  useEffect(() => {
    if (!primaryImagePath) {
      setImageState('error');
      return;
    }

    const fullPath = primaryImagePath.startsWith('http') 
      ? primaryImagePath 
      : `/storage/${primaryImagePath}`;
      
    setImageSrc(fullPath);
    setImageState('loading');

    const img = new Image();
    img.onload = () => setImageState('loaded');
    img.onerror = () => setImageState('error');
    img.src = fullPath;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [primaryImagePath]);

  if (imageState === 'error') {
    return <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">No image</div>
  }

  if (imageState === 'loading') {
    return <div className="w-full h-full bg-gray-100 animate-pulse" />
  }

  return (
    <img
      src={imageSrc}
      alt={product.name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      onError={() => setImageState('error')}
    />
  )
}

export default function ProductsByCategory({ categories }: { categories: Category[] }) {
  return (
    <div className="w-full mt-16 space-y-20">
      <h1 className="text-3xl md:text-4xl font-light tracking-wider uppercase text-center">
        Explore Our Products
      </h1>
      
      {categories.map((category) => (
        <section key={category.id} className="w-full">
          {/* Category Header */}
          <div className="px-4 md:px-8 lg:px-12 mb-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="text-2xl md:text-3xl font-light uppercase tracking-wider">
                {category.name}
              </h2>
              <button
                onClick={() => router.visit(`/catalogue?category_id=${category.id}`)}
                className="text-sm font-semibold text-gray-800 hover:text-black transition flex items-center gap-1"
              >
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="px-4 md:px-8 lg:px-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
              {category.products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="group flex flex-col">
                  <div className="relative overflow-hidden bg-gray-50 rounded-none aspect-[3/4] sm:aspect-[2/3]">
                    <ProductImageDisplay product={product} />
                    {product.sale_price && (
                      <span className="absolute top-2 left-2 bg-rose-600 text-white text-xs font-semibold px-2 py-1">
                        SALE
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                    {product.description && (
                      <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
                    )}
                    <div className="mt-1 flex items-center gap-2">
                      {product.sale_price ? (
                        <>
                          <span className="text-sm text-gray-400 line-through">
                            UGX {parseFloat(product.price).toLocaleString()}
                          </span>
                          <span className="text-sm font-semibold text-rose-600">
                            UGX {parseFloat(product.sale_price).toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-semibold">
                          UGX {parseFloat(product.price).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}