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

    public function list(): ResourceCollection
    {
        $items = $this->model()::with($this->relations())->get();
        $collection = $this->resource::collection($items);
        $collection->each->withAdmin($this->isAdmin);
        return $collection;
    }

    public function paginate(int $perPage = 20): ResourceCollection
    {
        $paginator = $this->model()::with($this->relations())->paginate($perPage);
        $collection = $this->resource::collection($paginator);
        $collection->each->withAdmin($this->isAdmin);
        return $collection;
    }

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
}
