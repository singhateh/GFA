<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StaffPosting;
use App\Models\StaffMember;
use App\Models\Unit; // Include the Unit model
use Faker\Factory as Faker;

class StaffPostingSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();  // Initialize Faker to generate fake data

        // Retrieve staff members and units from the database
        $staffMembers = StaffMember::all();
        $units = Unit::all();  // Fetch all units

        if ($staffMembers->isEmpty() || $units->isEmpty()) {
            // If no staff members or units are found, handle accordingly
            echo "No staff members or units found in the database.\n";
            return;
        }

        $postings = [];

        // Generate 20 postings
        for ($i = 1; $i <= 20; $i++) {
            $postings[] = [
                'staff_member_id' => $staffMembers->random()->id,  // Randomly select a staff member
                'posting_date' => $faker->date('Y-m-d', '2023-01-01'),
                'department_id' => $faker->numberBetween(1, 4),  // Random department ID
                'unit_id' => $units->random()->id,  // Randomly select a unit from the Unit table
                'appointment' => $faker->randomElement(['Commander', 'Lieutenant', 'Officer', 'Sergeant', 'Captain']),
            ];
        }

        // Insert 20 postings in batch
        StaffPosting::insert($postings);
    }
}