<?php

namespace App\Managers\Shop;

use App\Managers\BaseManager;
use App\Models\Order;

class OrderManager extends BaseManager
{
    protected function model(): string
    {
        return Order::class;
    }

    public array $filterable = [
        'status',
        'created_at',
        'user_id',
    ];

    public function query(array $relations = null)
    {
        $query = parent::query($relations);
        if (!$this->isAdmin) {
            $query->where('user_id', auth()->id());
        }
        return $query;
    }
}
