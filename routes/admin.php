<?php


use App\Enums\Permissions as P;
use App\Http\Controllers\Shop\OrderController;
use App\Http\Controllers\Shop\Product\ProductControllerA;
use Illuminate\Support\Facades\Route;

Route::middleware(["permission:" . P::ADMIN_PANEL])
    ->prefix("admin")
    ->as("admin.")
    ->group(function () {

        Route::resource("products", ProductControllerA::class);
        Route::resource("orders", OrderController::class);
    });
