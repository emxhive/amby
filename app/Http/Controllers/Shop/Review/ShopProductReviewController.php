<?php

namespace App\Http\Controllers\Shop\Review;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use App\Models\ProductReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ShopProductReviewController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();
        $validated = $request->validate([
            'order_item_id' => ['required','integer','exists:order_items,id'],
            'product_id' => ['required','integer','exists:products,id'],
            'rating' => ['required','integer','min:1','max:5'],
            'title' => ['nullable','string','max:255'],
            'body' => ['nullable','string'],
        ]);

        // Ensure the order item belongs to the user and references the product
        /** @var OrderItem $orderItem */
        $orderItem = OrderItem::query()->with('order')->findOrFail($validated['order_item_id']);
        abort_unless($orderItem->order && $orderItem->order->user_id === $user->id, 403, 'You do not own this order item.');
        abort_unless($orderItem->product_id === (int)$validated['product_id'], 422, 'Order item does not match the product.');

        // Ensure only one review per order item
        $exists = ProductReview::where('order_item_id', $orderItem->id)->exists();
        abort_if($exists, 422, 'You have already reviewed this order item.');

        $review = ProductReview::create([
            'order_item_id' => $orderItem->id,
            'product_id' => $validated['product_id'],
            'user_id' => $user->id,
            'rating' => $validated['rating'],
            'title' => $validated['title'] ?? null,
            'body' => $validated['body'] ?? null,
        ]);

        return response()->json($review->toArray(), 201);
    }
}
