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
        Schema::create('ranks', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key (Rank_ID)
            $table->string('rank_name', 100); // Rank name column with a maximum length of 100 characters
            $table->string('rank_level', 50); // String column for rank level (no enum)
            $table->timestamps(); // Automatically manages created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ranks'); // Drop the ranks table if it exists
    }
};