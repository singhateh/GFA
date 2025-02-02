<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('payrolls', function (Blueprint $table) {
            $table->id();
            $table->foreignId('staff_member_id')->constrained('staff_members')->onDelete('cascade'); // Assuming staff are users
            $table->decimal('salary', 10, 2);
            $table->date('payment_date');
            $table->enum('status', ['pending', 'paid'])->default('pending');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payrolls');
    }
};