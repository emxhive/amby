<?php

namespace App\Managers\Shop;

use App\Models\Tag;
use App\Managers\BaseManager;

class TagManager extends BaseManager
{
    protected function model()
    {
        return Tag::class;
    }

    protected function relations(): array
    {
        return ['products'];
    }
}
