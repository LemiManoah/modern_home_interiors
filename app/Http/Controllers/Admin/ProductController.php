<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Admin\ProductRequest;
use App\Http\Requests\Admin\ProductCreateRequest;
use App\Http\Requests\Admin\ProductUpdateRequest;

class ProductController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		$products = Product::query()
			->with(['category', 'images'])
			->latest()
			->paginate(20);
		return Inertia::render('admin/products/index', [
			'products' => $products,
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create()
	{
		$categories = Category::orderBy('name')->get(['id', 'name']);
		return Inertia::render('admin/products/create', [
			'categories' => $categories,
		]);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(ProductCreateRequest $request)
	{
		$data = $request->validated();
		$images = $request->file('images', []);
		$primaryIndex = (int) ($data['primary_image_index'] ?? -1);
		unset($data['primary_image_index']);

		DB::transaction(function () use ($data, $images, $primaryIndex) {
			$product = Product::create($data);
			foreach ($images as $index => $file) {
				$path = $file->store('products', 'public');
				ProductImage::create([
					'product_id' => $product->id,
					'path' => $path,
					'position' => $index,
					'is_primary' => $primaryIndex === $index,
				]);
			}
		});

		return redirect()->route('admin.products.index');
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Product $product)
	{
		$product->load(['category', 'images']);
		return Inertia::render('admin/products/show', [
			'product' => $product,
		]);
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Product $product)
	{
		$product->load(['images']);
		$categories = Category::orderBy('name')->get(['id', 'name']);
		return Inertia::render('admin/products/edit', [
			'product' => $product,
			'categories' => $categories,
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(ProductUpdateRequest $request, Product $product)
	{
		$data = $request->validated();
		$newImages = $request->file('images', []);
		$primaryIndex = (int) ($data['primary_image_index'] ?? -1);
		unset($data['primary_image_index']);

		DB::transaction(function () use ($product, $data, $newImages, $primaryIndex) {
			$product->update($data);

			// Add new images if any
			$positionStart = (int) ($product->images()->max('position') ?? -1) + 1;
			foreach ($newImages as $offset => $file) {
				$path = $file->store('products', 'public');
				ProductImage::create([
					'product_id' => $product->id,
					'path' => $path,
					'position' => $positionStart + $offset,
					'is_primary' => false, // will reset below
				]);
			}

			// Reset all primary flags
			$product->images()->update(['is_primary' => false]);

			// Set primary if index provided
			if ($primaryIndex >= 0) {
				$primaryImage = $product->images()
					->orderBy('position')
					->skip($primaryIndex)
					->first();

				if ($primaryImage) {
					$primaryImage->update(['is_primary' => true]);
				}
			}
		});

		return redirect()->route('admin.products.index');
	}


	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Product $product)
	{
		foreach ($product->images as $img) {
			Storage::disk('public')->delete($img->path);
		}
		$product->delete();
		return back();
	}

	/**
	 * Remove the specified product image from storage.
	 */
	public function destroyImage(Product $product, ProductImage $image)
	{
		// Make sure the image belongs to this product
		if ($image->product_id !== $product->id) {
			abort(403);
		}
	
		// Delete from storage
		Storage::disk('public')->delete($image->path);
	
		// Delete record
		$image->delete();
	
		return response()->json(['success' => 'Image removed successfully']);
	}
}
