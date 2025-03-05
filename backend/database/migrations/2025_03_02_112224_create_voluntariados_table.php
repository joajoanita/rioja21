<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('voluntariados', function (Blueprint $table) {
            $table->id();
            $table->string('city');
            $table->string('description');
            $table->timestamps();

        
            $table->foreignId('id_empresa')
            ->nullable()
            ->constrained('empresas')
            ->cascadeOnUpdate()
            ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voluntariados');
    }
};
