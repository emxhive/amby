<?php

namespace App\Managers\Shop;

use App\Managers\BaseManager;
use App\Models\Product;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductManager extends BaseManager
{
    protected function model(): string
    {
        return Product::class;
    }


    public function list(): ResourceCollection
    {
        $query = $this->query();

        if (!$this->isAdmin) {
            $query->where("status", 'active');
        }
        return $this->toResourceCollection($query->paginate());
    }

}
