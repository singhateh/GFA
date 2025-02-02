<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\MissionAssignment;
use App\Models\MissionEligibility;
use App\Models\StaffMember;
use Carbon\Carbon;
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


    function ScanEligibleStaffInfo(Request $request, MissionEligibility $missionEligibility)
    {
        // Fetch all staff members with their department and mission assignments
        $staffMembers = StaffMember::when($request->department_id, function ($query) use ($request) {
            $query->where('department_id', $request->department_id);
        })->with(['department', 'missionAssignments.mission'])->get();

        // Prepare an array to store staff logs
        $staffLog = [];

        // Filter staff members based on eligibility criteria
        $eligibleStaff = $staffMembers->filter(function ($staff) use ($missionEligibility, &$staffLog) {
            // Parse the enlistment date
            $enlistmentDate = Carbon::parse($staff->date_of_enlistment);
            $yearsOfService = $enlistmentDate->diffInYears(now());

            // Check if the staff member has any mission assignments
            if ($staff->missionAssignments->isEmpty()) {
                // If no assignments, consider them eligible based on enlistment duration only
                $isEligible = $yearsOfService >= $missionEligibility->min_length_of_service;
                $staffLog[] = [
                    'name' => $staff->name,
                    'years_of_service' => $yearsOfService,
                    'last_mission' => 'N/A',
                    'last_mission_end' => 'N/A',
                    'eligible' => $isEligible ? 'Yes' : 'No',
                ];
                return $isEligible;
            }

            // Get the most recent mission assignment
            $mostRecentAssignment = $staff->missionAssignments->sortByDesc('assignment_end_date')->first();
            $missionEndDate = Carbon::parse($mostRecentAssignment->assignment_end_date);
            $gapSinceLastMission = $missionEndDate->diffInYears(now());
            $lastMissionName = $mostRecentAssignment->mission->name ?? 'Unknown Mission';

            // Check eligibility based on enlistment duration and mission assignment end date
            $isEnlistmentEligible = $yearsOfService >= $missionEligibility->min_length_of_service;
            $isMissionEndEligible = $gapSinceLastMission >= $missionEligibility->min_gap_since_last_deployment;

            $staffLog[] = [
                'name' => $staff->name,
                'years_of_service' => $yearsOfService,
                'last_mission' => $lastMissionName,
                'last_mission_end' => $missionEndDate->toDateString(),
                'gap_since_last_mission' => $gapSinceLastMission,
                'eligible' => ($isEnlistmentEligible && $isMissionEndEligible) ? 'Yes' : 'No',
            ];

            return $isEnlistmentEligible && $isMissionEndEligible;
        });

        // Return the response with eligible staff and mission eligibility criteria, along with logs
        return response()->json([
            'missionEligibility' => $missionEligibility,
            'eligibleStaff' => $eligibleStaff->values(), // Reindex for JSON response
            'staffLog' => $staffLog, // Log of all staff with their details
        ]);
    }
}