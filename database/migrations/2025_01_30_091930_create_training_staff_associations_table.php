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
        Schema::create('training_staff_associations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('staff_member_id')->constrained()->onDelete('cascade');  // Staff ID
            $table->foreignId('training_course_id')->constrained()->onDelete('cascade');  // Training Course ID
            $table->enum('status', ['Completed', 'Hold', 'OnGoing'])->default('OnGoing');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_staff_associations');
    }
};