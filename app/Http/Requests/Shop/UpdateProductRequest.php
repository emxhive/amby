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
            'price' => 'sometimes|numeric|min:0',
            'description' => 'nullable|string|max:2000',
            'image' => 'nullable|image|max:2048',
            'weight' => 'nullable|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'status' => 'sometimes|in:active,inactive',
        ];
    }

}
