<?php

namespace App\Managers\Shop;

use App\DTOs\ProductDTO;
use App\DTOs\ProductVariationDTO;
use App\Managers\BaseManager;
use App\Models\Product;
use DB;
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
            // 1. Use your imageService to upload (before DB transaction)
            $data = $this->imageService()->upload($data);

            // Save the path for cleanup if needed
            $uploadedPath = $data['image'] ?? null;

            // 2. Transaction: create product, variations, batches
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

            // 3. Return as a resource
            return $this->toResource($product);

        } catch (Throwable $e) {

            if (!empty($uploadedPath)) {
                Storage::delete($uploadedPath);
            }
            throw $e;
        }
    }


}
