<?php

namespace App\Managers\Shop;

use App\Models\CartItem;
use App\Managers\BaseManager;

class CartItemManager extends BaseManager
{
    protected function model()
    {
        return CartItem::class;
    }

    protected function relations(): array
    {
        return ['cart','product','productVariation'];
    }
}
