<?php

namespace App\Http\Requests\Shop;

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
            'name' => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string|max:2000',
            'image' => 'nullable|image|max:2048',
            'status' => 'required|in:active,inactive',

            // Variations validation
            'variations' => 'required|array|min:1',
            'variations.*.sku' => 'required|string|max:255|unique:product_variations,sku',
            'variations.*.name' => 'nullable|string|max:255',
            'variations.*.price' => 'required|numeric|min:0',
            'variations.*.quantity' => 'nullable|numeric|min:0',
            'variations.*.quantity_unit' => 'nullable|string|max:50',
            'variations.*.stock' => 'required|integer|min:0',
            'variations.*.is_active' => 'nullable|in:active,inactive',
            'variations.*.is_new_batch' => 'nullable|boolean',
            'variations.*.notes' => 'nullable|string|max:255',
        ];
    }


    public function messages(): array
    {
        return [
            'name.required' => 'Product name is required.',
            'name.string' => 'Product name must be a string.',
            'name.max' => 'Product name cannot be more than 255 characters.',

            'category_id.exists' => 'The selected category does not exist.',

            'description.max' => 'Description cannot exceed 2000 characters.',

            'image.image' => 'Image must be a valid image file.',
            'image.max' => 'Image cannot be larger than 2MB.',

            'status.required' => 'Status is required.',
            'status.in' => 'Status must be either active or inactive.',

            'variations.required' => 'At least one variation is required.',
            'variations.array' => 'Variations must be an array.',
            'variations.min' => 'At least one variation is required.',

            'variations.*.sku.required' => 'Each variation must have an SKU.',
            'variations.*.sku.string' => 'Variation SKU must be a string.',
            'variations.*.sku.max' => 'Variation SKU cannot be more than 255 characters.',
            'variations.*.sku.unique' => 'The variation SKU :input is already taken.',

            'variations.*.name.string' => 'Variation name must be a string.',
            'variations.*.name.max' => 'Variation name cannot be more than 255 characters.',

            'variations.*.price.required' => 'Each variation must have a price.',
            'variations.*.price.numeric' => 'Variation price must be a number.',
            'variations.*.price.min' => 'Variation price cannot be negative.',

            'variations.*.quantity.numeric' => 'Variation quantity must be a number.',
            'variations.*.quantity.min' => 'Variation quantity cannot be negative.',

            'variations.*.quantity_unit.string' => 'Quantity unit must be a string.',
            'variations.*.quantity_unit.max' => 'Quantity unit cannot be more than 50 characters.',

            'variations.*.stock.required' => 'Each variation must have a stock value.',
            'variations.*.stock.integer' => 'Variation stock must be an integer.',
            'variations.*.stock.min' => 'Variation stock cannot be negative.',

            'variations.*.is_active.in' => 'Variation status must be active or inactive.',

            'variations.*.is_new_batch.boolean' => 'Is new batch must be true or false.',

            'variations.*.notes.string' => 'Notes must be a string.',
            'variations.*.notes.max' => 'Notes cannot be more than 255 characters.',
        ];
    }


}
