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
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:2000',
            'image' => 'nullable|image|max:2048',
            'weight' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'status' => 'required|in:active,inactive',
        ];
    }

}
