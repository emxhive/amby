<?php

namespace App\Managers;

use App\Http\Resources\BaseResource;
use App\Managers\Traits\HasBaseManagerHelpers;
use App\Services\ImageService;
use Cache;
use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Throwable;

abstract class BaseManager
{

    use HasBaseManagerHelpers;

    protected bool $isAdmin;
    public string $modelName;
    protected string $resource = BaseResource::class;

    protected ?ImageService $imageService = null;

    public function __construct(bool $isAdmin = false)
    {
        $this->isAdmin = $isAdmin;
        $this->modelName = $this->modelName();

    }

    /**
     * @return class-string<Model>
     */
    abstract protected function model(): string;


    public array $filterable = [];

    protected ?array $cachedRelations = null;

    final protected function relations(array $relations = null): array
    {
        if ($relations !== null) return $relations;
        if ($this->cachedRelations === null) {
            $this->cachedRelations = array_keys((new ($this->model()))->getRelationsMap());
        }
        return $this->cachedRelations;
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


    public function find($id, $relations = null): ?Model
    {
        $cacheKey = $this->generateCacheKey($id);

        return Cache::remember($cacheKey, now()->addMinutes(30), function () use ($relations, $id) {
            return $this->model()::with($this->relations($relations))->find($id);
        });
    }

    /**
     * @throws Throwable
     */
    public function store(array $data, array $relations = null): Model
    {

        $relations = $this->relations($relations);
        $model = DB::transaction(function () use ($data) {
            return $this->model()::create($data);
        });

        return $model->load($relations);

    }

    /**
     * @throws Throwable
     */
    public function doUpdate(Model $model, array $data)
    {
//        $this->authorizeAction("update", $model); TODO Add Policy Class
        $this->forgetModelCache($model->id);


        return DB::transaction(function () use ($model, $data) {
            $model->fill($data)->save();
            return $model->refresh()->load($this->relations([]));

        });

    }

    /**
     * @throws Throwable
     */
    public function update(Model $model, array $data): Model
    {
        return $this->doUpdate($model, $data);
    }

    /**
     * @throws Throwable
     */
    public function patch(Model $model, array $data): Model
    {
        return $this->doUpdate($model, $data);
    }

    /**
     * @throws Throwable
     */
    public function delete(Model $model): bool
    {
//        $this->authorizeAction("delete", $model); TODO Write policy class

        $this->forgetModelCache($model->id);

        return DB::transaction(function () use ($model) {
            return $model->delete();
        });


    }

    public function query(array $relations = null)
    {
        $query = $this->model()::query();
        return $query->with($this->relations($relations));
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


}
