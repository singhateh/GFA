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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('asset_type_id')->constrained()->onDelete('cascade');
            $table->string('serial_no')->unique();
            $table->enum('status', ['Available', 'Assigned', 'Maintenance', 'Retired'])->default('Available');
            $table->enum('condition', ['New', 'Good', 'Damaged', 'Inoperable', 'Fair'])->default('New');
            $table->integer('quantity_in_stock')->default(0);
            $table->integer('quantity_in_use')->default(0);
            $table->date('date_procured')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};