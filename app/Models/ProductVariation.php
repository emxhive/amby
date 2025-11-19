<?php

namespace App\Models;

use App\DTOs\VariationBatchDTO;
use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Validation\ValidationException;

class ProductVariation extends Model
{
    use HasFactory;
    use ModelTrait;

    protected $fillable = [
        'product_id',
        'name',
        'price',
        'sku',
        "quantity",
        "quantity_unit"
    ];

    protected array $whitelist = [
        'id',
        'price',
        'sku',

    ];

    protected array $blacklist = [];

    protected array $relationsMap = [
        'product' => [],
        'batches' => [],
        'activeBatch' => []
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get all batches for this variation.
     */
    public function batches(): HasMany
    {
        return $this->hasMany(VariationBatch::class, 'product_variation_id');
    }

    /**
     * Get the active (open) batch for this variation.
     */
    public function activeBatch(): HasOne
    {
        return $this->hasOne(VariationBatch::class, 'product_variation_id')->where('is_open', true);
    }

    /**
     * Get the stock from the active batch.
     */
    public function getStockAttribute()
    {
        return $this->activeBatch ? $this->activeBatch->stock : 0;
    }

    /**
     * Get the sold count from the active batch.
     */
    public function getSoldAttribute()
    {
        return $this->activeBatch ? $this->activeBatch->sold : 0;
    }

    /**
     * Record a sale for this variation.
     * Decrement stock and increments sold in the active batch.
     *
     * @param int $quantity The quantity sold
     * @return bool Whether the sale was successful
     */
    public function recordSale(int $quantity = 1): bool
    {
        $activeBatch = $this->activeBatch;

        if (!$activeBatch || $activeBatch->stock < $quantity) {
            return false;
        }

        $activeBatch->stock -= $quantity;
        $activeBatch->sold += $quantity;

        return $activeBatch->save();
    }


    public function restock(VariationBatchDTO $dto): bool
    {
        $activeBatch = $this->activeBatch;

        if (!$activeBatch) {
            throw ValidationException::withMessages(["restock" => "No active batch for this variation.",
                "level" => "system|critical"
            ]);
        }

        $activeBatch->stock = $dto->stock;
        return $activeBatch->save();
    }

    public function createNewBatch(VariationBatchDTO $dto): ?VariationBatch
    {
        $activeBatch = $this->activeBatch;
        if ($activeBatch) {
            $activeBatch->is_open = false;
            $activeBatch->closed_at = now();
            $activeBatch->save();
        }

        $dto->is_open = true;
        $dto->notes = $dto->notes ?? "First Batch ";
        return $this->batches()->create($dto->toArray());
    }


}
