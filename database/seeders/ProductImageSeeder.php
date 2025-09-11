<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProductImage;

class ProductImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductImage::create([
            'product_id' => 1,
            'path' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            'is_primary' => true,
            'position' => 1,
        ]);
        ProductImage::create([
            'product_id' => 2,
            'path' => 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
            'is_primary' => false,
            'position' => 2,
        ]);
        ProductImage::create([
            'product_id' => 3,
            'path' => 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
            'is_primary' => false,
            'position' => 3,
        ]);
        ProductImage::create([
            'product_id' => 4,
            'path' => 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
            'is_primary' => false,
            'position' => 4,
        ]);
        ProductImage::create([
            'product_id' => 5,
            'path' => 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
            'is_primary' => false,
            'position' => 5,
        ]);
    }

    // $table->id();
    // $table->foreignId('product_id')->constrained()->cascadeOnDelete();
    // $table->string('path');
    // $table->unsignedInteger('position')->default(0);
    // $table->boolean('is_primary')->default(false);
    // $table->timestamps();
}

// [
//     'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
//     'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
//     'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
//     'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
//     'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
// ]
