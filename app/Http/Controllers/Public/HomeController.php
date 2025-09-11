<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::query()
            ->where('is_active', true)
            ->with(['products' => function ($query) {
                $query->where('is_active', true)
                    ->with(['images' => function ($q) {
                        $q->orderBy('is_primary', 'desc')->orderBy('position');
                    }])
                    ->latest()
                    ->limit(8);
            }])
            ->orderBy('is_featured', 'desc')
            ->orderBy('name')
            ->get();

        return Inertia::render('home', [
            'categories' => $categories,
        ]);
    }
}
