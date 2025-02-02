<?php

namespace Database\Seeders;

use App\Models\MissionSponsor;
use App\Models\MissionType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all mission types and sponsors
        $missionTypes = MissionType::pluck('id')->toArray();
        $missionSponsors = MissionSponsor::pluck('id')->toArray();

        // Define random missions to insert
        $missions = [
            [
                'name' => 'UN Peacekeeping Operation',
                'start_date' => '2023-01-01',
                'end_date' => null,
                'country' => 'Sudan',
                'status' => 'Active',
            ],
            [
                'name' => 'African Union Stabilization Force',
                'start_date' => '2022-08-15',
                'end_date' => '2023-08-15',
                'country' => 'South Sudan',
                'status' => 'Completed',
            ],
            [
                'name' => 'World Health Organization Emergency Relief',
                'start_date' => '2023-03-01',
                'end_date' => null,
                'country' => 'Syria',
                'status' => 'Active',
            ],
            [
                'name' => 'NATO Defense and Security Mission',
                'start_date' => '2023-05-10',
                'end_date' => '2024-05-10',
                'country' => 'Ukraine',
                'status' => 'Active',
            ],
            [
                'name' => 'World Food Programme Disaster Relief',
                'start_date' => '2023-02-20',
                'end_date' => '2023-08-20',
                'country' => 'Yemen',
                'status' => 'Completed',
            ],
        ];

        // Loop through each mission and assign random mission_type_id and mission_sponsor_id
        foreach ($missions as &$mission) {
            $mission['mission_type_id'] = $missionTypes[array_rand($missionTypes)];
            $mission['mission_sponsor_id'] = $missionSponsors[array_rand($missionSponsors)];
        }

        // Insert the missions into the database
        DB::table('missions')->insert($missions);
    }
}