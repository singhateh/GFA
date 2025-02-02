<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed the basic tables (e.g., Department, Rank, Religion, BloodGroup, Unit)
        $this->call([
            AssetTypeSeeder::class,
            AssetSeeder::class,
            DepartmentSeeder::class,
            CommissionTypeSeeder::class,
            PositionSeeder::class,
            RankSeeder::class,
            ReligionSeeder::class,
            BloodGroupSeeder::class,
            UnitSeeder::class, // UnitSeeder to be created based on the Unit model
        ]);


        $this->call([
            TrainingTypeSeeder::class,
            CountrySeeder::class,
            TrainingSeeder::class,
            TrainingCoursesSeeder::class,
        ]);

        // Seed the StaffMember and related tables
        $this->call([
            StaffMemberSeeder::class,
            ServiceStatusChangeSeeder::class,
            StaffPostingSeeder::class,
            AssetAssignmentSeeder::class,
            TrainingStaffAssociationsSeeder::class,
            TrainingPerformanceTrackingSeeder::class,
        ]);



        // Add a test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            MedicalRecordSeeder::class,
            MedicalCheckupSeeder::class,
            ClearanceSeeder::class,
        ]);

        $this->call([
            MissionTypeSeeder::class,
            MissionSponsorSeeder::class,
            MissionSeeder::class,
            MissionEligibilitySeeder::class,
            MissionAssignmentSeeder::class,
        ]);
    }
}