<?php

namespace App\Managers\Shop;

use App\DTOs\ProductDTO;
use App\DTOs\ProductVariationDTO;
use App\Managers\BaseManager;
use App\Models\Product;
use DB;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Storage;
use Throwable;

class ProductManager extends BaseManager
{

    public array $filterable = ["tags", "categories", "price"];


    public function __construct(bool $isAdmin = false)
    {
        parent::__construct($isAdmin);

    }

    protected function model(): string
    {
        return Product::class;
    }

    public function query(array $relations = null)
    {
        $query = parent::query($relations);
        if (!$this->isAdmin) {
            $query->where('status', 'active');
        }
        return $query;
    }

    public function store(array $data, array $relations = null): Model
    {
        try {

            $data = $this->imageService()->upload($data);

            return DB::transaction(function () use ($data, $relations) {
                $productDTO = ProductDTO::fromArray($data);
                $product = Product::create($productDTO->toArray());

                $variationDTOs = ProductVariationDTO::fromProductArray($data);
                $pvm = new ProductVariationManager();

                foreach ($variationDTOs as $variationDTO) {
                    $pvm->storeFromDTO($variationDTO, $product);
                }

                $product->load($this->relations($relations));

                return $product;
            });


        } catch (Throwable $e) {

            if (!empty($data['image'])) {
                Storage::delete($data['image']);
            }
            throw $e;
        }
    }


    /**
     * @param Product $model
     * @throws Throwable
     */
    public function update(Model $model, array $data): Model
    {
        try {
            $data = $this->imageService()->upload($data);

            return DB::transaction(function () use ($data, $model) {

                $productDTO = ProductDTO::fromArray($data);
                $model->update($productDTO->toArray());

                $variationDTOs = ProductVariationDTO::fromProductArray($data);
                $pvm = new ProductVariationManager();


                $variations = $model->variations->keyBy('id');
                $existingVarIds = $variations->keys()->all();

                $incomingVarIds = [];

                foreach ($variationDTOs as $variationDTO) {
                    if ($variationDTO->id) {
                        $variation = $variations->get($variationDTO->id);
                        if (!$variation) {
                            throw new Exception("Variation ID {$variationDTO->id} not found for update.");
                        }
                        $pvm->updateFromDTO($variationDTO, $variation);
                        $incomingVarIds[] = $variationDTO->id;
                    } else {
                        $variation = $pvm->storeFromDTO($variationDTO, $model);
                        $incomingVarIds[] = $variation->id;
                    }
                }

                // Only in-memory logic, only ONE initial DB fetch, delete with DB call if needed
                $toDelete = array_diff($existingVarIds, $incomingVarIds);
                if (!empty($toDelete)) {
                    $model->variations()->whereIn('id', $toDelete)->delete();
                }

                // Reload model variations for fresh resource output (optional)
                $model->load('variations');

                return $model;
            });


        } catch (Throwable $e) {
            if (!empty($data['image'])) {
                Storage::delete($data['image']);
            }
            throw $e;
        }
    }


}
