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
        Schema::create('asset_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained()->onDelete('cascade');
            $table->morphs('assigned_to'); // Can be User or Unit
            $table->integer('quantity_assigned')->default(1);
            $table->date('assigned_date')->nullable();
            $table->date('return_date')->nullable();
            $table->enum('status', ['Assigned', 'Returned', 'Lost', 'Damaged'])->default('Assigned');
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_assignments');
    }
};