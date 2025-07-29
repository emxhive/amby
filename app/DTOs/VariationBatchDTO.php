<?php

namespace App\DTOs;

class VariationBatchDTO
{
    public ?int $id;
    public int $product_variation_id;
    public string $status;
    public int $stock;
    public int $sold;
    public ?string $notes;


    /**
     * Create a new VariationBatchDTO instance from a product data array.
     *
     * @param array $productData The complete product data array
     * @return self
     */
    public static function fromProductArray(array $productData): self
    {
        $dto = new self();

        // Extract batch data from the product data array
        // Assuming the batch data is nested under variation->batch or variation->activeBatch
        $variationData = $productData['variation'] ?? [];
        $batchData = $variationData['batch'] ?? $variationData['activeBatch'] ?? [];

        $dto->id = $batchData['id'] ?? null;
        $dto->product_variation_id = $batchData['product_variation_id'] ?? $variationData['id'] ?? 0;
        $dto->status = $batchData['status'] ?? 'open';
        $dto->stock = $batchData['stock'] ?? 0;
        $dto->sold = $batchData['sold'] ?? 0;
        $dto->notes = $batchData['notes'] ?? null;


        return $dto;
    }

    /**
     * Convert the DTO to an array.
     *
     * @return array
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'product_variation_id' => $this->product_variation_id,
            'status' => $this->status,
            'stock' => $this->stock,
            'sold' => $this->sold,
            'notes' => $this->notes,

        ];
    }
}
