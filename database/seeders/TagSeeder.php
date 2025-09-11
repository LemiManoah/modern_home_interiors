<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tag::create([
            'name' => 'Chair',
        ]);
        Tag::create([
            'name' => 'Table',
        ]);
        Tag::create([
            'name' => 'Bed',
        ]);
        Tag::create([
            'name' => 'Sofa',
        ]);
        Tag::create([
            'name' => 'Lamp',
        ]);
    }
}
