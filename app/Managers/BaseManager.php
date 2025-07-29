<?php

namespace App\Managers;

use App\Http\Resources\BaseResource;
use Cache;
use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Throwable;

abstract class BaseManager
{
    protected bool $isAdmin;

    public function __construct(bool $isAdmin = false)
    {
        $this->isAdmin = $isAdmin;
    }

    abstract protected function model();

    protected string $resource = BaseResource::class;

    protected function relations(): array
    {
        return array_keys((new ($this->model()))->getRelationsMap());
    }

    public array $filterable = [];


    public function find($id): ?JsonResource
    {
        // Use cache to store frequently accessed models
        $cacheKey = $this->model() . ':' . $id;

        return Cache::remember($cacheKey, now()->addMinutes(30), function () use ($id) {
            $model = $this->model()::with($this->relations())->find($id);
            return $model ? $this->toResource($model) : null;
        });
    }

    /**
     * @throws Throwable
     */
    public function create(array $data): JsonResource
    {
        // Use transaction to ensure data consistency
        return DB::transaction(function () use ($data) {
            $model = $this->model()::create($data);
            return $this->toResource($model);
        });
    }

    /**
     * @throws Throwable
     */
    public function update(Model $model, array $data): JsonResource
    {
        // Use transaction to ensure data consistency
        $result = DB::transaction(function () use ($model, $data) {
            $model->fill($data)->save();
            return $this->toResource($model);
        });

        // Invalidate cache for this model
        $this->forgetModelCache($model->id);

        return $result;
    }

    /**
     * @throws Throwable
     */
    public function delete(Model $model): bool
    {
        // Use transaction to ensure data consistency
        $result = DB::transaction(function () use ($model) {
            return $model->delete();
        });

        // Invalidate cache for this model
        $this->forgetModelCache($model->id);

        return $result;
    }

    /**
     * Forget the cached model
     */
    protected function forgetModelCache($id): void
    {
        $cacheKey = $this->model() . ':' . $id;
        Cache::forget($cacheKey);
    }

    public function query(array $relations = null)
    {
        $query = $this->model()::query();

        if ($relations !== null) {
            $query->with($relations);
        } else {
            $query->with($this->relations());
        }

        return $query;
    }

    public function toResource(Model $model): JsonResource
    {
        $resourceClass = $this->resource;
        return (new $resourceClass($model))->withAdmin($this->isAdmin);
    }

    public function toResourceCollection($resource): ResourceCollection
    {
        $collection = $this->resource::collection($resource);
        $collection->each(function ($resource) {
            $resource->withAdmin($this->isAdmin);
        });

        return $collection;
    }

    public function filter(array $filters = [])
    {
        $query = $this->query();

        if (empty($this->filterable)) {
            return $query;
        }

        foreach ($filters as $field => $value) {
            if (!in_array($field, $this->filterable, true) || $value === null || $value === '') {
                continue;
            }

            if ($field === 'created_at' && is_array($value) && isset($value['from'], $value['to'])) {
                $query->whereBetween('created_at', [$value['from'], $value['to']]);
            } else {
                $query->where($field, $value);
            }
        }

        return $query;
    }


    public function list(array $filters = [], int $perPage = 15): ResourceCollection
    {
        $hasFilters = !empty($this->filterable)
            && collect($filters)->keys()->intersect($this->filterable)->isNotEmpty();

        $query = $hasFilters
            ? $this->filter($filters)
            : $this->query();

        $items = $query->paginate($perPage);
        return $this->toResourceCollection($items);
    }


}
