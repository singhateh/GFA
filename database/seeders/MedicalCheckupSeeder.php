<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MedicalCheckup;
use App\Models\StaffMember;
use App\Models\User;
use Carbon\Carbon;
use Faker\Factory as Faker;

class MedicalCheckupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $staffMembers = StaffMember::pluck('id')->toArray();
        $doctors = User::pluck('id')->toArray();

        if (empty($staffMembers) || empty($doctors)) {
            $this->command->warn('No staff members or doctors found. Please seed users first.');
            return;
        }

        $faker = Faker::create(); // Initialize Faker

        foreach (range(1, 10) as $index) {
            // Generate random number of days ago for checkup date (between 1 and 30 days in the past)
            $checkupDate = Carbon::now()->subDays(rand(1, 30))->setTime(rand(8, 17), rand(0, 59)); // Set random time between 8 AM and 5 PM

            // Generate a schedule date that is at least 1 day after the checkup date (but not too far ahead)
            $scheduleDate = $checkupDate->copy()->addDays(rand(1, 10));  // Add between 1 and 10 days
            $scheduleDate->setTime(rand(8, 17), rand(0, 59)); // Random time between 8 AM and 5 PM

            MedicalCheckup::create([
                'staff_member_id' => $staffMembers[array_rand($staffMembers)],
                'doctor_id' => $doctors[array_rand($doctors)],
                'checkup_date' => $checkupDate,  // Past checkup date with time
                'schedule_date' => $scheduleDate,  // Future schedule date with time after checkup date
                'result' => $faker->randomElement(['Pass', 'Fail']),
                'notes' => $faker->sentence(),
                'follow_up_required' => $faker->boolean(),
            ]);
        }
    }
}