import { Link } from '@inertiajs/react';

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
  category: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
  products: Product[];
}

interface ProductsByCategoryProps {
  categories: Category[];
}

const ProductCard = ({ product }: { product: Product }) => {
  const primaryImage = product.images.find(img => img.is_primary) || product.images[0];
  const imageUrl = primaryImage ? `/storage/${primaryImage.path}` : '/images/placeholder.jpg';
  const hasSale = product.sale_price && parseFloat(product.sale_price) < parseFloat(product.price);

  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        {/* Sale Badge */}
        {hasSale && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 z-10">
            SALE
          </span>
        )}
        
        {/* Product Image */}
        <Link href={`/products/${product.id}`} className="block h-full">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/images/placeholder.jpg';
            }}
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1 text-left">
          <Link href={`/products/${product.id}`} className="hover:text-gray-600">
            {product.name}
          </Link>
        </h3>
        
        {/* Price */}
        <div className="mt-2">
          {hasSale ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 line-through">
                UGX {parseFloat(product.price).toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-red-600">
                UGX {parseFloat(product.sale_price!).toLocaleString()}
              </span>
            </div>
          ) : (
            <span className="text-sm font-semibold text-gray-900">
              UGX {parseFloat(product.price).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProductsByCategory({ categories }: ProductsByCategoryProps) {
  if (!categories?.length) {
    return (
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">No categories available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900">
            Explore Our Products
          </h1>
        </div>

        {/* Categories Grid */}
        <div className="space-y-16">
          {categories.map((category) => (
            <section key={category.id}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-gray-900">
                  {category.name}
                </h2>
                <Link 
                  href={`/catalogue?category_id=${category.id}`}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                >
                  View all
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="border-b border-gray-200 w-full my-2"></div>

              {category.products.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                  {category.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No products available in this category.</p>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
