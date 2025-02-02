<?php

use App\Http\Controllers\Controller;
use App\Models\AssetAssignment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssignmentController extends Controller
{
    public function index()
    {
        return Inertia::render('AssetAssignments/Index', [
            'assignments' => AssetAssignment::with(['asset', 'assignTo'])->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'asset_id' => 'required|exists:assets,id',
            'assign_to_id' => 'required|integer',
            'assign_to_type' => 'required|string',
            'assigned_date' => 'required|date',
        ]);

        AssetAssignment::create($request->all());

        return redirect()->back()->with('success', 'Asset assigned successfully.');
    }

    public function returnAsset(AssetAssignment $assignment)
    {
        $assignment->update([
            'return_date' => now(),
            'status' => 'Returned'
        ]);

        return redirect()->back()->with('success', 'Asset returned successfully.');
    }
}