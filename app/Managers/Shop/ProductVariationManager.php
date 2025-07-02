<?php

namespace App\Managers\Shop;

use App\Models\ProductVariation;
use App\Managers\BaseManager;

class ProductVariationManager extends BaseManager
{
    protected function model()
    {
        return ProductVariation::class;
    }

    protected function relations(): array
    {
        return ['product'];
    }
}
