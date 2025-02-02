<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Unit;

class UnitSeeder extends Seeder
{
    public function run()
    {
        // Truncate the table before seeding
        Unit::truncate();

        // Insert new records
        Unit::insert([
            ['unit_name' => '1st Infantry Battalion', 'location' => 'Yundum Barracks', 'unit_type' => 'Infantry', 'unit_description' => 'Ground combat troops.'],
            ['unit_name' => '2nd Infantry Battalion', 'location' => 'Farafenni Barracks', 'unit_type' => 'Infantry', 'unit_description' => 'Ground combat troops.'],
            ['unit_name' => '3rd Infantry Battalion', 'location' => 'Kudang Barracks', 'unit_type' => 'Infantry', 'unit_description' => 'Ground combat troops.'],
            ['unit_name' => 'Military Police', 'location' => 'Fajara Barracks', 'unit_type' => 'Military Police', 'unit_description' => 'Law enforcement and discipline.'],
            ['unit_name' => 'Engineering Unit', 'location' => 'Yundum Barracks', 'unit_type' => 'Engineering', 'unit_description' => 'Construction and logistical support.'],
            ['unit_name' => 'Logistics Unit', 'location' => 'Farafenni Barracks', 'unit_type' => 'Logistics', 'unit_description' => 'Supply and maintenance support.'],
        ]);
    }
}