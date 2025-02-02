<?php

namespace Database\Seeders;

use App\Models\Mission;
use App\Models\MissionEligibility;
use Illuminate\Database\Seeder;

class MissionEligibilitySeeder extends Seeder
{
    public function run()
    {

        $eligibilities = [
            'description' => 'Eligibility based on years of service and gap since last mission.',
            'min_length_of_service' => 5,
            'min_gap_since_last_deployment' => 4,
        ];

        MissionEligibility::create($eligibilities);
        $this->command->info('Mission eligibility records seeded successfully.');
    }
}