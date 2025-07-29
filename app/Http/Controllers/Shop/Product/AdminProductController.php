<?php

namespace App\Http\Controllers\Shop\Product;

use App\Constants\InertiaViews as V;
use App\Constants\RouteNames as R;
use App\Http\Controllers\CrudController;
use App\Http\Controllers\Shop\Implements\HasProductImplements;
use App\Http\Requests\Shop\StoreProductRequest;
use App\Http\Requests\Shop\UpdateProductRequest;
use App\Managers\Shop\ProductManager;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;


class AdminProductController extends CrudController
{
    use HasProductImplements;

    public function __construct()
    {
        $this->init(ProductManager::class, true);
    }

    public function index(Request $request)
    {
        $products = $this->manager->query(['category', 'tags'])->paginate(15);
        $categories = Category::all();

        return Inertia::render(V::A_P_I,
            [
                "products" => $this->manager->toResourceCollection($products)
            ]);
    }

    public function create(): Response
    {
        $categories = Category::all();
        return Inertia::render(V::A_P_C, [
            "categories" => $this->manager->toResourceCollection($categories),
        ]);
    }

    public function show(Product $product): Response
    {
        // For the show view, we need more detailed information including variations
        $product->load(['category', 'tags', 'variations']);

        return Inertia::render(V::A_P_S, $this->wrap($product));
    }

    /**
     * @throws Throwable
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        $product = $this->cStore($request);
        return redirect()->route(R::A_P_S, ['product' => $product->slug]);
    }

    /**
     * @throws Throwable
     */
    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $product = $this->cUpdate($request, $product);
        return redirect()->route(R::A_P_S, ['product' => $product->slug]);
    }

    /**
     * @throws Throwable
     */
    public function destroy(Product $product): RedirectResponse
    {
        $this->cDestroy($product);
        return redirect()->route(R::A_P_I);
    }

}
