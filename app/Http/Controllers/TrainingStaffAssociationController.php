<?php

namespace App\Http\Controllers;

use App\Models\StaffMember;
use App\Models\TrainingCourse;
use App\Models\TrainingStaffAssociation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrainingStaffAssociationController extends Controller
{
    // Display a listing of the staff associations
    public function index()
    {
        // You can add pagination or other features as needed
        $associations = TrainingStaffAssociation::with('staffMember', 'trainingCourse')->latest()->get();

        return Inertia::render('PT/TrainingStaffAssociations/Index', [
            'associations' => $associations
        ]);
    }

    // Show the form to create a new staff association
    public function create()
    {
        return Inertia::render(
            'PT/TrainingStaffAssociations/Create',
            ['staffMembers' => StaffMember::all(), 'trainingCourses' => TrainingCourse::all()]
        );
    }


    // Store a newly created staff association in the database
    public function store(Request $request)
    {
        $request->validate([
            'staff_member_ids' => 'required|array',
            'staff_member_ids.*' => 'exists:staff_members,id',
            'training_course_id' => 'required|exists:training_courses,id',
            'status' => 'nullable|string',
        ]);

        foreach ($request->staff_member_ids as $staff_member_id) {
            TrainingStaffAssociation::create([
                'staff_member_id' => $staff_member_id,
                'training_course_id' => $request->training_course_id,
                'status' => $request->status,
            ]);
        }

        return redirect()->route('staff-associations.index')->with('success', 'Training Staff Association(s) created successfully');
    }


    // Show the form for editing the specified staff association
    public function edit(TrainingStaffAssociation $trainingStaffAssociation)
    {
        return Inertia::render('PT/TrainingStaffAssociations/Create', [
            'trainingStaffAssociation' => $trainingStaffAssociation->load('staffMember'),
            'staffMembers' => StaffMember::all(),
            'trainingCourses' => TrainingCourse::all()
        ]);
    }

    // Update the specified staff association in the database
    public function update(Request $request, TrainingStaffAssociation $trainingStaffAssociation)
    {
        $request->validate([
            'staff_member_id' => 'required|exists:staff_members,id',
            'training_course_id' => 'required|exists:training_courses,id',
            'status' => 'nullable|string',
        ]);

        $trainingStaffAssociation->update([
            'staff_member_id' => $request->staff_member_id,
            'training_course_id' => $request->training_course_id,
            'status' => $request->status,
        ]);

        return redirect()->route('staff-associations.index')->with('success', 'Training Staff Association updated successfully');
    }

    // Remove the specified staff association from the database
    public function destroy(TrainingStaffAssociation $trainingStaffAssociation)
    {
        $trainingStaffAssociation->delete();

        return redirect()->route('staff-associations.index')->with('success', 'Training Staff Association deleted successfully');
    }
}