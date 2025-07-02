<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CrudController;
use App\Http\Controllers\Shop\Implements\HasOrderImplements;
use App\Http\Requests\Shop\StoreOrderRequest;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends CrudController
{

    use HasOrderImplements;

    public function index()
    {

    }

    public function store(StoreOrderRequest $request)
    {

    }


}
