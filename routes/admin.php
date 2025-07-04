<?php


use App\Constants\Permissions as P;
use App\Http\Controllers\Shop\Order\AdminOrderController;
use App\Http\Controllers\Shop\Product\AdminProductController;
use Illuminate\Support\Facades\Route;

Route::middleware(["auth", "verified", "permission:" . P::ADMIN_PANEL])
    ->prefix("admin")
    ->as("admin.")
    ->group(function () {
        Route::resource("products", AdminProductController::class);
        Route::resource("orders", AdminOrderController::class);
    });
