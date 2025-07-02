<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // Get both carts
    public function getCarts(Request $request): JsonResponse
    {
        $sessionCart = session('cart', []);
        $dbCart = null;

        if ($request->user()) {
            $dbCart = Cart::with('items')->where('user_id', $request->user()->id)->first();
        }

        return response()->json([
            'session_cart' => $sessionCart,
            'db_cart' => $dbCart,
        ]);
    }

    // Add item to specified cart
    public function addToCart(Request $request): JsonResponse
    {
        $cartType = $request->input('cart_type', 'session'); // 'session' or 'db'
        $productId = $request->input('product_id');
        $qty = $request->input('quantity', 1);

        if ($cartType === 'session') {
            $cart = session('cart', []);
            $cart[$productId] = ($cart[$productId] ?? 0) + $qty;
            session(['cart' => $cart]);
            return response()->json(['cart' => $cart]);
        } elseif ($cartType === 'db' && $request->user()) {
            $cart = Cart::firstOrCreate(['user_id' => $request->user()->id]);
            $item = $cart->items()->firstOrNew(['product_id' => $productId]);
            $item->quantity += $qty;
            $item->save();
            return response()->json(['cart' => $cart->load('items')]);
        }

        return response()->json(['error' => 'Invalid cart type'], 400);
    }

    // Remove item from specified cart
    public function removeFromCart(Request $request): JsonResponse
    {
        $cartType = $request->input('cart_type', 'session');
        $productId = $request->input('product_id');

        if ($cartType === 'session') {
            $cart = session('cart', []);
            unset($cart[$productId]);
            session(['cart' => $cart]);
            return response()->json(['cart' => $cart]);
        } elseif ($cartType === 'db' && $request->user()) {
            $cart = Cart::where('user_id', $request->user()->id)->first();
            if ($cart) {
                $cart->items()->where('product_id', $productId)->delete();
            }
            return response()->json(['cart' => $cart?->load('items')]);
        }

        return response()->json(['error' => 'Invalid cart type'], 400);
    }

    // Update quantity in specified cart
    public function updateCart(Request $request): JsonResponse
    {
        $cartType = $request->input('cart_type', 'session');
        $productId = $request->input('product_id');
        $qty = $request->input('quantity', 1);

        if ($cartType === 'session') {
            $cart = session('cart', []);
            if ($qty > 0) {
                $cart[$productId] = $qty;
            } else {
                unset($cart[$productId]);
            }
            session(['cart' => $cart]);
            return response()->json(['cart' => $cart]);
        } elseif ($cartType === 'db' && $request->user()) {
            $cart = Cart::where('user_id', $request->user()->id)->first();
            if ($cart) {
                $item = $cart->items()->where('product_id', $productId)->first();
                if ($item) {
                    if ($qty > 0) {
                        $item->quantity = $qty;
                        $item->save();
                    } else {
                        $item->delete();
                    }
                }
            }
            return response()->json(['cart' => $cart?->load('items')]);
        }

        return response()->json(['error' => 'Invalid cart type'], 400);
    }
}
