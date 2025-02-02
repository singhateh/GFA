<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TrainingPerformanceTracking;
use App\Models\TrainingStaffAssociation;

class TrainingPerformanceTrackingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $associations = TrainingStaffAssociation::all();

        foreach ($associations as $association) {
            $progress = rand(0, 100);
            $status = $progress == 100 ? 'Completed' : ($progress > 0 ? 'In Progress' : 'Not Started');

            TrainingPerformanceTracking::create([
                'training_staff_association_id' => $association->id,
                'progress_percentage' => $progress,
                'status' => $status,
                'remarks' => 'Performance recorded.',
            ]);
        }
    }
}