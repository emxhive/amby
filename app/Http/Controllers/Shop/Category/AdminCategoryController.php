<?php

namespace App\Http\Controllers\Shop\Category;

use App\Constants\InertiaViews as V;
use App\Constants\RouteNames as R;
use App\Http\Controllers\CrudController;
use App\Http\Controllers\Shop\Implements\HasCategoryImplements;
use App\Http\Requests\Shop\StoreCategoryRequest;
use App\Http\Requests\Shop\UpdateCategoryRequest;
use App\Managers\Shop\CategoryManager;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use JetBrains\PhpStorm\NoReturn;
use Throwable;

class AdminCategoryController extends CrudController
{
    use HasCategoryImplements;

    public function __construct()
    {
        $this->init(CategoryManager::class, true);
    }

    public function index(Request $request)
    {
        $categories = $this->manager->query(['parent', 'children'])->paginate(15);



        return Inertia::render(V::A_C_I,
            [
                "categories" => $this->manager->toResourceCollection($categories)
            ]);
    }

    public function create(): Response
    {
        $categories = Category::all();
        return Inertia::render(V::A_C_C, [
            "categories" => $this->manager->toResourceCollection($categories),
        ]);
    }

    public function show(Category $category): Response
    {
        // Load relationships
        $category->load(['parent', 'children', 'products']);

        return Inertia::render(V::A_C_S, $this->wrap($category, "category"));
    }

    /**
     * @throws Throwable
     */
    #[NoReturn] public function store(StoreCategoryRequest $request)
    {
        $category = $this->cStore($request);
//        return redirect()->route(R::A_C_S, ['category' => $category->id]);
    }

    /**
     * @throws Throwable
     */
    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $category = $this->cUpdate($request, $category);
        return redirect()->route(R::A_C_S, ['category' => $category->id]);
    }

    /**
     * @throws Throwable
     */
    public function destroy(Category $category): RedirectResponse
    {
        $this->cDestroy($category);
        return redirect()->route(R::A_C_I);
    }
}
