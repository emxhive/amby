<?php


use App\Constants\Permissions as P;
use App\Http\Controllers\Shop\Order\OrderControllerA;
use App\Http\Controllers\Shop\Product\ProductControllerA;
use Illuminate\Support\Facades\Route;

Route::middleware(["auth", "verified", "permission:" . P::ADMIN_PANEL])
    ->prefix("admin")
    ->as("admin.")
    ->group(function () {
        Route::resource("products", ProductControllerA::class);
        Route::resource("orders", OrderControllerA::class);
    });
