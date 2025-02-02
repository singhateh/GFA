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
        Schema::create('trainings', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Training name
            $table->foreignId('training_type_id')->constrained('training_types')->onDelete('cascade'); // Training type
            $table->integer('duration')->comment('Duration in days'); // Training duration
            $table->foreignId('country_id')->constrained('countries')->onDelete('cascade'); // Country as a relationship
            $table->date('start_date'); // Start date
            $table->date('end_date'); // End date
            $table->string('certification')->nullable()->comment('Certification awarded'); // Certification
            $table->text('remarks')->nullable(); // Additional remarks
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainings');
    }
};