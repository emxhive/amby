<?php

namespace App\Models;

use App\Models\Relations\HasOrderItemsRelations;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasOrderItemsRelations;

    protected $fillable = [
        'order_id',
        'product_id',
        'product_variation_id',
        'quantity',
        'price',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'price' => 'float',
    ];
}
