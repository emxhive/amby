<?php

namespace App\Http\Controllers\Shop\Product;

use App\Enums\InertiaViews as V;
use App\Enums\RouteNames as R;
use App\Http\Controllers\CrudController;
use App\Http\Controllers\Shop\Implements\HasProductImplements;
use App\Http\Requests\Shop\StoreProductRequest;
use App\Http\Requests\Shop\UpdateProductRequest;
use App\Managers\Shop\ProductManager;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;


class ProductControllerA extends CrudController
{
    use HasProductImplements;

    public function __construct()
    {
        $this->manager = new ProductManager(true);
    }

    public function index()
    {
        return Inertia::render(V::A_P_L, $this->wrap(parent::index(), true));
    }

    public function show(Product $product): Response
    {
        return Inertia::render(V::A_P_S, $this->wrap($product));
    }


    public function store(StoreProductRequest $request): RedirectResponse
    {
        $product = $this->cStore($request);
        return redirect()->route(R::A_P_S, $this->wrap($product));
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $product = $this->cUpdate($request, $product);
        return redirect()->route(R::A_P_S, $this->wrap($product));
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->cDestroy($product);
        return redirect()->route(R::A_P_I);
    }

}
