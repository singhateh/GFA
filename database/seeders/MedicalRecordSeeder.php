<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MedicalRecord;
use App\Models\StaffMember;
use App\Models\User;

class MedicalRecordSeeder extends Seeder
{
    public function run()
    {
        $staffMembers = StaffMember::all();
        $doctors = User::all(); // Ensure we only select doctors

        if ($staffMembers->isEmpty() || $doctors->isEmpty()) {
            $this->command->warn('No staff members or doctors found. Please seed them first.');
            return;
        }

        $sampleMedicalRecords = [
            [
                'medical_history' => 'Hypertension diagnosed in 2018, managed with medication.',
                'prescriptions' => 'Amlodipine 5mg once daily.',
                'allergies' => 'No known drug allergies.',
                'notes' => 'Patient advised to reduce sodium intake.'
            ],
            [
                'medical_history' => 'Type 2 Diabetes diagnosed in 2020, insulin-dependent.',
                'prescriptions' => 'Metformin 500mg twice daily, Insulin as per need.',
                'allergies' => 'Penicillin allergy reported.',
                'notes' => 'Regular blood sugar monitoring required.'
            ],
            [
                'medical_history' => 'Asthma since childhood, well-managed with inhalers.',
                'prescriptions' => 'Salbutamol inhaler as needed, Montelukast 10mg daily.',
                'allergies' => 'Dust and pollen allergies.',
                'notes' => 'Patient instructed to avoid triggers and use inhaler before exercise.'
            ],
            [
                'medical_history' => 'Recent surgery (appendectomy in 2023).',
                'prescriptions' => 'Paracetamol 500mg for pain relief.',
                'allergies' => 'None reported.',
                'notes' => 'Post-surgery follow-up scheduled in 2 weeks.'
            ],
            [
                'medical_history' => 'Frequent migraines, no known underlying cause.',
                'prescriptions' => 'Sumatriptan 50mg as needed.',
                'allergies' => 'Lactose intolerance.',
                'notes' => 'Patient advised to maintain headache diary.'
            ]
        ];

        foreach ($staffMembers as $staffMember) {
            $doctor = $doctors->random(); // Randomly assign a doctor

            $record = $sampleMedicalRecords[array_rand($sampleMedicalRecords)]; // Pick a random record

            MedicalRecord::create([
                'staff_member_id' => $staffMember->id,
                'doctor_id' => $doctor->id,
                'medical_history' => $record['medical_history'],
                'prescriptions' => $record['prescriptions'],
                'allergies' => $record['allergies'],
                'notes' => $record['notes']
            ]);
        }
    }
}