<?php

namespace App\Managers\Shop;

use App\Models\OrderItem;
use App\Managers\BaseManager;

class OrderItemManager extends BaseManager
{
    protected function model()
    {
        return OrderItem::class;
    }

    protected function relations(): array
    {
        return ['order','product','productVariation'];
    }
}
