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
        Schema::create('voluntariados_usuarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_voluntariado')->references('id')->on('voluntariados')->onDelete('cascade');
            $table->foreignId('id_usuario')->references('id')->on('users')->onDelete('cascade');
            $table->string('fecha');
            $table->timestamps();

            $table->unique(['id_voluntariado', 'id_usuario']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voluntariados_usuarios');
    }
};
