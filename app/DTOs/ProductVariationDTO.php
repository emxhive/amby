<?php

namespace App\DTOs;

class ProductVariationDTO
{
    public ?int $id;
    public int $product_id;
    public string $sku;
    public float $price;
    public ?float $quantity;
    public ?string $quantity_unit;
    public string $status;
    public ?array $attributes;

    /**
     * Create a new ProductVariationDTO instance from a product data array.
     *
     * @param array $productData The complete product data array
     * @return array
     */
    public static function fromProductArray(array $productData): array
    {
        $dtos = [];

        foreach ($productData['variations'] ?? [] as $variation) {
            $dto = new self();

            $dto->id = $variation['id'] ?? null;
            $dto->product_id = $variation['product_id'] ?? $productData['id'];
            $dto->sku = $variation['sku'] ?? '';
            $dto->price = $variation['price'] ?? $productData['price'] ?? 0;

            $dto->quantity = $variation['quantity'] ?? null;
            $dto->quantity_unit = $variation['quantity_unit'] ?? null;
            $dto->status = $variation['status'] ?? 'active';
            $dto->attributes = $variation['attributes'] ?? null;

            $dtos[] = $dto;
        }

        return $dtos;
    }

    /**
     * Convert the DTO to an array.
     *
     * @return array
     */
    public function toArray(): array
    {
        return get_object_vars($this);
    }
}
