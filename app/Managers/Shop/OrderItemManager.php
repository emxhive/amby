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

}
