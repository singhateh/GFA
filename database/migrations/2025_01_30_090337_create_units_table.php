<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('units', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key (Unit_ID)
            $table->string('unit_name', 100);
            $table->string('location', 100);
            $table->string('unit_type', 50);
            $table->text('unit_description')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('units');
    }
};