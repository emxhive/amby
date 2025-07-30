<?php

namespace App\Managers\Shop;

use App\Models\Cart;
use App\Managers\BaseManager;

class CartManager extends BaseManager
{
    protected function model(): string
    {
        return Cart::class;
    }

}
