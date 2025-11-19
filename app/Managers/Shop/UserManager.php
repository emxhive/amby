<?php

namespace App\Managers\Shop;

use App\Managers\BaseManager;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class UserManager extends BaseManager
{
    public array $filterable = ["name", "email", "created_at"];

    public function __construct(bool $isAdmin = false)
    {
        parent::__construct($isAdmin);
    }

    protected function model(): string
    {
        return User::class;
    }

    public function query(array $relations = null)
    {
        $query = parent::query($relations);
        return $query;
    }
}
