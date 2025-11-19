<?php

namespace App\Managers\Shop;

use App\Managers\BaseManager;
use App\Models\Tag;

class TagManager extends BaseManager
{
    protected function model(): string
    {
        return Tag::class;
    }

}
