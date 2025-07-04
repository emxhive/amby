<?php

namespace App\Managers\Shop;

use App\Managers\BaseManager;
use App\Models\Product;

class ProductManager extends BaseManager
{

    public array $filterable = ["tags", "categories", "price"];

    protected function model(): string
    {
        return Product::class;
    }

    public function query(array $relations = null)
    {
        $query = parent::query($relations);
        if (!$this->isAdmin) {
            $query->where('status', 'active');
        }
        return $query;
    }
}
