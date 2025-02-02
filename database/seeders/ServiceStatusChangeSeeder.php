<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServiceStatusChange;
use App\Models\StaffMember;
use Faker\Factory as Faker;

class ServiceStatusChangeSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();  // Initialize Faker to generate fake data

        // Retrieve staff members from the database
        $staffMembers = StaffMember::all();

        if ($staffMembers->isEmpty()) {
            // If no staff members are found, handle accordingly
            echo "No staff members found in the database.\n";
            return;
        }

        $statusChanges = [];

        // Generate 20 status changes
        for ($i = 1; $i <= 20; $i++) {
            $statusChanges[] = [
                'staff_member_id' => $staffMembers->random()->id,  // Randomly select a staff member
                'status_description' => $faker->randomElement(['Active Duty', 'Retired', 'Suspended', 'On Leave', 'Deceased']),
                'status_change_date' => $faker->date('Y-m-d', '2023-01-01'),
                'remarks' => $faker->sentence(),  // Generate a random remark for the status change
            ];
        }

        // Insert 20 status changes in batch
        ServiceStatusChange::insert($statusChanges);
    }
}