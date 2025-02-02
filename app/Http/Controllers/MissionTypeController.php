<?php

namespace App\Http\Controllers;

use App\Models\MissionType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MissionTypeController extends Controller
{
    public function index()
    {
        $missionTypes = MissionType::get();
        return Inertia::render('PO/MissionTypes/Index', [
            'missionTypes' => $missionTypes,
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('PO/MissionTypes/Create', []);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        MissionType::create($validated);

        return redirect()->route('mission_types.index')
            ->with('success', 'Medical missionType created successfully.');
    }


    public function edit(MissionType $missionType): Response
    {
        return Inertia::render('PO/MissionTypes/Create', [
            'missionType' => $missionType,
        ]);
    }

    // Update an existing missionType
    public function update(Request $request, MissionType $missionType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        $missionType->update($validated);

        return redirect()->route('mission_types.index')
            ->with('success', 'Medical missionType updated successfully.');
    }

    public function destroy(MissionType $missionType)
    {

        $missionType->delete();

        return redirect()->route('mission_types.index')
            ->with('success', 'MissionType deleted successfully.');
    }
}