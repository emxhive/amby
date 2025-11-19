<?php

namespace App\Models;

use App\Models\Config\HasProductHelpers;
use App\Models\Relations\HasProductRelations;
use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    use HasProductHelpers;
    use HasProductRelations;
    use ModelTrait;


    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'price',
        'description',
        'image',
        'status',
        'weight',
        'reviews_count',
        'average_rating',
    ];

    protected $casts = [
        'price' => 'float',
        'weight' => 'float',
        'average_rating' => 'float',
        'reviews_count' => 'integer',
    ];


    protected array $whitelist = [
        'id',
        'name',
        'slug',
        'price',
        'description',
        'image',
        'weight',
        'reviews_count',
        'average_rating',
    ];

    protected array $blacklist = [];

}
