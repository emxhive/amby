<?php

namespace App\Http\Controllers;

use App\Managers\BaseManager;
use Exception;
use Illuminate\Http\Request;
use Log;
use Throwable;

abstract class CrudController extends Controller
{
    abstract protected function manager(): BaseManager;


    public function index(Request $request)
    {
        return $this->manager()->list();
    }

    /**
     * @throws Exception|Throwable
     */
    final public function cStore($request, $relations = null)
    {
        try {
            return $this->manager()->store($request->validated(), $relations);
        } catch (Exception $e) {
            Log::error('Error creating model: ' . $e->getMessage(), [
                'request' => $request->validated(),
                'exception' => $e
            ]);
            throw $e;
        }
    }

    /**
     * @throws Exception|Throwable
     */
    final public function cUpdate($request, $model)
    {
        try {

            if ($request->isMethod('PATCH')) {
                $validated = $request->validated();
                abort_if(count($validated) > 2, 400, "Woah!! You're doing too much");
                return $this->manager()->patch($model, $validated);
            }
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
     * @throws Exception|Throwable
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

    protected function wrap($resource): array
    {
        return [
            $this->manager()->modelName => $this->manager()->toResource($resource)
        ];
    }

    protected function wrapList($resources, $key): array
    {
        return [
            $key => $this->manager()->toResourceCollection($resources)
        ];
    }
}
