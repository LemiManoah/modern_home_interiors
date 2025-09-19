<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show(Product $product)
    {
        $product->load([
            'category',
            'images' => function ($q) {
                $q->orderBy('is_primary', 'desc')->orderBy('position');
            },
        ]);

        $similar = Product::query()
            ->where('is_active', true)
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->with(['images' => function ($q) {
                $q->orderBy('is_primary', 'desc')->orderBy('position');
            }])
            ->latest()
            ->limit(8)
            ->get();

        return Inertia::render('products/show', [
            'product' => $product,
            'similar' => $similar,
        ]);
    }
}
