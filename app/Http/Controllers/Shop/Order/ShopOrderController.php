<?php

namespace App\Http\Controllers\Shop\Order;

use App\Constants\InertiaViews as V;
use App\Http\Controllers\CrudController;
use App\Http\Controllers\Shop\Implements\HasOrderImplements;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Response;

class ShopOrderController extends CrudController
{
    use HasOrderImplements;


    public function index(Request $request): Response
    {
        $filters = $request->only(['status', 'created_at']);

        // Only load the necessary relationships for the index view
        $orders = $this->manager()->query(['user'])->paginate(15);

        return inertia(V::S_O_I, $this->wrap($orders, true) + [
                'filters' => $filters,
            ]);
    }

    public function show(Order $order): Response
    {
        // For the show view, we need more detailed information including items and address
        $order->load(['user', 'address', 'orderItems']);

        return inertia(V::S_O_S, $this->wrap($order));
    }
}
