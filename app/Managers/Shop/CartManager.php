<?php

namespace App\Managers\Shop;

use App\Models\Cart;
use App\Managers\BaseManager;

class CartManager extends BaseManager
{
    protected function model()
    {
        return Cart::class;
    }

    protected function relations(): array
    {
        return ['user','cartItems'];
    }
}
