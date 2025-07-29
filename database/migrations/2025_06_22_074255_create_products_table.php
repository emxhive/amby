<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->decimal('price', 10)->default(0);
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('status')->default('active');
            $table->decimal('weight')->nullable();
            $table->timestamps();

            $table->index("category_id");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
