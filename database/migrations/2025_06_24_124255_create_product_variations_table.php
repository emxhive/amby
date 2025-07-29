<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('product_variations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->string('sku')->unique();
            $table->string('name')->default('Default');
            $table->decimal('price', 10);
            $table->decimal('weight', 8, 3)->nullable();
            $table->string('status')->default('active');
            $table->json('attributes')->nullable(); // e.g., {"volume":"250ml","flavor":"vanilla"}
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_variations');
    }
};
