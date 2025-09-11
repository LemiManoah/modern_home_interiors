<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'category_id' => 1,
            'name' => 'Chair',
            'description' => 'Chair description',
            'price' => 100,
            'is_active' => true,
            'is_featured' => false,
        ]);
        Product::create([
            'category_id' => 1,
            'name' => 'Table',
            'description' => 'Table description',
            'price' => 200,
            'is_active' => true,
            'is_featured' => false,
        ]);
        Product::create([
            'category_id' => 1,
            'name' => 'Bed',
            'description' => 'Bed description',
            'price' => 300,
            'sale_price' => 250,
            'is_active' => true,
            'is_featured' => false,
        ]);
        Product::create([
            'category_id' => 1,
            'name' => 'Sofa',
            'description' => 'Sofa description',
            'price' => 400,
            'sale_price' => 350,
            'is_active' => true,
            'is_featured' => false,
        ]);
        Product::create([
            'category_id' => 2,
            'name' => 'Lamp',
            'description' => 'Lamp description',
            'price' => 500,
            'sale_price' => 450,
            'is_active' => true,
            'is_featured' => false,
        ]);
        Product::create([
            'category_id' => 3,
            'name' => 'Chair',
            'description' => 'Chair description',
            'price' => 600,
            'sale_price' => 550,
            'is_active' => true,
            'is_featured' => false,
        ]);
    }
}

// Schema::create('products', function (Blueprint $table) {
//     $table->id();
//     $table->foreignId('category_id')->constrained()->cascadeOnDelete();
//     $table->string('name');
//     $table->text('description')->nullable();
//     $table->decimal('price', 10, 2)->default(0);
//     $table->decimal('sale_price', 10, 2)->default(0);
//     $table->boolean('is_active')->default(true);
//     $table->boolean('is_featured')->default(false);
//     $table->timestamps();
// });
