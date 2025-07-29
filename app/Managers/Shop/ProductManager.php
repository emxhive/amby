<?php

namespace App\Managers\Shop;

use App\DTOs\ProductDTO;
use App\DTOs\ProductVariationDTO;
use App\Managers\BaseManager;
use App\Models\Product;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductManager extends BaseManager
{

    public array $filterable = ["tags", "categories", "price"];
    protected ProductVariationManager $productVariationManager;

    public function __construct(bool $isAdmin = false)
    {
        parent::__construct($isAdmin);
        $this->productVariationManager = new ProductVariationManager();
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
        // If category_id is not provided, use the default category
        if (!isset($data['category_id'])) {
            $data['category_id'] = 1;
        }

        $productDTO = ProductDTO::fromArray($data);
        $variationDTOs = ProductVariationDTO::fromProductArray($data);

        // Upload images if any
        $data = $this->imageService()->upload($data);

        // Store the product
        $product = parent::store($data, ['variations.activeBatch']);

        // Store variations using ProductVariationManager
        foreach ($variationDTOs as $variationDTO) {
            // Set the product_id to the newly created product
            $variationDTO->product_id = $product->id;

            // Store the variation using the manager
            $this->productVariationManager->storeFromDTO($variationDTO);
        }

        // Refresh the product with relations
        return $this->find($product->id)->load(['variations.activeBatch']);
    }
}
