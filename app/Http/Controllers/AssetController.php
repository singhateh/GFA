<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\AssetType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetController extends Controller
{
    public function index()
    {
        return Inertia::render('ASTM/Inven/Assets/AssetIndex', [
            'assets' => Asset::with('assetType', 'assignments')->latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('ASTM/Inven/Assets/Create', [
            'assettypes' => AssetType::get(),
        ]);
    }


    public function edit(Asset $asset)
    {
        return Inertia::render('ASTM/Inven/Assets/Create', [
            'assettypes' => AssetType::get(),
            'asset' => $asset,
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'asset_type_id' => 'required|exists:asset_types,id',
            'serial_no' => 'required|string|unique:assets',
            'status' => 'required|in:Available,Assigned,Maintenance,Retired',
            'condition' => 'required|in:New,Good,Damaged,Inoperable,Fair',
            'quantity_in_stock' => 'required|integer|min:0',
            'quantity_in_use' => 'required|integer|min:0|max:' . $request->quantity_in_stock,
            'date_procured' => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        Asset::create($validated);
        return redirect()->route('assets.index')->with('success', 'Asset created successfully.');
    }


    public function show(Asset $asset)
    {
        return Inertia::render('ASTM/Inven/Assets/Create', [
            'assettypes' => AssetType::get(),
            'asset' => $asset,
        ]);
    }


    public function update(Request $request, Asset $asset)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'asset_type_id' => 'required|exists:asset_types,id',
            'serial_no' => 'required|string|unique:assets,serial_no,' . $asset->id,
            'status' => 'required|in:Available,Assigned,Maintenance,Retired',
            'condition' => 'required|in:New,Good,Damaged,Inoperable,Fair',
            'quantity_in_stock' => 'required|integer|min:0',
            'quantity_in_use' => 'required|integer|min:0|max:' . $request->quantity_in_stock,
            'date_procured' => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        $asset->update($validated);
        return redirect()->route('assets.index')->with('success', 'Asset updated successfully.');
    }


    public function destroy(Asset $asset)
    {
        $asset->delete();
        return redirect()->route('assets.index')->with('success', 'Asset deleted successfully.');
    }
}