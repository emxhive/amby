<?php

namespace App\Constants;

class FormRequestMessages
{
    public static array $productForm = [
        'name.required' => 'Name required.',
        'name.unique' => 'Name ":input" taken.',
        'name.string' => 'Name must be text.',
        'name.max' => 'Max 255 chars.',

        'category_id.exists' => 'Invalid category.',

        'description.max' => 'Max 2000 chars.',

        'image.image' => 'Invalid image.',
        'image.max' => 'Image too large.',

        'status.required' => 'Status required.',
        'status.in' => 'Status invalid.',

        'variations.required' => 'Add at least one variation.',
        'variations.array' => 'Variations must be a list.',
        'variations.min' => 'Add at least one variation.',

        'variations.*.sku.required' => 'SKU required.',
        'variations.*.sku.string' => 'SKU must be text.',
        'variations.*.sku.max' => 'Max 255 chars.',
        'variations.*.sku.unique' => 'SKU taken.',

        'variations.*.name.string' => 'Name must be text.',
        'variations.*.name.max' => 'Max 255 chars.',

        'variations.*.price.required' => 'Price required.',
        'variations.*.price.numeric' => 'Price must be a number.',
        'variations.*.price.min' => 'Price too low.',

        'variations.*.quantity.numeric' => 'Quantity must be a number.',
        'variations.*.quantity.min' => 'Quantity too low.',

        'variations.*.quantity_unit.string' => 'Unit must be text.',
        'variations.*.quantity_unit.max' => 'Max 50 chars.',

        'variations.*.stock.required' => 'Stock required.',
        'variations.*.stock.integer' => 'Stock must be an integer.',
        'variations.*.stock.min' => 'Stock too low.',

        'variations.*.is_active.in' => 'Invalid status.',

        'variations.*.is_new_batch.boolean' => 'Must be true/false.',

        'variations.*.notes.string' => 'Notes must be text.',
        'variations.*.notes.max' => 'Max 255 chars.',
    ];

}
