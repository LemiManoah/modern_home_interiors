import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem, Product, Category } from '@/types'
import { Head, router, useForm, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Loader2, Star, Trash2, Upload } from 'lucide-react'
import { useState, useCallback, ChangeEvent } from 'react'

interface EditProductProps {
  product: Product
  categories: Category[]
}

export default function EditProductPage({ product, categories }: EditProductProps) {
  const [previews, setPreviews] = useState<string[]>([])
  const [existingImages, setExistingImages] = useState(product.images)

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Products', href: '/admin/products' },
    { title: 'Edit Product', href: '' },
  ]

  const { data, setData, post, processing, errors } = useForm({
    _method: 'put',
    name: product.name || '',
    description: product.description || '',
    price: product.price || '',
    sale_price: product.sale_price || '',
    stock_quantity: product.stock_quantity || '',
    category_id: product.category_id?.toString() || '',
    is_active: product.is_active ?? true,
    is_featured: product.is_featured ?? false,
    tags: product.tags || [],
    images: [] as File[],
    primary_image_index: product.images.findIndex((img) => img.is_primary) ?? 0,
  })

  const onFilesChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files
      if (!selectedFiles || selectedFiles.length === 0) return

      const fileArray = Array.from(selectedFiles)
      const urls = fileArray.map((file) => URL.createObjectURL(file))

      setPreviews((prev) => [...prev, ...urls])
      setData((prevData) => ({ ...prevData, images: [...prevData.images, ...fileArray] }))

      e.target.value = ''
    },
    [setData],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(`/admin/products/${product.id}`, {
      onSuccess: () => router.visit('/admin/products'),
      preserveScroll: true,
    })
  }

  const removeNewImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index))
    setData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }))
  }

  const removeExistingImage = (imageId: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    // Optimistic UI update
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId))

    router.delete(`/admin/products/${product.id}/images/${imageId}`, {
      preserveScroll: true,
      onError: () => {
        // Rollback if error
        setExistingImages(product.images)
      },
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Product" />
      <div className="container mx-auto py-4 sm:py-6 px-3 sm:px-4">
        <Card className="border-0 sm:border">
          <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">
              <div className="mb-5 flex items-center justify-between">
                <div className="text-xl text-slate-600">Edit Product</div>
                <Button>
                  <Link href="/admin/products" prefetch>
                    Go Back
                  </Link>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter product name"
                    className={errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  />
                  {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category_id">Category</Label>
                  <select
                    id="category_id"
                    value={data.category_id}
                    onChange={(e) => setData('category_id', e.target.value)}
                    className={`flex h-11 w-full rounded-md border ${
                      errors.category_id ? 'border-red-500' : 'border-input'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && <div className="text-red-600 text-sm">{errors.category_id}</div>}
                </div>

                {/* Price + Sale Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={data.price}
                      onChange={(e) => setData('price', e.target.value)}
                    />
                    {errors.price && <div className="text-red-600 text-sm">{errors.price}</div>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sale_price">Sale Price (Optional)</Label>
                    <Input
                      id="sale_price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={data.sale_price}
                      onChange={(e) => setData('sale_price', e.target.value)}
                    />
                    {errors.sale_price && <div className="text-red-600 text-sm">{errors.sale_price}</div>}
                  </div>
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="stock_quantity">Quantity</Label>
                  <Input
                    id="stock_quantity"
                    value={data.stock_quantity}
                    onChange={(e) => setData('stock_quantity', e.target.value)}
                  />
                  {errors.stock_quantity && <div className="text-red-600 text-sm">{errors.stock_quantity}</div>}
                </div>

                {/* Toggles */}
                <div className="flex flex-wrap gap-4 py-2">
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="is_active"
                      checked={data.is_active}
                      onCheckedChange={(checked) => setData('is_active', checked)}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="is_featured"
                      checked={data.is_featured}
                      onCheckedChange={(checked) => setData('is_featured', checked)}
                    />
                    <Label htmlFor="is_featured">Featured</Label>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={5}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                  />
                  {errors.description && <div className="text-red-600 text-sm">{errors.description}</div>}
                </div>

                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <div className="space-y-4">
                    <Label>Existing Images</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {existingImages.map((img) => (
                        <div key={img.id} className="relative aspect-square rounded-md overflow-hidden group">
                          <img src={`/storage/${img.path}`} alt={img.path} className="h-full w-full object-cover" />
                          {img.is_primary && (
                            <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-1">
                              <Star className="h-2.5 w-2.5" fill="currentColor" />
                            </div>
                          )}
                          {/* Delete Button */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeExistingImage(img.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload New Images */}
                <div className="space-y-4">
                  <Label>Upload New Images</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <Label htmlFor="images" className="cursor-pointer text-primary">
                      Click to upload
                    </Label>
                    <Input
                      id="images"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={onFilesChanged}
                      accept="image/*"
                    />
                  </div>

                  {previews.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">New Images ({previews.length})</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {previews.map((preview, index) => (
                          <div key={index} className="relative aspect-square rounded-md overflow-hidden group">
                            <img src={preview} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
                              <Button
                                type="button"
                                variant="secondary"
                                size="icon"
                                onClick={() => removeNewImage(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="secondary"
                                size="icon"
                                onClick={() => setData('primary_image_index', index)}
                                disabled={data.primary_image_index === index}
                              >
                                <Star
                                  className="h-4 w-4"
                                  fill={data.primary_image_index === index ? 'currentColor' : 'none'}
                                />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <div className="border-t px-4 py-4 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.visit('/admin/products')}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  'Update Product'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  )
}
