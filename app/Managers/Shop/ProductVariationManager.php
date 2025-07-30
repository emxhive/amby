<?php

namespace App\Managers\Shop;

use App\DTOs\ProductVariationDTO;
use App\Managers\BaseManager;
use App\Models\Product;
use App\Models\ProductVariation;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductVariationManager extends BaseManager
{
    protected function model(): string
    {
        return ProductVariation::class;
    }

    public function storeFromDTO(ProductVariationDTO $dto, Product $product): JsonResource
    {
        $variation = $product->variations()->create($dto->toArray());

        if ($dto->batch) {
            $variation->createNewBatch($dto->batch);
        }

        $variation->load(['activeBatch']);

        return $this->toResource($variation);
    }

}
