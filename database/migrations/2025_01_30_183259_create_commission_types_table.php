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
        Schema::create('commission_types', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key (CommissionType_ID)
            $table->string('name', 100); // Commission type name column
            $table->timestamps(); // Timestamps (created_at, updated_at)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commission_types');
    }
};