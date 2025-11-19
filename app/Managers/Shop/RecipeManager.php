<?php

namespace App\Managers\Shop;

use App\Managers\BaseManager;
use App\Models\Recipe;
use Illuminate\Database\Eloquent\Model;

class RecipeManager extends BaseManager
{
    public array $filterable = ["title", "status", "created_at"];

    public function __construct(bool $isAdmin = false)
    {
        parent::__construct($isAdmin);
    }

    protected function model(): string
    {
        return Recipe::class;
    }

    public function query(array $relations = null)
    {
        $query = parent::query($relations);
        if (!$this->isAdmin) {
            $query->where('status', 'published');
        }
        return $query;
    }
}
