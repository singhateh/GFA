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
        Schema::create('medical_checkups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('staff_member_id')->constrained()->onDelete('cascade'); // Staff ID
            $table->foreignId('doctor_id')->constrained('users')->onDelete('cascade'); // Doctor who performed the checkup
            $table->date('checkup_date'); // Date of the checkup
            $table->dateTime('schedule_date')->nullable(); // Date of the checkup scheduled 
            $table->string('result'); // Result of the medical checkup
            $table->text('notes')->nullable(); // Additional notes
            $table->boolean('follow_up_required')->default(false); // Whether follow-up is needed
            $table->boolean('is_medical_cleared')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_checkups');
    }
};