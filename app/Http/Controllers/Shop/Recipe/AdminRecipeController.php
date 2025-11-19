<?php

namespace App\Http\Controllers\Shop\Recipe;

use App\Http\Controllers\CrudController;
use App\Http\Requests\Shop\StoreRecipeRequest;
use App\Http\Requests\Shop\UpdateRecipeRequest;
use App\Managers\BaseManager;
use App\Managers\Shop\RecipeManager;
use App\Models\Recipe;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class AdminRecipeController extends CrudController
{
    protected RecipeManager $manager;

    public function __construct()
    {
        $this->manager = new RecipeManager(true);
    }

    protected function manager(): BaseManager
    {
        return $this->manager;
    }

    public function index(Request $request)
    {
        $recipes = $this->manager->query()->paginate(15);

        return Inertia::render('admin/recipes/index',
            [
                "recipes" => $this->manager->toResourceCollection($recipes)
            ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/recipes/create');
    }

    public function edit(Recipe $recipe): Response
    {
        return Inertia::render('admin/recipes/edit', [
            "recipe" => $this->manager->toResource($recipe),
        ]);
    }

    public function show(Recipe $recipe): Response
    {
        return Inertia::render('admin/recipes/show', $this->wrap($recipe));
    }

    /**
     * @throws Throwable
     */
    public function store(StoreRecipeRequest $request): RedirectResponse
    {
        $recipe = $this->cStore($request);
        return redirect()->route('admin.recipes.index');
    }

    /**
     * @throws Throwable
     */
    public function update(UpdateRecipeRequest $request, Recipe $recipe): RedirectResponse
    {
        $recipe = $this->cUpdate($request, $recipe);
        return redirect()->route('admin.recipes.index');
    }

    /**
     * @throws Throwable
     */
    public function destroy(Recipe $recipe): RedirectResponse
    {
        $this->cDestroy($recipe);
        return redirect()->route('admin.recipes.index');
    }
}
