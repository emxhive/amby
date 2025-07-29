<?php

namespace App\Models;

use Database\Factories\CategoryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Traits\ModelTrait;

class Category extends Model
{

    use HasFactory;
    use ModelTrait;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'parent_id',
        'image',
        'is_default'
    ];

    protected array $whitelist = [
        'id',
        'name',
        'slug',
        'description',
        'parent_id',
        'image',
        'is_default'
    ];

    protected array $blacklist = [];

    protected array $relationsMap = [
        'parent' => [],
        'children' => [],
        'products' => []
    ];


    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    /**
     * Get the default category ID.
     *
     * @return int|null The ID of the default category, or null if no default category exists
     */
    public static function getDefaultId(): ?int
    {
        // Get the category marked as default
        $defaultCategory = self::where('is_default', true)->first();

        // If no default category is found, fall back to the first category
        if (!$defaultCategory) {
            $defaultCategory = self::first();
        }

        return $defaultCategory?->id;
    }

}
