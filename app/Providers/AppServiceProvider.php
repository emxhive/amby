<?php

namespace App\Providers;

use App\Models\ProductReview;
use App\Observers\ProductReviewObserver;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();
        // Register model observers
        ProductReview::observe(ProductReviewObserver::class);
    }
}
