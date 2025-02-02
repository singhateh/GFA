<?php

namespace App\Http\Controllers;

use App\Models\MissionSponsor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MissionSponsorController extends Controller
{
    public function index()
    {
        $missionSponsors = MissionSponsor::latest()->get();
        return Inertia::render('PO/MissionSponsors/Index', [
            'missionSponsors' => $missionSponsors,
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('PO/MissionSponsors/Create', []);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact_info' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'remarks' => 'nullable|string|max:255',
        ]);

        MissionSponsor::create($validated);

        return redirect()->route('mission_sponsors.index')
            ->with('success', 'Medical missionSponsor created successfully.');
    }


    public function edit(MissionSponsor $missionSponsor): Response
    {
        return Inertia::render('PO/MissionSponsors/Create', [
            'missionSponsor' => $missionSponsor,
        ]);
    }

    // Update an existing missionSponsor
    public function update(Request $request, MissionSponsor $missionSponsor)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact_info' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'remarks' => 'nullable|string|max:255',
        ]);

        $missionSponsor->update($validated);

        return redirect()->route('mission_sponsors.index')
            ->with('success', 'Medical missionSponsor updated successfully.');
    }

    public function destroy(MissionSponsor $missionSponsor)
    {

        $missionSponsor->delete();

        return redirect()->route('mission_sponsors.index')
            ->with('success', 'MissionSponsor deleted successfully.');
    }
}