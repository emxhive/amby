<?php

namespace App\Http\Controllers;


use App\Managers\BaseManager;
use Exception;
use Illuminate\Http\Request;
use Log;

abstract class CrudController extends Controller
{
    abstract protected function manager() : BaseManager;


    public function index(Request $request)
    {
        return $this->manager()->list();
    }

    /**
     * @throws Exception
     */
    final public function cStore($request)
    {
        try {
            return $this->manager()->create($request->validated());
        } catch (Exception $e) {
            Log::error('Error creating model: ' . $e->getMessage(), [
                'request' => $request->validated(),
                'exception' => $e
            ]);
            throw $e;
        }
    }

    /**
     * @throws Exception
     */
    final public function cUpdate($request, $model)
    {
        try {
            return $this->manager()->update($model, $request->validated());
        } catch (Exception $e) {
            Log::error('Error updating model: ' . $e->getMessage(), [
                'model' => $model->id,
                'request' => $request->validated(),
                'exception' => $e
            ]);
            throw $e;
        }
    }

    /**
     * @throws Exception
     */
    final public function cDestroy($model)
    {
        try {
            return $this->manager()->delete($model);
        } catch (Exception $e) {
            Log::error('Error deleting model: ' . $e->getMessage(), [
                'model' => $model->id,
                'exception' => $e
            ]);
            throw $e;
        }
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
