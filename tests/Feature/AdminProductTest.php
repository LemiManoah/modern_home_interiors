<?php

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('creates a product via admin', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();

    $resp = $this->actingAs($user)
        ->post(route('admin.products.store'), [
            'name' => 'Test Chair',
            'price' => 199.99,
            'category_id' => $category->id,
            'is_active' => true,
        ]);

    $resp->assertRedirect(route('admin.products.index'));
    $this->assertDatabaseHas('products', [
        'name' => 'Test Chair',
        'category_id' => $category->id,
    ]);
});


