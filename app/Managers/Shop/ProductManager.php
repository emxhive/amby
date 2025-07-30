<?php

namespace App\Managers\Shop;

use App\DTOs\ProductDTO;
use App\DTOs\ProductVariationDTO;
use App\Managers\BaseManager;
use App\Models\Product;
use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
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

    public function store(array $data, array $relations = null): JsonResource
    {
        try {

            $data = $this->imageService()->upload($data);

            $product = DB::transaction(function () use ($data, $relations) {
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


            return $this->toResource($product);

        } catch (Throwable $e) {

            if (!empty($data['image'])) {
                Storage::delete($data['image']);
            }
            throw $e;
        }
    }


    public function update(Product|Model $product, array $data): JsonResource
    {
        try {

            $data = $this->imageService()->upload($data);

            $product = DB::transaction(function () use ($data, $product) {

                $variations = $product->variations();
                $existingVarIds = $variations->pluck("id");
                $incomingVarIds = [];
                $productDTO = ProductDTO::fromArray($data);
                $product->update($productDTO->toArray());

                $variationDTOs = ProductVariationDTO::fromProductArray($data);
                $pvm = new ProductVariationManager();

                foreach ($variationDTOs as $variationDTO) {
                    if ($variationDTO->id) {
                        $pvm->updateFromDTO($variationDTO, $product);
                        $incomingVarIds[] = $variationDTO->id;
                    } else {
                        $variation = $pvm->storeFromDTO($variationDTO, $product);
                        $incomingVarIds[] = $variation->id;

                    }

                }
                $toDelete = array_diff($existingVarIds, $incomingVarIds);
                if (!empty($toDelete)) {
                    $variations->whereIn("id", $toDelete)->delete();
                }

                $product->load("variations");

                return $product;
            });


            return $this->toResource($product);

        } catch (Throwable $e) {

            if (!empty($data['image'])) {
                Storage::delete($data['image']);
            }
            throw $e;
        }
    }


}
