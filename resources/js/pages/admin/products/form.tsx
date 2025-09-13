import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useState, useCallback, ChangeEvent } from 'react';
import { Product, Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { X, Upload } from 'lucide-react';
import InputError from '@/components/input-error';


interface AdminProductFormProps {
  product?: Product & { tags?: { id: number }[]; images?: Array<{ id: number; path: string; is_primary: boolean }> };
  categories: Category[];
}

type ProductFormData = {
  name: string;
  description: string;
  price: string;
  sale_price: string;
  category_id: string;
  is_active: boolean;
  is_featured: boolean;
  tags: number[];
  images: File[];
  primary_image_index: number;
};

export default function AdminProductForm({ product, categories }: AdminProductFormProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Products',
      href: '/admin/products',
    },
    {
      title: product ? 'Edit Product' : 'New Product',
      href: '',
    },
  ];

  const { data, setData, processing, errors } = useForm<ProductFormData>({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price ? product.price.toString() : '',
    sale_price: product?.sale_price ? product.sale_price.toString() : '',
    category_id: product?.category_id ? product.category_id.toString() : '',
    is_active: product?.is_active ?? true,
    is_featured: product?.is_featured ?? false,
    tags: product?.tags?.map(t => t.id) || [],
    images: [],
    primary_image_index: product?.images?.findIndex(img => img.is_primary) ?? 0,
  });

  const onFilesChanged = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    const fileArray = Array.from(selectedFiles);
    const urls = fileArray.map(file => URL.createObjectURL(file));
    
    setFiles(prev => [...prev, ...fileArray]);
    setPreviews(prev => [...prev, ...urls]);
    setData('images', [...files, ...fileArray]);
  }, [files, setData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    // Append all form data
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'tags') {
        (value as number[]).forEach(tagId => {
          formData.append('tags[]', tagId.toString());
        });
      } else if (key === 'images') {
        // Files are handled separately
      } else if (typeof value === 'boolean') {
        formData.append(key, value ? '1' : '0');
      } else {
        formData.append(key, value as string);
      }
    });
    
    // Append files
    files.forEach(file => {
      formData.append('images[]', file);
    });
    
    // Handle update or create
    if (product) {
      formData.append('_method', 'put');
      router.post(`/admin/products/${product.id}`, {
        _method: 'put',
        ...Object.fromEntries(formData),
      }, {
        onSuccess: () => {
          router.visit('/admin/products');
        },
        preserveScroll: true,
        forceFormData: true,
      });
    } else {
      router.post('/admin/products', formData, {
        onSuccess: () => {
          router.visit('/admin/products');
        },
        preserveScroll: true,
        forceFormData: true,
      });
    }
  };

  const removeImage = (index: number) => {
    const newPreviews = [...previews];
    const newFiles = [...files];
    newPreviews.splice(index, 1);
    newFiles.splice(index, 1);
    setPreviews(newPreviews);
    setFiles(newFiles);
    setData('images', newFiles);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={product ? 'Edit Product' : 'Create Product'} />
      <div className="container mx-auto py-6 px-4">
        <Card>
          <CardHeader>
            <CardTitle>{product ? 'Edit Product' : 'Create New Product'}</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter product name"
                  />
                  <InputError message={errors.name} className="mt-1" />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category_id">Category</Label>
                  <select
                    id="category_id"
                    value={data.category_id}
                    onChange={e => setData('category_id', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                  <InputError message={errors.category_id} className="mt-1" />
              </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-muted-foreground">$</span>
                    </div>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={data.price}
                      onChange={(e) => setData('price', e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <InputError message={errors.price} className="mt-1" />
                </div>

                {/* Sale Price */}
                <div className="space-y-2">
                  <Label htmlFor="sale_price">Sale Price (Optional)</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-muted-foreground">$</span>
                    </div>
                    <Input
                      id="sale_price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={data.sale_price}
                      onChange={(e) => setData('sale_price', e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <InputError message={errors.sale_price} className="mt-1" />
                </div>

                {/* Status Toggles */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8 col-span-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={data.is_active}
                      onCheckedChange={(checked) => setData('is_active', checked)}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_featured"
                      checked={data.is_featured}
                      onCheckedChange={(checked) => setData('is_featured', checked)}
                    />
                    <Label htmlFor="is_featured">Featured</Label>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Enter product description"
                    className="min-h-[120px]"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-4 col-span-2">
                  <Label>Images</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <div className="space-y-2">
                      <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                      <div className="flex flex-col sm:flex-row justify-center gap-2 text-sm">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer font-medium text-primary hover:text-primary/90"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            multiple
                            className="sr-only"
                            onChange={onFilesChanged}
                            accept="image/*"
                          />
                        </label>
                        <p className="text-muted-foreground">or drag and drop</p>
                      </div>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  {errors.images && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.images}
                    </p>
                  )}
                  
                  {/* Image Previews */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {/* Existing Images */}
                    {product?.images?.map((img, idx) => (
                      <div key={img.id} className="relative group">
                        <img
                          src={`/storage/${img.path}`}
                          alt={`Product ${idx + 1}`}
                          className="h-32 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this image?')) {
                              router.delete(`/admin/products/images/${img.id}`, {
                                preserveScroll: true,
                                preserveState: true,
                              });
                            }
                          }}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setData('primary_image_index', idx)}
                          className={`absolute bottom-1 right-1 rounded-full px-2 py-1 text-xs ${
                            data.primary_image_index === idx
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-background/90 text-foreground hover:bg-accent'
                          }`}
                        >
                          {data.primary_image_index === idx ? 'Primary' : 'Set Primary'}
                        </button>
                      </div>
                    ))}
                    
                    {/* New Image Previews */}
                    {previews.map((preview, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={preview}
                          alt={`New upload ${idx + 1}`}
                          className="h-32 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setData('primary_image_index', idx + (product?.images?.length || 0))}
                          className={`absolute bottom-1 right-1 rounded-full px-2 py-1 text-xs ${
                            data.primary_image_index === idx + (product?.images?.length || 0)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-background/90 text-foreground hover:bg-accent'
                          }`}
                        >
                          {data.primary_image_index === idx + (product?.images?.length || 0) ? 'Primary' : 'Set Primary'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="border-t px-6 py-4">
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.visit('/admin/products')}
                  disabled={processing}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Saving...' : 'Save Product'}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}