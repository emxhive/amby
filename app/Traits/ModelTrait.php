<?php

namespace App\Traits;

trait ModelTrait
{
    public function getBlackList(): array
    {
        return $this->blacklist ?? [];
    }

    public function getWhiteList(): array
    {
        return $this->whitelist ?? [];
    }

    public function getRelationsMap(): array
    {
        return $this->relationsMap ?? [];
    }
}
