<?php

namespace App\Http\Controllers\Shop\Product;

use App\Constants\InertiaViews as V;
use App\Http\Controllers\CrudController;
use App\Http\Controllers\Shop\Implements\HasProductImplements;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class ProductControllerC extends CrudController
{
    use HasProductImplements;


    public function index(Request $request)
    {

        return Inertia::render(V::C_P_I, $this->wrap(parent::index($request), true));
    }

    public function show(Product $product): Response
    {
        return Inertia::render(V::C_P_S, $this->wrap($product));
    }

}
