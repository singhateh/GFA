<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MissionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('mission_types')->insert([
            [
                'name' => 'Individual',
                'description' => 'Single personnel deployment'
            ],
            [
                'name' => 'Contingent',
                'description' => 'Group deployment'
            ],
            [
                'name' => 'Specialized',
                'description' => 'Deployment requiring specific expertise or training'
            ],
            [
                'name' => 'Joint',
                'description' => 'Collaboration between multiple organizations or units'
            ],
            [
                'name' => 'Peacekeeping',
                'description' => 'Deployment for maintaining peace in conflict zones'
            ],
            [
                'name' => 'Humanitarian',
                'description' => 'Deployment for providing humanitarian assistance'
            ],
            [
                'name' => 'Logistics',
                'description' => 'Deployment for supply and logistics operations'
            ],
        ]);
    }
}