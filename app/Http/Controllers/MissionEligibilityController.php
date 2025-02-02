<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\MissionAssignment;
use App\Models\MissionEligibility;
use App\Models\StaffMember;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MissionEligibilityController extends Controller
{
    public function index()
    {
        $missionEligibilities = MissionEligibility::latest()->get();
        return Inertia::render('PO/MissionEligibilities/Index', [
            'missionEligibilities' => $missionEligibilities,
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('PO/MissionEligibilities/Create', []);
    }


    public function edit(MissionEligibility $missionEligibility): Response
    {
        return Inertia::render('PO/MissionEligibilities/Create', [
            'missionEligibility' => $missionEligibility,
        ]);
    }

    // Update an existing missionEligibility
    public function update(Request $request, MissionEligibility $missionEligibility)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'min_length_of_service' => 'required',
            'min_gap_since_last_deployment' => 'required',
        ]);

        $missionEligibility->update($validated);

        return redirect()->route('mission_eligibility.index')
            ->with('success', 'Medical missionEligibility updated successfully.');
    }

    public function destroy(MissionEligibility $missionEligibility)
    {

        $missionEligibility->delete();

        return redirect()->route('mission_eligibility.index')
            ->with('success', 'MissionEligibility deleted successfully.');
    }

    function ScanEligibleStaff(MissionEligibility $missionEligibility): Response
    {
        return Inertia::render('PO/MissionEligibilities/ScanEligibleStaff', [
            'staffMembers' => StaffMember::get(),
            'unitDepartments' => Department::all(),
            'mission' => $missionEligibility->id
        ]);
    }

    function ScanEligibleStaffInfo(MissionEligibility $missionEligibility)
    {
        // Fetch all staff members (assuming they can all be assigned to a mission)
        $staffMembers = StaffMember::with('department')->get();

        // Calculate enlistment duration (5 years) and mission assignment end date (4 years)
        $eligibleStaff = $staffMembers->filter(function ($staff) use ($missionEligibility) {
            $enlistmentDate = \Carbon\Carbon::parse($staff->date_of_enlistment);
            $missionEndDate = \Carbon\Carbon::parse(MissionAssignment::whereStaffMemberId($staff->id)->first()->assignment_end_date);

            $isEnlistmentEligible = $enlistmentDate;

            $isMissionEndEligible = $missionEndDate->lte(now()->subYears(0));

            return $isEnlistmentEligible;
        });

        return response()->json([
            'missionEligibility' => $missionEligibility,
            'eligibleStaff' => $eligibleStaff->values(), // Reindex for JSON response
        ]);
    }
}