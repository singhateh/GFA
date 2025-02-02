<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StaffMember;
use App\Models\BloodGroup;
use App\Models\Department;
use App\Models\Rank;
use App\Models\Religion;
use App\Models\Unit;

class StaffMemberSeeder extends Seeder
{
    public function run()
    {
        // Common Gambian first names by gender
        $maleNames = ['Alieu', 'Ebrima', 'Modou', 'Ousman', 'Baboucarr', 'Lamin', 'Yusupha', 'Pa', 'Sainey', 'Malick'];
        $femaleNames = ['Fatou', 'Awa', 'Mariama', 'Binta', 'Jarra', 'Isatou', 'Saffie', 'Adama', 'Haddy', 'Ndey'];

        // Common Gambian last names
        $lastNames = ['Jallow', 'Ceesay', 'Sanyang', 'Drammeh', 'Camara', 'Njie', 'Sissoho', 'Sanneh', 'Touray', 'Bojang'];

        // Gambian cities for place of birth
        $gambianCities = [
            'Banjul',
            'Serrekunda',
            'Brikama',
            'Farafenni',
            'Lamin',
            'Bakau',
            'Basse',
            'Sukuta',
            'Gunjur',
            'Soma',
            'Barra',
            'Janjanbureh',
            'Tujereng',
            'Kerewan',
            'Wassu'
        ];

        // Retrieve existing records from related tables
        $bloodGroups = BloodGroup::all();
        $units = Unit::all();
        $departments = Department::all();
        $ranks = Rank::all();
        $religions = Religion::all();

        // Ensure required tables have data
        if ($bloodGroups->isEmpty() || $units->isEmpty() || $departments->isEmpty() || $ranks->isEmpty() || $religions->isEmpty()) {
            echo "Missing required data in Blood Groups, Units, Departments, Ranks, or Religions.\n";
            return;
        }

        $staffMembers = [];

        for ($i = 1; $i <= 100; $i++) {
            $isMale = rand(0, 1); // Randomly assign male (0) or female (1)

            if ($isMale) {
                $firstName = $maleNames[array_rand($maleNames)];
                $gender = 'Male';
            } else {
                $firstName = $femaleNames[array_rand($femaleNames)];
                $gender = 'Female';
            }

            $lastName = $lastNames[array_rand($lastNames)];
            $placeOfBirth = $gambianCities[array_rand($gambianCities)];
            $armyNumber = 'A' . str_pad($i, 11, '0', STR_PAD_LEFT); // Generate unique army number

            $staffMembers[] = [
                'army_number' => $armyNumber,
                'first_name' => $firstName,
                'last_name' => $lastName,
                'date_of_birth' => fake()->date('Y-m-d', '2000-01-01'),
                'place_of_birth' => $placeOfBirth,
                'rank_id' => $ranks->random()->id,
                'position' => fake()->jobTitle(),
                'department_id' => $departments->random()->id,
                'date_of_enlistment' => fake()->date('Y-m-d', '2010-01-01'),
                'commission_type' => fake()->randomElement(['Officer', 'Enlisted']),
                'contact_number' => fake()->phoneNumber(),
                'intake_name' => 'Batch ' . chr(65 + ($i % 26)), // Batches A-Z
                'email_address' => fake()->unique()->safeEmail(),
                'gender' => $gender,
                'religion_id' => $religions->random()->id,
                'status' => fake()->randomElement(['Active', 'Retired', 'Deceased']),
                'blood_group_id' => $bloodGroups->random()->id,
                'unit_id' => $units->random()->id,
                'created_at' => now(),
            ];
        }

        // Insert staff members in bulk
        StaffMember::insert($staffMembers);
    }
}