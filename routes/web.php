<?php

use App\Http\Controllers\Shop\AddressController;
use App\Http\Controllers\Shop\CartController;
use App\Http\Controllers\Shop\Order\ShopOrderController;
use App\Http\Controllers\Shop\Product\ShopProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware('auth')->as('account.')->group(function () {

    Route::resource("orders", ShopOrderController::class)->only(["index", "show"]);
    Route::resource("addresses", AddressController::class);


});

Route::as("shop.")->group(
    function () {
        Route::resource("products", ShopProductController::class)->only(["index", "show"]);
        Route::middleware("auth")->group(function () {
            Route::resource("orders", ShopOrderController::class)->only(["store", "update"]);
            Route::get("checkout", function () {
                return Inertia::render("shop/checkout");
            })->name("checkout");;
        });
    });


Route::prefix('cart')->name('cart.')->group(function () {
    Route::get('/', [CartController::class, 'getCarts'])->name('index');
    Route::post('/add', [CartController::class, 'addToCart'])->name('add');
    Route::post('/remove', [CartController::class, 'removeFromCart'])->name('remove');
    Route::post('/update', [CartController::class, 'updateCart'])->name('update');
});


// Support routes (placeholders)
Route::name('support.')->prefix('support')->group(function () {
    Route::get('/faq', function () {
        abort(501, 'Not implemented');
    })->name('faq');
    Route::get('/shipping', function () {
        abort(501, 'Not implemented');
    })->name('shipping');
    Route::get('/returns', function () {
        abort(501, 'Not implemented');
    })->name('returns');
    Route::get('/warranty', function () {
        abort(501, 'Not implemented');
    })->name('warranty');
    Route::get('/chat', function () {
        abort(501, 'Not implemented');
    })->name('chat');
    Route::get('/shipping-restrictions', function () {
        abort(501, 'Not implemented');
    })->name('shipping_restrictions');
});

// Static pages (placeholders)
Route::name('pages.')->group(function () {
    Route::get('/recipes', function () {
        abort(501, 'Not implemented');
    })->name('recipes');
    Route::get('/about', function () {
        abort(501, 'Not implemented');
    })->name('about');
    Route::get('/contact', function () {
        abort(501, 'Not implemented');
    })->name('contact');
    Route::get('/careers', function () {
        abort(501, 'Not implemented');
    })->name('careers');
    Route::get('/terms', function () {
        abort(501, 'Not implemented');
    })->name('terms');
});

// Blog (placeholders)
Route::prefix('blog')->name('blog.')->group(function () {
    Route::get('/', function () {
        abort(501, 'Not implemented');
    })->name('index');
    Route::get('/category/{slug}', function ($slug) {
        abort(501, 'Not implemented');
    })->name('category');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . "/admin.php";
