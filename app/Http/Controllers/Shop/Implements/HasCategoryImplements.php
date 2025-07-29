<?php

namespace App\Http\Controllers\Shop\Implements;

use App\Managers\Shop\CategoryManager;
use App\Models\Category;
use Illuminate\Http\Request;

trait HasCategoryImplements
{
    use HasManagerImplements;

    public function __construct(CategoryManager $manager)
    {
        $this->manager = $manager;
    }

    public function show(Category $category): array
    {
        return $this->wrap($category);
    }

    public function update(Request $request, Category $category)
    {
        return $this->cUpdate($request, $category);
    }

    public function destroy(Category $category)
    {
        return $this->cDestroy($category);
    }
}
