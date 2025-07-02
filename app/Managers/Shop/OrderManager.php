<?php

namespace App\Managers\Shop;

use App\Models\Order;
use App\Managers\BaseManager;

class OrderManager extends BaseManager
{
    protected function model(): string
    {
        return Order::class;
    }

    protected function relations(): array
    {
        return ['user','orderItems'];
    }
}
