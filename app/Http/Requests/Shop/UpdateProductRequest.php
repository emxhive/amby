<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules() : array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'category_id' => 'sometimes|exists:categories,id',
            'description' => 'nullable|string|max:2000',
            'image' => 'nullable|image|max:2048',
            'status' => 'sometimes|in:active,inactive',

            // Variations validation
            'variations' => 'sometimes|array|min:1',
            'variations.*.sku' => 'sometimes|string|max:255',
            'variations.*.name' => 'nullable|string|max:255',
            'variations.*.price' => 'sometimes|numeric|min:0',
            'variations.*.weight' => 'nullable|numeric|min:0',
            'variations.*.quantity' => 'nullable|numeric|min:0',
            'variations.*.quantity_unit' => 'nullable|string|max:50',
            'variations.*.stock' => 'sometimes|integer|min:0',
            'variations.*.status' => 'nullable|in:active,inactive',
        ];
    }

}
