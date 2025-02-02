<?php

namespace App\Http\Controllers;

use App\Models\Mission;
use App\Models\MissionSponsor;
use App\Models\MissionType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MissionController extends Controller
{
    public function index()
    {
        $missions = Mission::with(['missionType', 'sponsor'])->latest()->get();
        return Inertia::render('PO/Missions/Index', [
            'missions' => $missions,
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('PO/Missions/Create', [
            'missionTypes' => MissionType::get(),
            'missionSponsors' => MissionSponsor::get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mission_type_id' => 'required|exists:mission_types,id',
            'name' => 'required|string|max:255',
            'mission_sponsor_id' => 'required|exists:mission_sponsors,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'country' => 'required|string|max:255',
            'status' => 'required|in:Active,Pending,Completed',
        ]);

        Mission::create($validated);

        return redirect()->route('missions.index')
            ->with('success', 'Medical mission created successfully.');
    }


    public function edit(Mission $mission): Response
    {
        return Inertia::render('PO/Missions/Create', [
            'mission' => $mission,
            'missionTypes' => MissionType::get(),
            'missionSponsors' => MissionSponsor::get(),
        ]);
    }

    // Update an existing mission
    public function update(Request $request, Mission $mission)
    {
        $validated = $request->validate([
            'mission_type_id' => 'required|exists:mission_types,id',
            'name' => 'required|string|max:255',
            'mission_sponsor_id' => 'required|exists:mission_sponsors,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'country' => 'required|string|max:255',
            'status' => 'required|in:Active,Pending,Completed',
        ]);

        $mission->update($validated);

        return redirect()->route('missions.index')
            ->with('success', 'Medical mission updated successfully.');
    }

    public function destroy(Mission $mission)
    {
        // Optional: Check for additional conditions before deleting if necessary

        $mission->delete();

        return redirect()->route('missions.index')
            ->with('success', 'Mission deleted successfully.');
    }
}