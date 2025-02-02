<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\AssetAssignment;
use App\Models\StaffMember;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetAssignmentController extends Controller
{
    public function index()
    {
        return Inertia::render('ASTM/Inven/Assignments/Index', [
            'assignments' => AssetAssignment::with(['asset', 'assignedTo'])->latest()->get()->map(function ($assignment) {
                $assignment->assigned_to_display = $assignment->assigned_to_type === 'App\\Models\\StaffMember'
                    ? $assignment->assignedTo->append('name')->name
                    : $assignment->assignedTo->unit_name;
                return $assignment;
            })
        ]);
    }

    public function create(Asset $asset)
    {
        return Inertia::render('ASTM/Inven/Assignments/Create', [
            'asset' => $asset,
            'assets' => Asset::get(),
            'units' => Unit::get(),
            'staffMembers' => StaffMember::get()->append('name'),
        ]);
    }


    public function edit(AssetAssignment $assetAssignment)
    {
        return Inertia::render('ASTM/Inven/Assignments/Create', [
            'assets' => Asset::get(),
            'units' => Unit::get(),
            'staffMembers' => StaffMember::get()->append('name'),
            'assetAssignment' => $assetAssignment,
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'asset_id' => 'required|exists:assets,id',
            'assigned_to_id' => 'required|integer',
            'assigned_to_type' => 'required|in:App\Models\StaffMember,App\Models\Unit',
            'quantity_assigned' => 'required|integer|min:1',
            'assigned_date' => 'required|date',
            'return_date' => 'nullable|date|after_or_equal:assigned_date',
            'status' => 'required|in:Assigned,Returned,Lost,Damaged',
            'remarks' => 'nullable|string',
        ]);


        // Update asset quantity in use
        $asset = Asset::findOrFail($request->asset_id);
        if ($asset->quantity_in_use + $request->quantity_assigned > $asset->quantity_in_stock) {
            return redirect()->back()->withErrors(['quantity_assigned' => 'Not enough stock available.']);
        }

        $asset->increment('quantity_in_use', $request->quantity_assigned);

        AssetAssignment::create($validated);

        return redirect()->route('assignments.index')->with('success', 'Asset assigned successfully.');
    }

    public function update(Request $request, AssetAssignment $assetAssignment)
    {
        $validated = $request->validate([
            'return_date' => 'nullable|date|after_or_equal:assigned_date',
            'status' => 'required|in:Assigned,Returned,Lost,Damaged',
            'remarks' => 'nullable|string',
        ]);

        // If the asset is returned, update the quantity in use
        if ($validated['status'] === 'Returned') {
            $assetAssignment->asset->decrement('quantity_in_use', $assetAssignment->quantity_assigned);
        }

        $assetAssignment->update($validated);
        return redirect()->route('assignments.index')->with('success', 'Assignment updated successfully.');
    }


    public function show(AssetAssignment $assetAssignment)
    {
        return Inertia::render('ASTM/Inven/Assets/Create', [
            'assetAssignment' => $assetAssignment,
        ]);
    }

    public function destroy(AssetAssignment $assetAssignment)
    {
        $assetAssignment->asset->decrement('quantity_in_use', $assetAssignment->quantity_assigned);
        $assetAssignment->delete();

        return redirect()->route('assignments.index')->with('success', 'Assignment deleted successfully.');
    }
}