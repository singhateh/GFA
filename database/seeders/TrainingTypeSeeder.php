<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TrainingType;

class TrainingTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trainingTypes = [
            ['name' => 'Basic Military Training', 'description' => 'Initial training for new recruits, covering military discipline, fitness, and basic combat skills.'],
            ['name' => 'Advanced Combat Training', 'description' => 'Advanced training for specialized combat operations and tactics.'],
            ['name' => 'Peacekeeping Training', 'description' => 'Prepares soldiers for UN and AU peacekeeping missions.'],
            ['name' => 'Counter-Terrorism Training', 'description' => 'Training in counter-terrorism tactics and strategies.'],
            ['name' => 'Naval Warfare Training', 'description' => 'Specialized training for naval operations and maritime security.'],
            ['name' => 'Air Force Training', 'description' => 'Training for pilots and air force personnel on aerial combat and reconnaissance.'],
            ['name' => 'Engineering and Logistics Training', 'description' => 'Focuses on military engineering, construction, and logistics support.'],
            ['name' => 'Military Intelligence Training', 'description' => 'Covers intelligence gathering, analysis, and cyber warfare.'],
            ['name' => 'Explosive Ordnance Disposal (EOD) Training', 'description' => 'Training in handling and neutralizing explosive devices.'],
            ['name' => 'Medical and Field Emergency Training', 'description' => 'Military medical training for combat and emergency situations.'],
        ];

        TrainingType::insert($trainingTypes);
    }
}