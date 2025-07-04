<?php

namespace App\Http\Controllers\Shop\Implements;

use App\Managers\BaseManager;

trait HasManagerImplements
{

    protected BaseManager $manager;

    protected function manager(): BaseManager
    {
        return $this->manager;
    }

    protected function init($ManagerClass, $isAdmin = false): void
    {
        $this->manager = new $ManagerClass($isAdmin);
    }
}
