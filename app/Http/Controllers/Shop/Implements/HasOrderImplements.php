<?php

namespace App\Http\Controllers\Shop\Implements;

use App\Managers\Shop\OrderManager;
use App\Models\Order;
use Illuminate\Http\Request;

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

    public function update(Request $request, Order $order)
    {
        return $this->cUpdate($request, $order);
    }

    public function destroy(Order $order)
    {
        return $this->cDestroy($order);
    }
}
