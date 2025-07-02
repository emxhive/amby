<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class PermissionServiceProvider extends AuthServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

        $this->registerPolicies();
        Gate::before(function ($user, $ability) {
            return $user->hasRole("super-admin") ? true : null;
        });
    }
}
