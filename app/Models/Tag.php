<?php

namespace App\Models;

use Database\Factories\TagFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Traits\ModelTrait;

class Tag extends Model
{
    use HasFactory;
    use ModelTrait;

    protected $fillable = [
        'name',
        'slug'
    ];

    protected array $whitelist = [
        'id',
        'name',
        'slug'
    ];

    protected array $blacklist = [];

    protected array $relationsMap = [
        'products' => []
    ];


    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class);
    }


}
