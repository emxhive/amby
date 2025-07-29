<?php

namespace App\Models;

use App\Models\Attributes\HasProductAttributes;
use App\Models\Config\HasProductHelpers;
use App\Models\Relations\HasProductRelations;
use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    use HasProductHelpers;
    use HasProductRelations;
    use HasProductAttributes;
    use ModelTrait;

    protected $appends = [
        'has_variations',
    ];

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'price',
        'description',
        'image',
        'status',
        'weight',
    ];

    protected $casts = [
        'price' => 'float',
        'weight' => 'float',
    ];


    protected array $whitelist = [
        'id',
        'name',
        'slug',
        'price',
        'description',
        'image',
        'weight'
    ];

    protected array $blacklist = [];

}
