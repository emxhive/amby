<?php

namespace App\Managers;

use App\Http\Resources\BaseResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

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
        $model = $this->model()::with($this->relations())->find($id);
        return $model ? $this->toResource($model) : null;
    }

    public function create(array $data): JsonResource
    {
        $model = $this->model()::create($data);
        return $this->toResource($model);
    }

    public function update(Model $model, array $data): JsonResource
    {
        $model->fill($data)->save();
        return $this->toResource($model);
    }

    public function delete(Model $model): bool
    {
        return $model->delete();
    }

    public function query()
    {
        return $this->model()::with($this->relations());
    }

    public function toResource(Model $model): JsonResource
    {
        $resourceClass = $this->resource;
        return (new $resourceClass($model))->withAdmin($this->isAdmin);
    }

    public function toResourceCollection($resource): ResourceCollection
    {
        $collection = $this->resource::collection($resource);
        $collection->each->withAdmin($this->isAdmin);
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


    public function list(array $filters = []): ResourceCollection
    {
        $hasFilters = !empty($this->filterable)
            && collect($filters)->keys()->intersect($this->filterable)->isNotEmpty();

        $query = $hasFilters
            ? $this->filter($filters)
            : $this->query();

        $items = $query->get();
        return $this->toResourceCollection($items);
    }


}
