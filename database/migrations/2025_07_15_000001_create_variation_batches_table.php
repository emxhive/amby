<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('variation_batches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_variation_id')->constrained('product_variations')->cascadeOnDelete();
            $table->boolean("is_open")->default(true);
            $table->unsignedInteger('stock')->default(0);
            $table->unsignedInteger('sold')->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->timestamp('closed_at')->nullable();

            $table->index('product_variation_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('variation_batches');
    }
};
