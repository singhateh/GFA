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
        Schema::create('missions', function (Blueprint $table) {
            $table->id();
            $table->string('name', 200);
            $table->foreignId('mission_type_id')->constrained()->onDelete('cascade');  // Mission Type
            $table->foreignId('mission_sponsor_id')->constrained('mission_sponsors')->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->string('country', 200);
            $table->string('status', 50);
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('missions');
    }
};