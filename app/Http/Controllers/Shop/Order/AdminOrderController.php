<?php

namespace App\Http\Controllers\Shop\Order;

use App\Constants\InertiaViews as V;
use App\Constants\RouteNames as R;
use App\Http\Controllers\CrudController;
use App\Http\Controllers\Shop\Implements\HasOrderImplements;
use App\Http\Requests\Shop\StoreOrderRequest;
use App\Http\Requests\Shop\UpdateOrderRequest;
use App\Managers\Shop\OrderManager;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class AdminOrderController extends CrudController
{
    use HasOrderImplements;

    public function __construct()
    {
        $this->init(OrderManager::class, true);

    }

    public function index(Request $request): Response
    {
        $filters = $request->only($this->manager->filterable);
        // Only load necessary relationships for the index view and use pagination
        $orders = $this->manager()->query(['user'])->paginate(15);

        return inertia(V::A_O_I, $this->wrap($orders, true) + [
                'filters' => $filters,
            ]);
    }

    public function show(Order $order): Response
    {
        // For the show view, we need more detailed information including items and address
        $order->load(['user', 'address', 'orderItems']);

        return inertia(V::A_O_S, $this->wrap($order));
    }


    public function store(StoreOrderRequest $request): RedirectResponse
    {

        $order = $this->cStore($request);
        return redirect()->route(R::A_O_S, ['id' => $order->id]);
    }

    public function update(UpdateOrderRequest $request, Order $order): RedirectResponse
    {
        $order = $this->cUpdate($request, $order);
        return redirect()->route(R::A_O_S, ['id' => $order->id]);
    }

    public function destroy(Order $order): RedirectResponse
    {
        $this->cDestroy($order);
        return redirect()->route(V::A_O_I);
    }
}
