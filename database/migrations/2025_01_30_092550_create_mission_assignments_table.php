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
        Schema::create('mission_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('staff_member_id')->constrained()->onDelete('cascade');  // Staff ID
            $table->foreignId('mission_id')->constrained('missions')->onDelete('cascade');
            $table->string('role', 50);
            $table->date('assignment_start_date');
            $table->date('assignment_end_date')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mission_assignments');
    }
};