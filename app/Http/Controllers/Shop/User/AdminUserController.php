<?php

namespace App\Http\Controllers\Shop\User;

use App\Constants\InertiaViews as V;
use App\Constants\RouteNames as R;
use App\Http\Controllers\CrudController;
use App\Http\Requests\Shop\StoreUserRequest;
use App\Http\Requests\Shop\UpdateUserRequest;
use App\Managers\Shop\UserManager;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class AdminUserController extends CrudController
{
    protected UserManager $manager;

    public function __construct()
    {
        $this->manager = new UserManager(true);
    }

    protected function manager(): UserManager
    {
        return $this->manager;
    }

    public function index(Request $request)
    {
        $users = $this->manager->query()->paginate(15);

        return Inertia::render('admin/users/index',
            [
                "users" => $this->manager->toResourceCollection($users)
            ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/users/create');
    }

    public function edit(User $user): Response
    {
        return Inertia::render('admin/users/edit', [
            "user" => $this->manager->toResource($user),
        ]);
    }

    public function show(User $user): Response
    {
        return Inertia::render('admin/users/show', $this->wrap($user));
    }

    /**
     * @throws Throwable
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $user = $this->cStore($request);
        return redirect()->route('admin.users.index');
    }

    /**
     * @throws Throwable
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $user = $this->cUpdate($request, $user);
        return redirect()->route('admin.users.index');
    }

    /**
     * @throws Throwable
     */
    public function destroy(User $user): RedirectResponse
    {
        $this->cDestroy($user);
        return redirect()->route('admin.users.index');
    }
}
