<?php

namespace Database\Seeders;

use App\Models\Clearance;
use App\Models\StaffMember;
use Illuminate\Database\Seeder;

class ClearanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all staff members (ensure you have staff data first)
        $staffMembers = StaffMember::all();

        if ($staffMembers->isEmpty()) {
            $this->command->warn('No staff members found. Please seed the staff table first.');
            return;
        }

        // Seed clearance records
        foreach ($staffMembers as $staff) {
            Clearance::create([
                'staff_member_id' => $staff->id,
                'issued_at' => now()->subDays(rand(1, 365)), // Random past date
                'type' => ['Re-engagement', 'Exit', 'Medical'][array_rand(['Re-engagement', 'Exit', 'Medical'])],
                'status' => ['Pending', 'Approved', 'Rejected'][array_rand(['Pending', 'Approved', 'Rejected'])],
                'remarks' => fake()->sentence(),
            ]);
        }
    }
}