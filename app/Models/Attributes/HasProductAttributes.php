<?php

namespace App\Models\Attributes;

trait HasProductAttributes
{


    public function getHasVariationsAttribute(): bool
    {
        return $this->variations()->exists();
    }


}
