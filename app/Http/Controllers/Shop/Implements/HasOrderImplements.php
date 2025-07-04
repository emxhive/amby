<?php

namespace App\Http\Controllers\Shop\Implements;

use App\Managers\Shop\OrderManager;
use App\Models\Order;


trait HasOrderImplements
{
    use HasManagerImplements;

    public function __construct(OrderManager $manager)
    {
        $this->manager = $manager;
    }


    public function show(Order $order): Order
    {
        return $order;
    }

    public function update($request, Order $order)
    {
        return $this->cUpdate($request, $order);
    }

    public function destroy(Order $order)
    {
        return $this->cDestroy($order);
    }
}
