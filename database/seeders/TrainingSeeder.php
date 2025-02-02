<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Training;
use App\Models\TrainingType;
use App\Models\Country;
use Carbon\Carbon;

class TrainingSeeder extends Seeder
{
    public function run()
    {
        $trainingTypes = TrainingType::all();
        $countries = Country::all();

        if ($trainingTypes->isEmpty() || $countries->isEmpty()) {
            $this->command->info('Please seed TrainingType and Country before running TrainingSeeder.');
            return;
        }

        $trainings = [
            [
                'name' => 'Advanced Combat Training',
                'training_type_id' => $trainingTypes->random()->id,
                'duration' => 90,
                'country_id' => $countries->random()->id,
                'start_date' => Carbon::now()->subMonths(3),
                'end_date' => Carbon::now(),
                'certification' => 'Combat Specialist Certificate',
                'remarks' => 'Intensive military combat training.',
            ],
            [
                'name' => 'Technical Engineering Training',
                'training_type_id' => $trainingTypes->random()->id,
                'duration' => 60,
                'country_id' => $countries->random()->id,
                'start_date' => Carbon::now()->subMonths(2),
                'end_date' => Carbon::now(),
                'certification' => 'Certified Military Engineer',
                'remarks' => 'Engineering and equipment maintenance.',
            ],
            [
                'name' => 'Special Forces Training',
                'training_type_id' => $trainingTypes->random()->id,
                'duration' => 120,
                'country_id' => $countries->random()->id,
                'start_date' => Carbon::now()->subMonths(4),
                'end_date' => Carbon::now(),
                'certification' => 'Elite Forces Badge',
                'remarks' => 'For elite military personnel.',
            ],
        ];

        foreach ($trainings as $training) {
            Training::firstOrCreate($training);
        }
    }
}