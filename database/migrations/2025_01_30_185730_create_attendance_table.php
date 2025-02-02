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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('staff_member_id')->constrained('staff_members')->onDelete('cascade'); // Staff Member ID, foreign key to staff_members table
            $table->date('date');
            $table->time('check_in');
            $table->time('check_out')->nullable(); // Check-out time is optional
            $table->timestamps(); // created_at and updated_at fields
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance');
    }
};