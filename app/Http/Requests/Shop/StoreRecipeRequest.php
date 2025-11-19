<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class StoreRecipeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'ingredients' => 'required|array',
            'ingredients.*.name' => 'required|string|max:255',
            'ingredients.*.quantity' => 'required|string|max:50',
            'instructions' => 'required|string',
            'image' => 'nullable|string',
            'status' => 'required|string|in:draft,published',
            'prep_time' => 'nullable|integer|min:1',
            'cook_time' => 'nullable|integer|min:1',
            'servings' => 'nullable|integer|min:1',
            'product_id' => 'nullable|exists:products,id',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Title is required.',
            'description.required' => 'Description is required.',
            'ingredients.required' => 'Ingredients are required.',
            'ingredients.*.name.required' => 'Ingredient name is required.',
            'ingredients.*.quantity.required' => 'Ingredient quantity is required.',
            'instructions.required' => 'Instructions are required.',
            'status.required' => 'Status is required.',
            'status.in' => 'Status must be either draft or published.',
        ];
    }
}
