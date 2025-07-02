<?php

namespace App\Managers\Shop;

use App\Models\Address;
use App\Managers\BaseManager;

class AddressManager extends BaseManager
{
    protected function model(): string
    {
        return Address::class;
    }

    protected function relations(): array
    {
        return ['user'];
    }
}
