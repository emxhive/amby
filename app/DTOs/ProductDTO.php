<?php

namespace App\DTOs;

class ProductDTO
{
    public ?int $id;
    public ?int $category_id;
    public string $name;
    public ?string $description;
    public ?string $image;
    public string $status;


    public static function fromProductArray(array $productData): self
    {
        $dto = new self();
        $dto->id = $productData['id'] ?? null;
        $dto->category_id = $productData['category_id'] ?? null;
        $dto->name = $productData['name'];
        $dto->description = $productData['description'] ?? null;
        $dto->image = $productData['image'] ?? null;
        $dto->status = $productData['status'] ?? 'active';


        return $dto;
    }

    public function toArray(): array
    {
        return get_object_vars($this);
    }
}
