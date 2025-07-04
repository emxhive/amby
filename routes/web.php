<?php

use App\Http\Controllers\Shop\AddressController;
use App\Http\Controllers\Shop\CartController;
use App\Http\Controllers\Shop\Order\OrderControllerC;
use App\Http\Controllers\Shop\OrderController;
use App\Http\Controllers\Shop\Product\ProductControllerC;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


});

Route::as("shop.")->group(
    function () {
        Route::resource("products", ProductControllerC::class)->only(["index", "show"]);
    });


Route::get('/cart', [CartController::class, 'getCarts']);
Route::post('/cart/add', [CartController::class, 'addToCart']);
Route::post('/cart/remove', [CartController::class, 'removeFromCart']);
Route::post('/cart/update', [CartController::class, 'updateCart']);


Route::middleware(["auth"])->group(function () {

    Route::resource("orders", OrderControllerC::class)->only(["index", "show"]);

    Route::resource("address", AddressController::class);
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . "/admin.php";
