<?php

namespace App\Http\Controllers\Shop\Product;

use App\Constants\InertiaViews as V;
use App\Http\Controllers\CrudController;
use App\Http\Controllers\Shop\Implements\HasProductImplements;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class ShopProductController extends CrudController
{
    use HasProductImplements;

    public function index(Request $request)
    {
        // Only load the necessary relationships for the index view
        $products = $this->manager()->query(['category', 'tags'])->paginate(15);

        return Inertia::render(V::S_P_I, $this->wrap($products, true));
    }

    public function show(Product $product): Response
    {
        // For the show view, we need more detailed information including variations
        $product->load(['category', 'tags', 'variations']);

        return Inertia::render(V::S_P_S, $this->wrap($product));
    }
}
