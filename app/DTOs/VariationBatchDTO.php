<?php

namespace App\DTOs;

class VariationBatchDTO
{
    public bool $is_open;
    public int $stock;
    public ?string $notes;


    public static function fromArray(array $batchData): self
    {
        $dto = new self();

        $dto->is_open = $batchData['is_open'];
        $dto->stock = $batchData['stock'];
        $dto->notes = $batchData['notes'];


        return $dto;
    }


    public function toArray(): array
    {
        return get_object_vars($this);
    }
}
