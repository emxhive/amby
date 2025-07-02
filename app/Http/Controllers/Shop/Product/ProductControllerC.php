<?php

namespace App\Http\Controllers\Shop\Product;

use App\Enums\InertiaViews as V;
use App\Http\Controllers\CrudController;
use App\Http\Controllers\Shop\Implements\HasProductImplements;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;


class ProductControllerC extends CrudController
{
    use HasProductImplements;


    public function index()
    {

        return Inertia::render(V::C_P_L, $this->wrap(parent::index(), true));
    }

    public function show(Product $product): Response
    {
        return Inertia::render(V::C_P_S, $this->wrap($product));
    }

}
