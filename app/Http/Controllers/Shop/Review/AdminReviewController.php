<?php

namespace App\Http\Controllers\Shop\Review;

use App\Http\Controllers\CrudController;
use App\Http\Requests\Shop\StoreReviewRequest;
use App\Http\Requests\Shop\UpdateReviewRequest;
use App\Managers\BaseManager;
use App\Managers\Shop\ReviewManager;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class AdminReviewController extends CrudController
{
    protected ReviewManager $manager;

    public function __construct()
    {
        $this->manager = new ReviewManager(true);
    }

    protected function manager(): BaseManager
    {
        return $this->manager;
    }

    public function index(Request $request)
    {
        $reviews = $this->manager->query()->paginate(15);

        return Inertia::render('admin/reviews/index',
            [
                "reviews" => $this->manager->toResourceCollection($reviews)
            ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/reviews/create');
    }

    public function edit(Review $review): Response
    {
        return Inertia::render('admin/reviews/edit', [
            "review" => $this->manager->toResource($review),
        ]);
    }

    public function show(Review $review): Response
    {
        return Inertia::render('admin/reviews/show', $this->wrap($review));
    }

    /**
     * @throws Throwable
     */
    public function store(StoreReviewRequest $request): RedirectResponse
    {
        $review = $this->cStore($request);
        return redirect()->route('admin.reviews.index');
    }

    /**
     * @throws Throwable
     */
    public function update(UpdateReviewRequest $request, Review $review): RedirectResponse
    {
        $review = $this->cUpdate($request, $review);
        return redirect()->route('admin.reviews.index');
    }

    /**
     * @throws Throwable
     */
    public function destroy(Review $review): RedirectResponse
    {
        $this->cDestroy($review);
        return redirect()->route('admin.reviews.index');
    }
}
