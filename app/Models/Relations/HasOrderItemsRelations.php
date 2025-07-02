<?php

namespace App\Models\Relations;

use App\Models\Order;
use App\Models\Product;
use App\Models\ProductVariation;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasOrderItemsRelations
{


    public function productVariation(): BelongsTo
    {
        return $this->belongsTo(ProductVariation::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
