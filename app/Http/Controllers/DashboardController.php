<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard page with statistics.
     */
    public function index()
    {
        $stats = [
            'total_products' => Product::count(),
            'total_categories' => Category::count(),
            'total_messages' => ContactMessage::count(),
            'recent_products' => Product::with('category')
                ->latest()
                ->take(5)
                ->get(['id', 'name', 'price', 'is_featured', 'created_at'])
                ->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'price' => (float) $product->price,
                        'is_featured' => (bool) $product->is_featured,
                        'created_at' => $product->created_at->toDateTimeString(),
                    ];
                }),
            'recent_messages' => ContactMessage::latest()
                ->take(5)
                ->get(['id', 'name', 'email', 'subject', 'created_at'])
                ->map(function ($message) {
                    return [
                        'id' => $message->id,
                        'name' => $message->name,
                        'email' => $message->email,
                        'subject' => $message->subject,
                        'created_at' => $message->created_at->toDateTimeString(),
                    ];
                }),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats,
        ]);
    }
}
