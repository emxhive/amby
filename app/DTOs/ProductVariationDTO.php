<?php

namespace App\DTOs;

class ProductVariationDTO
{
    public ?int $id;
    public string $sku;
    public float $price;
    public ?float $quantity;
    public ?string $quantity_unit;
    public bool $is_active;
    public ?array $attributes;
    public ?VariationBatchDTO $batch;


    public static function fromProductArray(array $productData): array
    {
        $dtos = [];

        foreach ($productData['variations'] ?? [] as $variation) {
            $dto = new self();

            $dto->id = $variation['id'] ?? null;
            $dto->sku = $variation['sku'] ?? '';
            $dto->price = $variation['price'] ?? $productData['price'] ?? 0;

            $dto->quantity = $variation['quantity'] ?? null;
            $dto->quantity_unit = $variation['quantity_unit'] ?? null;
            $dto->is_active = $variation['is_active'] ?? true;
            $dto->attributes = $variation['attributes'] ?? null;


            $dto->batch = VariationBatchDTO::fromArray([
                "is_open" => $variation["is_new_batch"] ?? false,
                "stock" => $dto->stock ?? 50,
                'notes' => $variation['notes'] ?? null,
            ]);


            $dtos[] = $dto;
        }

        return $dtos;
    }

    public function toArray(): array
    {

        $arr = get_object_vars($this);
        unset($arr['batch']);
        return $arr;
    }
}
