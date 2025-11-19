<?php

namespace App\Managers\Traits;

use App\Services\ImageService;
use Cache;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;


trait HasBaseManagerHelpers
{
    protected function authorizeAction(string $action, ?Model $model = null): void
    {
        if (!auth()->user()->can($action, $model ?? $this->model())) {
            throw new AuthorizationException("Not authorized.");
        }
    }

    public function imageService(): ImageService
    {
        if ($this->imageService === null) {
            $this->imageService = new ImageService($this->modelName);
        }
        return $this->imageService;
    }


    protected function modelName(): string
    {
        return strtolower(class_basename($this->model()));
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

    protected function forgetModelCache($id): void
    {
        $cacheKey = $this->generateCacheKey($id);
        Cache::forget($cacheKey);
    }

    protected function generateCacheKey(string $id): string
    {
        return $this->modelName . ':' . $id;
    }
}
