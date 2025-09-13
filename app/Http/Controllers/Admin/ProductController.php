<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		$products = Product::query()
			->with(['category', 'images', 'tags'])
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
		return Inertia::render('admin/products/form', [
			'categories' => $categories,
		]);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(ProductRequest $request)
	{
		$data = $request->validated();
		$tags = $data['tags'] ?? [];
		unset($data['tags']);
		$images = $request->file('images', []);
		$primaryIndex = (int) ($data['primary_image_index'] ?? -1);
		unset($data['primary_image_index']);

		DB::transaction(function () use ($data, $tags, $images, $primaryIndex) {
			$product = Product::create($data);
			if (!empty($tags)) {
				$product->tags()->sync($tags);
			}
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
		$product->load(['category', 'images', 'tags']);
		return Inertia::render('admin/products/show', [
			'product' => $product,
		]);
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Product $product)
	{
		$product->load(['images', 'tags']);
		$categories = Category::orderBy('name')->get(['id', 'name']);
		return Inertia::render('admin/products/form', [
			'product' => $product,
			'categories' => $categories,
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(ProductRequest $request, Product $product)
	{
		$data = $request->validated();
		$tags = $data['tags'] ?? [];
		unset($data['tags']);
		$newImages = $request->file('images', []);
		$primaryIndex = (int) ($data['primary_image_index'] ?? -1);
		unset($data['primary_image_index']);

		DB::transaction(function () use ($product, $data, $tags, $newImages, $primaryIndex) {
			$product->update($data);
			$product->tags()->sync($tags);
			$positionStart = (int) ($product->images()->max('position') ?? -1) + 1;
			foreach ($newImages as $offset => $file) {
				$path = $file->store('products', 'public');
				ProductImage::create([
					'product_id' => $product->id,
					'path' => $path,
					'position' => $positionStart + $offset,
					'is_primary' => $primaryIndex === $offset,
				]);
			}
			if ($primaryIndex >= 0) {
				$product->images()->update(['is_primary' => false]);
				$primaryImage = $product->images()->orderBy('position')->skip($primaryIndex)->first();
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
public function destroyImage(ProductImage $image)
{
    // Delete the file from storage
    Storage::disk('public')->delete($image->path);
    
    // Delete the image record
    $image->delete();
    
    return response()->noContent();
}
}
