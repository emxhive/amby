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

}
