<?php

namespace App\Http\Controllers;


use App\Managers\BaseManager;
use Illuminate\Http\Request;

abstract class CrudController extends Controller
{
    abstract protected function manager() : BaseManager;


    public function index(Request $request)
    {
        return $this->manager()->list();
    }

    final public function cStore($request)
    {
        return $this->manager()->create($request->validated());
    }

    final public function cUpdate($request, $model)
    {
        return $this->manager()->update($model, $request->validated());
    }

    final public function cDestroy($model)
    {
        return $this->manager()->delete($model);
    }

    protected function wrap($resource, $isList = false): array
    {
        return [
            "data" => $isList
                ? $this->manager()->toResourceCollection($resource)
                : $this->manager()->toResource($resource)
        ];
    }
}
