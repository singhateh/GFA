<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    public function run()
    {
        Department::insert([
            ['name' => 'Human Resources', 'code' => 'HR'],
            ['name' => 'Logistics', 'code' => 'LOG'],
            ['name' => 'Engineering', 'code' => 'ENG'],
            ['name' => 'Medical', 'code' => 'MED'],
        ]);
    }
}