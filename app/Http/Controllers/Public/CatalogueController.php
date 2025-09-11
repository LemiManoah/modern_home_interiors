<?php

namespace App\Http\Controllers\Public;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CatalogueController extends Controller
{
    public function index(Request $request)
    {
        $perPage = 12; // Items per page
        
        // Get validated filters with defaults
        $filters = [
            'search' => $request->input('search', ''),
            'category_id' => $request->input('category_id', ''),
            'sort' => $request->input('sort', 'newest'),
            'page' => $request->input('page', 1)
        ];
        
        // Build the base query
        $query = Product::query()
            ->with([
                'category:id,name',
                'images' => function ($q) {
                    $q->orderBy('is_primary', 'desc')
                      ->orderBy('position');
                }
            ])
            ->where('is_active', true);

        // Apply search filter
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Apply category filter
        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        // Apply sorting
        switch ($filters['sort']) {
            case 'price_asc':
                $query->orderByRaw('COALESCE(sale_price, price) ASC');
                break;
            case 'price_desc':
                $query->orderByRaw('COALESCE(sale_price, price) DESC');
                break;
            case 'name_asc':
                $query->orderBy('name', 'asc');
                break;
            default:
                $query->latest();
        }

        // Get paginated products
        $products = $query->paginate($perPage)
            ->appends($filters);
        
        // Get active categories with active products (SQLite compatible)
        $categories = Category::query()
            ->where('is_active', true)
            ->whereExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('products')
                    ->whereColumn('products.category_id', 'categories.id')
                    ->where('products.is_active', true);
            })
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('catalogue/index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $filters
        ]);
    }
}