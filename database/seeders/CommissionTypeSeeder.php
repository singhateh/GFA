<?php

namespace Database\Seeders;

use App\Models\CommissionType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommissionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CommissionType::insert([
            ['name' => 'Regular'],
            ['name' => 'Reserve'],
            ['name' => 'Contract'],
        ]);
    }
}