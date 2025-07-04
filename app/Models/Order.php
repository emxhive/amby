<?php

namespace App\Models;

use App\Models\Relations\HasOrderRelations;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    use HasOrderRelations;

    protected $fillable = [
        'user_id',
        'address_id',
        'value',
        'status',
    ];

    protected $casts = [
        'value' => 'float',
    ];

    protected array $whitelist = [
        'id', 'user_id', 'address_id', 'value', 'status', 'created_at', 'updated_at'
    ];
    protected array $blacklist = [];
}
