<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::with(['products' => function($query) {
            $query->with('images')
                  ->where('is_active', true)
                  ->orderBy('created_at', 'desc')
                  ->take(8); // Adjust number of products per category
        }])->whereHas('products', function($query) {
            $query->where('is_active', true);
        })->get();
    
        return Inertia::render('home', [
            'categories' => $categories
        ]);
    }
}
