<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('shows home page', function () {
    $this->get(route('home'))->assertSuccessful();
});

it('shows catalogue', function () {
    $this->get(route('catalogue.index'))->assertSuccessful();
});


