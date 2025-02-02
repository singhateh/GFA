<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssetTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('asset_types')->insert([
            [
                'name' => 'Weaponry',
                'description' => 'Includes all types of weapons, from small arms to large artillery.',
            ],
            [
                'name' => 'Vehicles',
                'description' => 'Ground-based vehicles used by military forces such as tanks, jeeps, and armored personnel carriers.',
            ],
            [
                'name' => 'Aircraft',
                'description' => 'Aircraft used by military forces, including fighter jets, bombers, and helicopters.',
            ],
            [
                'name' => 'Ammunition',
                'description' => 'Various types of ammunition used in military operations, from bullets to rocket-propelled grenades.',
            ],
            [
                'name' => 'Radars',
                'description' => 'Military radar systems used for detection, surveillance, and tracking.',
            ],
            [
                'name' => 'Naval Assets',
                'description' => 'Assets related to naval military forces such as ships, submarines, and naval aircraft.',
            ],
            [
                'name' => 'Surveillance Equipment',
                'description' => 'Military equipment used for surveillance and reconnaissance, including drones and night-vision systems.',
            ],
            [
                'name' => 'Communication Systems',
                'description' => 'Military communication systems used for secure and tactical communications.',
            ],
            [
                'name' => 'Explosives',
                'description' => 'Various types of explosives used in military operations, including grenades, landmines, and demolition charges.',
            ],
            [
                'name' => 'Personal Gear',
                'description' => 'Includes items such as helmets, body armor, uniforms, and other personal military equipment.',
            ],
        ]);
    }
}