<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TrainingStaffAssociation;
use App\Models\StaffMember;
use App\Models\TrainingCourse;

class TrainingStaffAssociationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Get sample staff members and training courses
        $staffMembers = StaffMember::all();
        $trainingCourses = TrainingCourse::all();

        // Ensure that both tables have entries before seeding
        if ($staffMembers->count() > 0 && $trainingCourses->count() > 0) {
            // Assign random staff members to random training courses
            foreach ($staffMembers as $staffMember) {
                $trainingCourse = $trainingCourses->random();

                TrainingStaffAssociation::create([
                    'staff_member_id' => $staffMember->id,
                    'training_course_id' => $trainingCourse->id,
                ]);
            }
        }
    }
}