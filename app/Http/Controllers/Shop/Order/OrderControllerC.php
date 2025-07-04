<?php

namespace App\Http\Controllers\Shop\Order;

use App\Constants\InertiaViews as V;
use App\Http\Controllers\CrudController;
use App\Http\Controllers\Shop\Implements\HasOrderImplements;
use Illuminate\Http\Request;
use Inertia\Response;
use App\Models\Order;

class OrderControllerC extends CrudController
{
    use HasOrderImplements;


    public function index(Request $request): Response
    {
        $filters = $request->only(['status', 'created_at']);
        $orders = $this->manager()->query()->get();

        return inertia(V::C_O_I, $this->wrap($orders, true) + [
                'filters' => $filters,
            ]);
    }

    public function show(Order $order): Response
    {
        return inertia(V::C_O_S, $this->wrap($order));
    }
}
