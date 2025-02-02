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
        Schema::create('training_courses', function (Blueprint $table) {
            $table->id();
            $table->string('name');  // Course name
            $table->enum('type', ['Civilian', 'Military'])->default('Military');  // Course type (Civilian or Military)
            $table->enum('status', ['Active', 'Inactive'])->default('Active');  // Course type (Active or Inactive)
            $table->text('description')->nullable();  // Course description
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_courses');
    }
};