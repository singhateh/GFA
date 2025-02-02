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
        Schema::create('training_performance_trackings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('training_staff_association_id')->constrained('training_staff_associations')->onDelete('cascade');
            $table->integer('progress_percentage')->default(0);
            $table->string('status')->default('Not Started');
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_performance_trackings');
    }
};