<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MissionSponsorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('mission_sponsors')->insert([
            [
                'name' => 'United Nations',
                'contact_info' => 'info@un.org',
                'remarks' => 'Global peacekeeping'
            ],
            [
                'name' => 'African Union',
                'contact_info' => 'contact@au.int',
                'remarks' => 'Regional peacekeeping'
            ],
            [
                'name' => 'European Union',
                'contact_info' => 'info@eu.int',
                'remarks' => 'International cooperation and development'
            ],
            [
                'name' => 'NATO',
                'contact_info' => 'info@nato.int',
                'remarks' => 'Defense and security missions'
            ],
            [
                'name' => 'World Health Organization',
                'contact_info' => 'contact@who.int',
                'remarks' => 'Health-related missions'
            ],
            [
                'name' => 'World Food Programme',
                'contact_info' => 'contact@wfp.org',
                'remarks' => 'Humanitarian and food assistance'
            ],
            [
                'name' => 'Red Cross',
                'contact_info' => 'info@redcross.org',
                'remarks' => 'Emergency relief and humanitarian support'
            ],
            [
                'name' => 'USAID',
                'contact_info' => 'info@usaid.gov',
                'remarks' => 'Foreign assistance and development'
            ],
            [
                'name' => 'Peace Corps',
                'contact_info' => 'info@peacecorps.gov',
                'remarks' => 'Volunteers for peace and development'
            ],
        ]);
    }
}