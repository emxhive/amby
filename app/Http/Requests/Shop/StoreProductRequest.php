<?php

namespace App\Http\Requests\Shop;

use App\Constants\FormRequestMessages;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        //TODO: Policies
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:products',
            'category_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string|max:2000',
            'image' => 'nullable|image|max:2048',
            'status' => 'required|in:active,inactive',

            'variations' => 'required|array|min:1',
            'variations.*.sku' => 'required|string|max:255|unique:product_variations,sku',
            'variations.*.name' => 'nullable|string|max:255',
            'variations.*.price' => 'required|numeric|min:0',
            'variations.*.quantity' => 'nullable|numeric|min:0',
            'variations.*.quantity_unit' => 'nullable|string|max:50',
            'variations.*.stock' => 'required|integer|min:0',
            'variations.*.is_active' => 'nullable|boolean',
            'variations.*.is_new_batch' => 'nullable|boolean',
            'variations.*.notes' => 'nullable|string|max:255',
        ];
    }


    public function messages(): array
    {
        return FormRequestMessages::$productForm;

    }


}
