<?php

namespace App\Models\Attributes;

trait HasProductAttributes
{
    protected $appends = [
        'has_variations',
    ];

    public function getHasVariationsAttribute(): bool
    {
        return $this->variations()->exists();
    }


}
