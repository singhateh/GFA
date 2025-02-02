<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BloodGroup;

class BloodGroupSeeder extends Seeder
{
    public function run()
    {
        BloodGroup::insert([
            ['name' => 'A+'],
            ['name' => 'A-'],
            ['name' => 'B+'],
            ['name' => 'B-'],
            ['name' => 'O+'],
            ['name' => 'O-'],
            ['name' => 'AB+'],
            ['name' => 'AB-'],
        ]);
    }
}