<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        // TODO: Policies
        return true;
    }

    public function rules(): array
    {
        return [
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'exists:products,id'],
            'items.*.variation_id' => ['nullable', 'exists:product_variations,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'address_id' => ['required', 'exists:addresses,id'],
            'note' => ['nullable', 'string', 'max:1000'],

            // TODO: PAYMENT
            // 'payment_method' => ['required', 'in:card,cash_on_delivery,bank_transfer'],
        ];
    }

    public function messages(): array
    {
        return [

        ];
    }
}
