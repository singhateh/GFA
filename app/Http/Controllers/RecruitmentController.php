<?php

namespace App\Http\Controllers;

use App\Models\Recruitment;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RecruitmentController extends Controller
{
    public function index()
    {
        return Inertia::render('HRM/RecruitmentManagements/RecruitmentManagement', [
            'recruitments' => [],
        ]);
    }

    public function create()
    {
        return Inertia::render('HRM/Recruitment/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'staff_member_id' => 'required|exists:staff_members,id',
            'position' => 'required|string|max:255',
            'status' => 'required|string|max:50',
            'date_applied' => 'required|date',
        ]);

        Recruitment::create($request->all());

        return redirect()->route('recruitment.index')->with('success', 'Recruitment record created.');
    }

    public function show(Recruitment $recruitment)
    {
        $recruitment->load('staffMember');

        return Inertia::render('HRM/Recruitment/Show', [
            'recruitment' => [
                'id' => $recruitment->id,
                'staff_member_name' => $recruitment->staffMember->name ?? 'N/A',
                'position' => $recruitment->position,
                'status' => $recruitment->status,
                'date_applied' => $recruitment->date_applied,
                'created_at' => $recruitment->created_at->toDateTimeString(),
            ],
        ]);
    }

    public function edit(Recruitment $recruitment)
    {
        return Inertia::render('HRM/Recruitment/Edit', [
            'recruitment' => $recruitment,
        ]);
    }

    public function update(Request $request, Recruitment $recruitment)
    {
        $request->validate([
            'position' => 'required|string|max:255',
            'status' => 'required|string|max:50',
            'date_applied' => 'required|date',
        ]);

        $recruitment->update($request->all());

        return redirect()->route('recruitment.index')->with('success', 'Recruitment record updated.');
    }

    public function destroy(Recruitment $recruitment)
    {
        $recruitment->delete();

        return redirect()->route('recruitment.index')->with('success', 'Recruitment record deleted.');
    }
}