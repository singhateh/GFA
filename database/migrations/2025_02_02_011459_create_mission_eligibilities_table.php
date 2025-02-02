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
        Schema::create('mission_eligibilities', function (Blueprint $table) {
            $table->id();
            $table->text('description')->nullable();
            $table->integer('min_length_of_service')->nullable()->default(5);
            $table->integer('min_gap_since_last_deployment')->nullable()->default(4);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mission_eligibilities');
    }
};