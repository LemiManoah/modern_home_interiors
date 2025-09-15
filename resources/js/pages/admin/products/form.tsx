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
import { Loader2, Star, Trash2, Upload } from 'lucide-react';
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
      <div className="container mx-auto py-4 sm:py-6 px-3 sm:px-4">
        <Card className="border-0 sm:border">
          <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">
              {product ? 'Edit Product' : 'Create New Product'}
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base">Product Name</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter product name"
                    className="py-3 sm:py-2 text-sm sm:text-base"
                  />
                  <InputError message={errors.name} className="mt-1 text-xs sm:text-sm" />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category_id" className="text-sm sm:text-base">Category</Label>
                  <select
                    id="category_id"
                    value={data.category_id}
                    onChange={e => setData('category_id', e.target.value)}
                    className="flex h-11 sm:h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm sm:text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <InputError message={errors.category_id} className="mt-1 text-xs sm:text-sm" />
                </div>

                {/* Price and Sale Price in a grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Price */}
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm sm:text-base">Price</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-muted-foreground text-sm sm:text-base">$</span>
                      </div>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        className="pl-8 py-3 sm:py-2 text-sm sm:text-base"
                        inputMode="decimal"
                      />
                    </div>
                    <InputError message={errors.price} className="mt-1 text-xs sm:text-sm" />
                  </div>

                  {/* Sale Price */}
                  <div className="space-y-2">
                    <Label htmlFor="sale_price" className="text-sm sm:text-base">Sale Price (Optional)</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-muted-foreground text-sm sm:text-base">$</span>
                      </div>
                      <Input
                        id="sale_price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={data.sale_price}
                        onChange={(e) => setData('sale_price', e.target.value)}
                        className="pl-8 py-3 sm:py-2 text-sm sm:text-base"
                        inputMode="decimal"
                      />
                    </div>
                    <InputError message={errors.sale_price} className="mt-1 text-xs sm:text-sm" />
                  </div>
                </div>

                {/* Status Toggles */}
                <div className="flex flex-wrap gap-4 sm:gap-8 py-2">
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="is_active"
                      checked={data.is_active}
                      onCheckedChange={(checked) => setData('is_active', checked)}
                      className="h-5 w-9"
                    />
                    <Label htmlFor="is_active" className="text-sm sm:text-base cursor-pointer">Active</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="is_featured"
                      checked={data.is_featured}
                      onCheckedChange={(checked) => setData('is_featured', checked)}
                      className="h-5 w-9"
                    />
                    <Label htmlFor="is_featured" className="text-sm sm:text-base cursor-pointer">Featured</Label>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm sm:text-base">Description</Label>
                  <Textarea
                    id="description"
                    rows={5}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Enter product description"
                    className="min-h-[140px] text-sm sm:text-base"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <Label className="text-sm sm:text-base">Product Images</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 sm:p-6 text-center">
                    <div className="space-y-3">
                      <Upload className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
                      <div className="flex flex-col items-center space-y-2">
                        <Label
                          htmlFor="images"
                          className="relative cursor-pointer text-sm sm:text-base font-medium text-primary hover:text-primary/90 transition-colors"
                        >
                          <span>Click to upload</span>
                          <Input
                            id="images"
                            name="images"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={onFilesChanged}
                            accept="image/*"
                          />
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>

                    {/* Image Previews */}
                    {previews.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-sm font-medium mb-3 text-left">Selected Images ({previews.length})</h3>
                        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                          {previews.map((preview, index) => (
                            <div key={index} className="relative aspect-square rounded-md overflow-hidden group">
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                                <Button
                                  type="button"
                                  variant="secondary"
                                  size="icon"
                                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-background/80 hover:bg-background"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(index);
                                  }}
                                >
                                  <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                  <span className="sr-only">Remove</span>
                                </Button>
                                <Button
                                  type="button"
                                  variant="secondary"
                                  size="icon"
                                  className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-background/80 hover:bg-background ${data.primary_image_index === index + (product?.images?.length || 0) ? 'text-yellow-500' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setData('primary_image_index', index + (product?.images?.length || 0));
                                  }}
                                  disabled={data.primary_image_index === index + (product?.images?.length || 0)}
                                >
                                  <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill={data.primary_image_index === index + (product?.images?.length || 0) ? 'currentColor' : 'none'} />
                                  <span className="sr-only">Set as primary</span>
                                </Button>
                              </div>
                              {data.primary_image_index === index + (product?.images?.length || 0) && (
                                <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-1">
                                  <Star className="h-2.5 w-2.5" fill="currentColor" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="border-t px-4 sm:px-6 py-4">
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 w-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.visit('/admin/products')}
                  disabled={processing}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={processing}
                  className="w-full sm:w-auto"
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    'Save Product'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}