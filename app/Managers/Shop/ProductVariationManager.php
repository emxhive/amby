<?php

namespace App\Managers\Shop;

use App\Models\ProductVariation;
use App\Managers\BaseManager;

class ProductVariationManager extends BaseManager
{
    protected function model(): string
    {
        return ProductVariation::class;
    }

    /**
     * Store a new product variation with its batch from a DTO.
     *
     * @param \App\DTOs\ProductVariationDTO $dto
     * @param array|null $relations
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function storeFromDTO(\App\DTOs\ProductVariationDTO $dto, array $relations = null): \Illuminate\Http\Resources\Json\JsonResource
    {
        // Convert DTO to array for the variation
        $variationData = $dto->toArray();

        // Store the variation
        $variation = $this->store($variationData, $relations);

        // If there's a batch DTO, store it using the VariationBatchManager
        if ($dto->batch) {
            // Make sure the product_variation_id is set correctly
            $dto->batch->product_variation_id = $variation->id;

            // Create and use the VariationBatchManager to store the batch
            $batchManager = new \App\Managers\Shop\VariationBatchManager();
            $batchManager->storeFromDTO($dto->batch);
        }

        return $variation;
    }
}
