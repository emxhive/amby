<?php

namespace App\Managers\Shop;

use App\Models\User;
use App\Managers\BaseManager;

class UserManager extends BaseManager
{
    protected function model()
    {
        return User::class;
    }

    protected function relations(): array
    {
        return ['addresses','orders','carts'];
    }
}
