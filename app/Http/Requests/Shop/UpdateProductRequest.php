<?php

namespace App\Http\Requests\Shop;

use App\Constants\FormRequestMessages;
use App\Models\ProductVariation;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {

        if ($this->method() === 'PATCH') {
            return [
                'name' => 'sometimes|string|max:255',
                'category_id' => 'sometimes|exists:categories,id',
                'description' => 'sometimes|string|max:2000',
                'image' => 'sometimes|max:2048',
                'status' => 'sometimes|in:active,inactive',
            ];
        }
        return [
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string|max:2000',
            'image' => 'nullable|string|max:2048',
            'status' => 'required|in:active,inactive',


            'variations' => 'required|array|min:1',
            'variations.*.id' => 'sometimes|integer|exists:product_variations,id', // Only present when editing existing variation
            'variations.*.sku' => [
                'required',
                'string',
                'max:255', function ($attribute, $value, $fail) {
                    // Get the index from the attribute (e.g. "variations.2.sku")
                    $parts = explode('.', $attribute);
                    $index = $parts[1] ?? null;

                    $variation = $this->input('variations')[$index] ?? [];
                    $variationId = $variation['id'] ?? null;

                    $query = ProductVariation::where('sku', $value);
                    if ($variationId) {
                        $query->where('id', '!=', $variationId);
                    }

                    if ($query->exists()) {
                        $fail('The SKU has already been taken.');
                    }
                }
            ],
            'variations.*.name' => 'nullable|string|max:255',
            'variations.*.price' => 'required|numeric|min:0',
            'variations.*.quantity' => 'nullable|numeric|min:0',
            'variations.*.quantity_unit' => 'nullable|string|max:50',
            'variations.*.is_new_batch' => 'nullable|boolean',
            'variations.*.stock' => 'required|integer|min:0',
            'variations.*.notes' => 'nullable|string|max:225',
        ];
    }


    public function messages(): array
    {
        return FormRequestMessages::$productForm;
    }

}
