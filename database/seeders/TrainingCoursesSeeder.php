<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TrainingCourse;

class TrainingCoursesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $courses = [
            ['name' => 'Basic Military Training', 'type' => 'Military', 'description' => 'Introductory training for new recruits.'],
            ['name' => 'Advanced Combat Training', 'type' => 'Military', 'description' => 'Specialized combat tactics and strategies.'],
            ['name' => 'Leadership and Command Training', 'type' => 'Military', 'description' => 'Training for officers and senior personnel.'],
            ['name' => 'Cybersecurity Awareness', 'type' => 'Civilian', 'description' => 'Fundamentals of cybersecurity and data protection.'],
            ['name' => 'Disaster Response Training', 'type' => 'Civilian', 'description' => 'Emergency response strategies and coordination.'],
            ['name' => 'Peacekeeping Operations', 'type' => 'Military', 'description' => 'Training for international peacekeeping missions.'],
            ['name' => 'Medical First Aid Training', 'type' => 'Civilian', 'description' => 'Basic and advanced medical emergency response training.'],
        ];

        foreach ($courses as $course) {
            TrainingCourse::create($course);
        }
    }
}