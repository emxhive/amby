<?php

namespace App\Http\Controllers\Shop\Implements;

use App\Managers\Shop\ProductManager;
use App\Models\Product;
use Illuminate\Http\Request;

trait HasProductImplements
{
    use HasManagerImplements;

    public function __construct(ProductManager $manager)
    {
        $this->manager = $manager;
    }

    public function show(Product $product): array
    {
        return $this->wrap($product);
    }

    public function update(Request $request, Product $product)
    {
        return $this->cUpdate($request, $product);
    }

    public function destroy(Product $product)
    {
        return $this->cDestroy($product);
    }
}
