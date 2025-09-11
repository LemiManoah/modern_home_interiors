<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		$categories = Category::query()->latest()->paginate(20);
		return Inertia::render('admin/categories/index', [
			'categories' => $categories,
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create()
	{
		return Inertia::render('admin/categories/form');
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(CategoryRequest $request)
	{
		$data = $request->validated();
		if ($request->hasFile('image')) {
			$data['image'] = $request->file('image')->store('categories', 'public');
		}
		Category::create($data);
		return redirect()->route('admin.categories.index');
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Category $category)
	{
		return Inertia::render('admin/categories/show', [
			'category' => $category,
		]);
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Category $category)
	{
		return Inertia::render('admin/categories/form', [
			'category' => $category,
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(CategoryRequest $request, Category $category)
	{
		$data = $request->validated();
		if ($request->hasFile('image')) {
			if ($category->image) {
				Storage::disk('public')->delete($category->image);
			}
			$data['image'] = $request->file('image')->store('categories', 'public');
		}
		$category->update($data);
		return redirect()->route('admin.categories.index');
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Category $category)
	{
		if ($category->image) {
			Storage::disk('public')->delete($category->image);
		}
		$category->delete();
		return back();
	}
}
