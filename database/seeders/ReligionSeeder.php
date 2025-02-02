<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Religion;

class ReligionSeeder extends Seeder
{
    public function run()
    {
        Religion::insert([
            ['name' => 'Christianity'],
            ['name' => 'Islam'],
            ['name' => 'Hinduism'],
            ['name' => 'Buddhism'],
        ]);
    }
}