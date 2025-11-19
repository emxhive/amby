<?php

namespace App\Observers;

use App\Models\Product;
use App\Models\ProductReview;

class ProductReviewObserver
{
    public function created(ProductReview $review): void
    {
        $this->recalc($review->product);
    }

    public function updated(ProductReview $review): void
    {
        $this->recalc($review->product);
    }

    public function deleted(ProductReview $review): void
    {
        $product = $review->product()->with('reviews')->first();
        $this->recalc($product);
    }

    protected function recalc(?Product $product): void
    {
        if (!$product) return;
        // Recalculate using DB aggregates for accuracy
        $count = $product->reviews()->count();
        $avg = $product->reviews()->avg('rating');
        $product->reviews_count = $count;
//        $product->average_rating = $avg ? round((float)$avg, 2) : 0.0;
        $product->save();
    }
}
