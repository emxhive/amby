<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class BaseResource extends JsonResource
{
    protected bool $isAdmin = false;


    protected function relationsMap(): array
    {
        return $this->resource->getRelationsMap();
    }

    protected function filtered(): array
    {
        $attributes = $this->resource->attributesToArray();
        if ($this->isAdmin) {
            $fields = array_diff(array_keys($attributes), $this->resource->getBlackList());
        } else {
            $fields = $this->resource->getWhiteList();
        }
        return Arr::only($attributes, $fields);
    }

    protected function serializeRelations($request): array
    {
        $data = [];
        foreach ($this->relationsMap() as $relation => $config) {
            if (!$relation) continue;

            if (isset($config['show_if']) && !$config['show_if']($this->resource, $request, $this->isAdmin)) {
                continue;
            }
            if ($this->resource->relationLoaded($relation)) {
                $related = $this->whenLoaded($relation);

                $resourceClass = $config['resource'] ?? BaseResource::class;

                if ($related instanceof Collection || is_array($related)) {
                    $data[$relation] = $resourceClass::collection($related)
                        ->each(function ($resource) {
                            $resource->withAdmin($this->isAdmin);
                        });
//                        ->toArray($request);
                } elseif ($related) {
                    $data[$relation] = (new $resourceClass($related))->withAdmin($this->isAdmin);
                } else {
                    $data[$relation] = null;
                }
            }
        }
        return $data;
    }

    public function toArray($request): array
    {
        return array_merge(
            $this->filtered(), $this->serializeRelations($request)
        );
    }

    public function withAdmin(bool $isAdmin): static
    {
        $this->isAdmin = $isAdmin;
        return $this;
    }
}
