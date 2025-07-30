<?php

namespace App\Managers\Shop;

use App\DTOs\VariationBatchDTO;
use App\Managers\BaseManager;
use App\Models\VariationBatch;
use Illuminate\Http\Resources\Json\JsonResource;
use Throwable;

class VariationBatchManager extends BaseManager
{
    protected function model(): string
    {
        return VariationBatch::class;
    }

    /**
     * @throws Throwable
     */
    public function storeFromDTO(VariationBatchDTO $dto, array $relations = null): JsonResource
    {
        // Convert DTO to array
        $batchData = $dto->toArray();

        // Store the batch
        return $this->store($batchData, $relations);
    }
}
