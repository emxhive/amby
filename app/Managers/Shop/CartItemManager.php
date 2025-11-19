<?php

namespace App\Managers\Shop;

use App\Managers\BaseManager;
use App\Models\CartItem;

class CartItemManager extends BaseManager
{
    protected function model(): string
    {
        return CartItem::class;
    }


}
