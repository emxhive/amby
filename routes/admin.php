<?php


use App\Constants\Permissions as P;
use App\Http\Controllers\Shop\Category\AdminCategoryController;
use App\Http\Controllers\Shop\Order\AdminOrderController;
use App\Http\Controllers\Shop\Product\AdminProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(["auth", "verified", "permission:" . P::ADMIN_PANEL])
    ->prefix("admin")
    ->group(function () {


        Route::get("/", function () {
            return Inertia::render("admin/dashboard");
        })->name("admin.dashboard");


        Route::as("admin.")->group(function () {
            Route::resource("products", AdminProductController::class);
            Route::resource("orders", AdminOrderController::class);
            Route::resource("categories", AdminCategoryController::class);
        });

    });


Route::get("/base", function () {
    return response('', 204);
})->name("admin.base");
