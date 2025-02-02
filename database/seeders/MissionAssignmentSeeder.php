<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\StaffMember;
use App\Models\Mission;
use App\Models\MissionAssignment;

class MissionAssignmentSeeder extends Seeder
{
    public function run()
    {
        $staffMembers = StaffMember::all();
        $missions = Mission::all();
        $roles = ['Leader', 'Member', 'Advisor', 'Support']; // Define possible roles

        foreach ($staffMembers as $staff) {
            // 70% chance to assign a mission (some staff will remain "new")
            if (rand(0, 100) < 70) {
                $endDate = Carbon::now()->subYears(rand(4, 10))->toDateString();
                $startDate = Carbon::parse($endDate)->subMonths(rand(3, 12))->toDateString();

                MissionAssignment::create([
                    'staff_member_id' => $staff->id,
                    'mission_id' => $missions->random()->id,
                    'role' => $roles[array_rand($roles)], // Assign a random role
                    'assignment_start_date' => $startDate,
                    'assignment_end_date' => $endDate,
                ]);
            }
        }
    }
}