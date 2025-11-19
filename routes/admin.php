<?php


use App\Constants\Permissions as P;
use App\Http\Controllers\Shop\Category\AdminCategoryController;
use App\Http\Controllers\Shop\Order\AdminOrderController;
use App\Http\Controllers\Shop\Product\AdminProductController;
use App\Http\Controllers\Shop\Recipe\AdminRecipeController;
use App\Http\Controllers\Shop\Review\AdminReviewController;
use App\Http\Controllers\Shop\User\AdminUserController;
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
            Route::post("products/upload", [AdminProductController::class, "upload"])->name('products.upload');

            Route::resource("orders", AdminOrderController::class);
            Route::resource("categories", AdminCategoryController::class);
            Route::resource("users", AdminUserController::class);
            Route::resource("recipes", AdminRecipeController::class);
            Route::resource("reviews", AdminReviewController::class);
        });

    });


Route::get("/base", function () {
    return response('', 204);
})->name("admin.base");
