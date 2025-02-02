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
        Schema::create('staff_members', function (Blueprint $table) {
            $table->id();
            $table->string('army_number', 50)->unique();
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->date('date_of_birth');
            $table->date('date_of_enlistment');
            $table->string('position', 100)->nullable();
            $table->string('place_of_birth', 100)->nullable();
            $table->foreignId('rank_id')->constrained('ranks')->cascadeOnDelete();
            $table->foreignId('blood_group_id')->constrained('blood_groups')->cascadeOnDelete();
            $table->foreignId('department_id')->constrained('departments')->cascadeOnDelete();
            $table->foreignId('unit_id')->constrained('units')->cascadeOnDelete();
            $table->string('commission_type', 50)->nullable();
            $table->string('contact_number', 20);
            $table->string('intake_name', 50)->nullable();
            $table->string('email_address', 50)->unique()->nullable();
            $table->enum('gender', ['Male', 'Female', 'Other']);
            $table->foreignId('religion_id')->constrained('religions')->cascadeOnDelete();
            $table->enum('status', ['Active', 'Retired', 'Deceased']);
            $table->softDeletes();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_members');
    }
};