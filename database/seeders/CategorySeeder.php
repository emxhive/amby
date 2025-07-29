<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a "General" category as the default
        Category::create([
            'name' => 'General',
            'slug' => Str::slug('General'),
            'description' => 'Default category for products',
            'is_default' => true
        ]);
    }
}
