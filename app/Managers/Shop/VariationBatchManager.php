<?php

namespace App\Managers\Shop;

use App\DTOs\VariationBatchDTO;
use App\Managers\BaseManager;
use App\Models\VariationBatch;
use Illuminate\Http\Resources\Json\JsonResource;

class VariationBatchManager extends BaseManager
{
    protected function model(): string
    {
        return VariationBatch::class;
    }

    /**
     * Store a new variation batch from a DTO.
     *
     * @param VariationBatchDTO $dto
     * @param array|null $relations
     * @return JsonResource
     */
    public function storeFromDTO(VariationBatchDTO $dto, array $relations = null): JsonResource
    {
        // Convert DTO to array
        $batchData = $dto->toArray();

        // Store the batch
        return $this->store($batchData, $relations);
    }
}
