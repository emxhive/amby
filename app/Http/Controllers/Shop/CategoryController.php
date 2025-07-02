<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CrudController;
use App\Http\Controllers\Shop\Implements\HasManagerImplements;
use App\Managers\Shop\CategoryManager;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends CrudController
{

    use HasManagerImplements;
    protected $manager;

    public function __construct(CategoryManager $manager)
    {
        $this->manager = $manager;
    }


}
