<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VariationBatch extends Model
{

    use ModelTrait;

    protected $fillable = [
        'product_variation_id',
        'is_open',
        'stock',
        'notes'
    ];

    protected array $whitelist = [
        'id',
        'product_variation_id',
        'is_open',
        'stock',
        'sold',
        'notes',
    ];

    protected array $blacklist = [];

    protected array $relationsMap = [
        'productVariation' => []
    ];

    /**
     * Get the product variation that owns the batch.
     */
    public function productVariation(): BelongsTo
    {
        return $this->belongsTo(ProductVariation::class);
    }

    /**
     * Scope a query to only include open batches.
     */
    public function scopeOpen($query)
    {
        return $query->where('is_open', true);
    }

    /**
     * Scope a query to only include closed batches.
     */
    public function scopeClosed($query)
    {
        return $query->where('is_open', false);
    }
}
