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
        Schema::create('mission_sponsors', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->text('contact_info')->nullable();
            $table->text('remarks')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mission_sponsors');
    }
};