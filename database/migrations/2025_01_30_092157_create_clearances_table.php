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
        Schema::create('clearances', function (Blueprint $table) {
            $table->id(); // Primary Key (id)
            $table->foreignId('staff_member_id')->constrained()->onDelete('cascade'); // Foreign Key
            $table->date('issued_at'); // Professional Naming
            $table->string('type', 50);
            $table->enum('status', ['Pending', 'Approved', 'Rejected'])->default('Pending');
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clearances');
    }
};