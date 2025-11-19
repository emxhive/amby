<?php

namespace App\Managers\Shop;

use App\Managers\BaseManager;
use App\Models\Review;
use Illuminate\Database\Eloquent\Model;

class ReviewManager extends BaseManager
{
    public array $filterable = ["rating", "status", "product_id", "user_id", "created_at"];

    public function __construct(bool $isAdmin = false)
    {
        parent::__construct($isAdmin);
    }

    protected function model(): string
    {
        return Review::class;
    }

    public function query(array $relations = null)
    {
        $query = parent::query($relations);
        if (!$this->isAdmin) {
            $query->where('status', 'approved');
        }
        return $query;
    }
}
