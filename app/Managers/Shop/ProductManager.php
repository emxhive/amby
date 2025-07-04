<?php

namespace App\Managers\Shop;

use App\Managers\BaseManager;
use App\Models\Product;

class ProductManager extends BaseManager
{

    public array $filterable = ["tags", "categories", "price"];

    protected function model()
    {
        return Product::class;
    }

    public function query()
    {
        $query = $this->model()::with($this->relations());
        if (!$this->isAdmin) {
            $query->where('status', 'active');
        }
        return $query;
    }
}
