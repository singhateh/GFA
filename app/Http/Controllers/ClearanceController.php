<?php

namespace App\Http\Controllers;

use App\Models\Clearance;
use App\Models\StaffMember;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClearanceController extends Controller
{
    public function index()
    {
        $clearances = Clearance::with('staffMember')->latest()->get();
        return Inertia::render('MRM/Clearances/Index', [
            'clearances' => $clearances
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('MRM/Clearances/Create', [
            'staffMembers' => StaffMember::get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'staff_member_id' => 'required|exists:staff_members,id',
            'issued_at' => 'required|date',
            'type' => 'required|string|max:50',
            'status' => 'required|string|in:Pending,Approved,Rejected',
            'remarks' => 'nullable|string',
        ]);

        Clearance::create($validated);

        return redirect()->route('clearances.index')->with('success', 'Clearance created successfully.');
    }

    public function edit(Clearance $clearance): Response
    {
        return Inertia::render('MRM/Clearances/Create', [
            'clearance' => $clearance,
            'staffMembers' => StaffMember::get(),
        ]);
    }

    public function update(Request $request, Clearance $clearance)
    {
        // Validate the incoming request
        $validated =  $request->validate([
            'staff_member_id' => 'required|exists:staff_members,id',
            'issued_at' => 'required|date',
            'type' => 'required|string|max:50',
            'status' => 'required|string|in:Pending,Approved,Rejected',
            'remarks' => 'nullable|string',
        ]);

        // Update the medical checkup record
        $clearance->update($validated);

        // Redirect with a success message
        return redirect()->route('clearances.index')->with('success', 'Clearance updated successfully.');
    }


    public function destroy(Clearance $clearance)
    {
        $clearance->delete();
        return redirect()->route('clearances.index')->with('success', 'Clearance deleted successfully.');
    }
}