<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRecipeRequest extends FormRequest
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
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'ingredients' => 'sometimes|array',
            'ingredients.*.name' => 'required_with:ingredients|string|max:255',
            'ingredients.*.quantity' => 'required_with:ingredients|string|max:50',
            'instructions' => 'sometimes|string',
            'image' => 'nullable|string',
            'status' => 'sometimes|string|in:draft,published',
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
            'title.string' => 'Title must be text.',
            'title.max' => 'Title cannot exceed 255 characters.',
            'description.string' => 'Description must be text.',
            'ingredients.array' => 'Ingredients must be a list.',
            'ingredients.*.name.required_with' => 'Ingredient name is required.',
            'ingredients.*.quantity.required_with' => 'Ingredient quantity is required.',
            'instructions.string' => 'Instructions must be text.',
            'status.in' => 'Status must be either draft or published.',
        ];
    }
}
