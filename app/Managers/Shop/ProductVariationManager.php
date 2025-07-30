<?php

namespace App\Managers\Shop;

use App\DTOs\ProductVariationDTO;
use App\Managers\BaseManager;
use App\Models\Product;
use App\Models\ProductVariation;

class ProductVariationManager extends BaseManager
{
    protected function model(): string
    {
        return ProductVariation::class;
    }

    public function storeFromDTO(ProductVariationDTO $dto, Product $product): void
    {
        $variation = $product->variations()->create($dto->toArray());

        if ($dto->batch) {
            $variation->createNewBatch($dto->batch);
        }
    }

}
