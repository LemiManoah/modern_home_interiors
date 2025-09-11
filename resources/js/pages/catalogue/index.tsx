import React, { useEffect, useState, useCallback } from 'react';
import { Link, router } from '@inertiajs/react';
// Define PageProps type since we can't import it
type PageProps = {
  products: PaginatedProducts;
  categories: Category[];
  filters: FilterParams;
  [key: string]: unknown; // For any other props that might be passed
};
import ShopHeader from '@/components/shop/header';
import Footer from '@/components/shop/footer';
import { Pagination } from '@/components/shop/pagination';

type Image = { 
  id: number; 
  path: string; 
  is_primary: boolean; 
  position: number;
};

type Product = { 
  id: number; 
  name: string; 
  price: number;
  sale_price: number | null;
  is_featured: boolean;
  description: string;
  images: Image[];
  category: { id: number; name: string };
};

type Category = { 
  id: number; 
  name: string;
  products_count?: number;
};

type PaginatedProducts = {
  data: Product[];
  links: Array<{ url: string | null; label: string; active: boolean }>;
  current_page: number;
  last_page: number;
  total: number;
};

type FilterParams = {
  search: string;
  category_id: string | number;
  sort: string;
  page: number;
};

type PagePropsWithCategories = PageProps;

export default function CataloguePage({ 
  products,
  categories,
  filters: initialFilters
}: PagePropsWithCategories) {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterParams>({
    search: initialFilters.search || '',
    category_id: initialFilters.category_id || '',
    sort: initialFilters.sort || 'newest',
    page: initialFilters.page || 1,
  });

  // Update local state when filters from server change
  useEffect(() => {
    setFilters({
      search: initialFilters.search || '',
      category_id: initialFilters.category_id || '',
      sort: initialFilters.sort || 'newest',
      page: initialFilters.page || 1,
    });
  }, [initialFilters]);

  // Handle filter changes
  const updateFilters = useCallback((newFilters: Partial<FilterParams>) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 }; // Reset to page 1 on filter change
    setFilters(updatedFilters);
    router.get('/catalogue', updatedFilters, {
      preserveState: true,
      preserveScroll: true,
      only: ['products', 'filters'],
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    });
  }, [filters]);

  // Handle pagination
  const handlePageChange = (page: number) => {
    const updatedFilters = { ...filters, page };
    setFilters(updatedFilters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.get('/catalogue', updatedFilters, {
      preserveState: true,
      preserveScroll: true,
      only: ['products', 'filters'],
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    });
  };

  // Handle search input with debounce
  const [searchValue, setSearchValue] = useState(filters.search || '');
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== filters.search) {
        updateFilters({ search: searchValue });
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchValue, filters.search, updateFilters]);

  // Handle filter application
  const applyFilters = () => {
    updateFilters(filters);
  };

  // Handle filter reset
  const clearFilters = () => {
    const resetFilters = {
      search: '',
      category_id: '',
      sort: 'newest',
      page: 1,
    };
    setSearchValue('');
    setFilters(resetFilters);
    router.get('/catalogue', resetFilters, {
      preserveState: true,
      preserveScroll: true,
      only: ['products', 'filters'],
    });
  };

  const selectedCategory = filters.category_id 
    ? categories.find((c: Category) => c.id === Number(filters.category_id))?.name 
    : 'All'

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ShopHeader />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-700 to-cyan-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Catalogue</h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Discover our curated collection of premium products
          </p>
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 rounded-lg text-gray-900 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear all
                  </button>
                </div>
                
                <div className="space-y-6 mb-6">
                  <div>
                    <h4 className="font-medium mb-3 text-gray-900">Sort By</h4>
                    <select
                      value={filters.sort}
                      onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                      disabled={isLoading}
                    >
                      <option value="newest">Newest Arrivals</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                      <option value="name_asc">Name: A to Z</option>
                    </select>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-gray-900">Categories</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="cat-all"
                          type="radio"
                          name="category"
                          checked={!filters.category_id}
                          onChange={() => setFilters(prev => ({ ...prev, category_id: '' }))}
                          disabled={isLoading}
                          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="cat-all" className="ml-3 text-sm text-gray-700">
                          All Categories
                        </label>
                      </div>
                      {categories.map((category: Category) => (
                        <div key={category.id} className="flex items-center">
                          <input
                            id={`cat-${category.id}`}
                            type="radio"
                            name="category"
                            checked={Number(filters.category_id) === category.id}
                            onChange={() => setFilters(prev => ({ ...prev, category_id: category.id }))}
                            disabled={isLoading}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor={`cat-${category.id}`} className="ml-3 text-sm text-gray-700">
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Apply/Reset Buttons */}
                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={applyFilters}
                    className="flex-1 bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium"
                  >
                    {isLoading ? 'Applying...' : 'Apply'}
                  </button>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="flex-1 bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium"
                  >
                    {isLoading ? 'Resetting...' : 'Reset'}
                  </button>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {selectedCategory} Products
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {products.total} {products.total === 1 ? 'item' : 'items'} found
                  </p>
                </div>
                
                <select
                  value={filters.sort}
                  onChange={(e) => updateFilters({ sort: e.target.value })}
                  disabled={isLoading}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                </select>
              </div>

              {products.data.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.data.map((product: Product) => {
                      const primaryImagePath = product.images.find((img: Image) => img.is_primary)?.path || product.images[0]?.path;
                      const hasSale = product.sale_price !== null;
                      
                      return (
                        <Link 
                          key={product.id} 
                          href={`/products/${product.id}`}
                          className="group block"
                        >
                          <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                            {primaryImagePath ? (
                              <img
                                src={`/storage/${primaryImagePath}`}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-400">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                            
                            {hasSale && (
                              <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                SALE
                              </div>
                            )}
                            
                            {product.is_featured && (
                              <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                FEATURED
                              </div>
                            )}
                          </div>

                          <div className="p-4">
                            <h3 className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-1 mb-2 flex items-center">
                              {product.name}
                              <span className="text-xs font-medium text-gray-500 uppercase ml-auto">
                                {product.category.name}
                              </span>
                            </h3>

                            <div className="flex items-center justify-between">
                              <div>
                                {hasSale ? (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-red-600 font-semibold">UGX {product.sale_price}</span>
                                    <span className="text-sm text-gray-500 line-through">UGX {product.price}</span>
                                  </div>
                                ) : (
                                  <span className="text-gray-900 font-semibold">UGX {product.price}</span>
                                )}
                              </div>
                              
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>

                  {products.last_page > 1 && (
                    <div className="mt-8">
                      <Pagination
                        currentPage={products.current_page}
                        totalPages={products.last_page}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                  <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filters</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}