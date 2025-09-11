<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Furniture',
            'description' => 'Chair description',
            'image' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            'is_active' => true,
            'is_featured' => false,
        ]);
        Category::create([
            'name' => 'Lighting',
            'description' => 'Lighting description',
            'image' => 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
            'is_active' => true,
            'is_featured' => false,
        ]);
        Category::create([
            'name' => 'Decor',
            'description' => 'Decor description',
            'image' => 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
            'is_active' => true,
            'is_featured' => false,
        ]);
        Category::create([
            'name' => 'Exterior',
            'description' => 'Exterior description',
            'image' => 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
            'is_active' => true,
            'is_featured' => false,
        ]);
        Category::create([
            'name' => 'Interior',
            'description' => 'Interior description',
            'image' => 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
            'is_active' => true,
            'is_featured' => false,
        ]);
        Category::create([
            'name' => 'Art',
            'description' => 'Art description',
            'image' => 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
            'is_active' => true,
            'is_featured' => false,
        ]);
    }
}
