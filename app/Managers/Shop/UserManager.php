<?php

namespace App\Managers\Shop;

use App\Models\User;
use App\Managers\BaseManager;

class UserManager extends BaseManager
{
    protected function model(): string
    {
        return User::class;
    }

}
