<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Traits\ModelTrait;

class ProductVariation extends Model
{
    use HasFactory;
    use ModelTrait;

    protected $fillable = [
        'product_id',
        'name',
        'price',
        'sku'
    ];

    protected array $whitelist = [
        'id',
        'product_id',
        'name',
        'price',
        'sku'
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
        return $this->hasOne(VariationBatch::class, 'product_variation_id')->where('is_open', 'true');
    }

    /**
     * Get the stock from the active batch.
     */
    public function getStockAttribute()
    {
        return $this->activeBatch ? $this->activeBatch->stock : 0;
    }

    /**
     * Record a sale for this variation.
     * Decrement stock in the active batch.
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

        return $activeBatch->save();
    }

    /**
     * Restock this variation.
     * Increments stock in the active batch.
     *
     * @param int $quantity The quantity to add
     * @param string|null $notes Notes about the restocking
     * @return bool Whether the restocking was successful
     */
    public function restock(int $quantity, ?string $notes = null): bool
    {
        $activeBatch = $this->activeBatch;

        if (!$activeBatch) {
            // Create a new batch if none exists
            return (bool) $this->batches()->create([
                'is_open' => 'true',
                'stock' => $quantity,
                'notes' => $notes ?? 'Restock',
            ]);
        }

        $activeBatch->stock += $quantity;

        if ($notes) {
            $activeBatch->notes = $activeBatch->notes
                ? $activeBatch->notes . "\n" . $notes
                : $notes;
        }

        return $activeBatch->save();
    }

    /**
     * Create a new batch for this variation.
     * Closes the current active batch and creates a new one.
     *
     * @param int $stock Initial stock for the new batch
     * @param string|null $notes Notes for the new batch
     * @return VariationBatch|null The new batch or null if creation failed
     */
    public function createNewBatch(int $stock, ?string $notes = null): ?VariationBatch
    {
        // Close the current active batch if it exists
        $activeBatch = $this->activeBatch;
        if ($activeBatch) {
            $activeBatch->is_open = 'false';
            $activeBatch->save();
        }

        // Create a new batch
        return $this->batches()->create([
            'is_open' => 'true',
            'stock' => $stock,
            'notes' => $notes ?? 'New production batch',
        ]);
    }
}
