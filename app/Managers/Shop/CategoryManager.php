<?php

namespace App\Managers\Shop;

use App\Managers\BaseManager;
use App\Models\Category;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryManager extends BaseManager
{
    public array $filterable = ["name", "parent_id", "is_default"];

    protected function model(): string
    {
        return Category::class;
    }


    public function store(array $data, array $relations = null): JsonResource
    {
        $data = $this->imageService()->upload($data);
        return parent::store($data, $relations);

    }
}
