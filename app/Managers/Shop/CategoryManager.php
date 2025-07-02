<?php

namespace App\Managers\Shop;

use App\Models\Category;
use App\Managers\BaseManager;

class CategoryManager extends BaseManager
{
    protected function model()
    {
        return Category::class;
    }

    protected function relations(): array
    {
        return ['products'];
    }
}
