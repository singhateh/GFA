<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AssetAssignment;
use App\Models\Asset;
use App\Models\StaffMember;
use App\Models\Unit;

class AssetAssignmentSeeder extends Seeder
{
    public function run()
    {
        // Get all assets, users, and units
        $assets = Asset::all();
        $StaffMembers = StaffMember::all();
        $units = Unit::all();

        // Generate asset assignments (15 or 20 entries)
        $assignments = [];
        for ($i = 0; $i < 20; $i++) {  // Change 20 to 15 for 15 entries
            $assignedAsset = $assets->random();
            $quantityAssigned = rand(1, 5);

            // Check if quantity_in_use + quantityAssigned exceeds quantity_in_stock
            if (($assignedAsset->quantity_in_use + $quantityAssigned) > $assignedAsset->quantity_in_stock) {
                // Adjust quantity assigned so that it doesn't exceed quantity_in_stock
                $quantityAssigned = $assignedAsset->quantity_in_stock - $assignedAsset->quantity_in_use;
                // If the quantity assigned would be 0 or negative, skip this iteration
                if ($quantityAssigned <= 0) {
                    continue;
                }
            }

            // Add assignment data to assignments array
            $assignments[] = [
                'asset_id' => $assignedAsset->id,
                'assigned_to_type' => $i % 2 == 0 ? 'App\Models\StaffMember' : 'App\Models\Unit',  // Alternate between StaffMember and Unit
                'assigned_to_id' => $i % 2 == 0 ? $StaffMembers->random()->id : $units->random()->id,
                'quantity_assigned' => $quantityAssigned,
                'assigned_date' => now(),
                'return_date' => now()->addDays(rand(30, 90)),
                'status' => 'Assigned',
                'remarks' => 'Initial assignment',
            ];

            // Update the asset's quantity_in_use
            $assignedAsset->increment('quantity_in_use', $quantityAssigned);
        }

        // Insert generated assignments
        AssetAssignment::insert($assignments);
    }
}