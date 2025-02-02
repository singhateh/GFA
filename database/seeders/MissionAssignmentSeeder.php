<?php


namespace Database\Seeders;


use App\Models\MissionAssignment;
use App\Models\StaffMember; // Assuming this model exists
use App\Models\Mission; // Assuming this model exists
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class MissionAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // You can retrieve the staff members and missions that already exist
        $staffMembers = StaffMember::all();
        $missions = Mission::all();

        // Example assignments for staff members to missions
        foreach ($staffMembers as $staff) {
            // Assigning staff members to random missions with roles and start dates
            MissionAssignment::create([
                'staff_member_id' => $staff->id,
                'mission_id' => $missions->random()->id,
                'role' => $this->getRandomRole(), // Generate or select random role
                'assignment_start_date' => Carbon::now()->toDateString(),
                'assignment_end_date' => Carbon::now()->addMonths(3)->toDateString(), // Example end date, 3 months from start
            ]);
        }
    }

    /**
     * Generate random role for the assignment.
     *
     * @return string
     */
    private function getRandomRole()
    {
        $roles = ['Leader', 'Coordinator', 'Member', 'Specialist', 'Observer'];
        return $roles[array_rand($roles)];
    }
}