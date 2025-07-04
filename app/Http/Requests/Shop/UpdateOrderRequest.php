<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => 'sometimes|required|in:pending,paid,shipped,completed,canceled',
            'address_id' => 'sometimes|required|exists:addresses,id',
        ];
    }
}
