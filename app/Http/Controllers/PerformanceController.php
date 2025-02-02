<?php

namespace App\Http\Controllers;

use App\Models\TrainingPerformanceTracking;
use App\Models\TrainingStaffAssociation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PerformanceController extends Controller
{


    public function PerformanceIndex()
    {

        return Inertia::render('HRM/PerformanceReviews/Index', []);
    }


    public function index()
    {
        $trainingPerformances = TrainingPerformanceTracking::with(
            'trainingStaffAssociation.staffMember',
            'trainingStaffAssociation.trainingCourse'
        )->latest()->get();

        return Inertia::render('PT/PerformanceTrackings/Index', [
            'trainingPerformances' => $trainingPerformances
        ]);
    }

    public function create()
    {
        $trainingStaffAssociations = TrainingStaffAssociation::with('staffMember', 'trainingCourse')->get();

        return Inertia::render('PT/PerformanceTrackings/Create', [
            'trainingStaffAssociations' => $trainingStaffAssociations
        ]);
    }

    public function edit(TrainingPerformanceTracking $trainingPerformanceTracking)
    {
        $trainingStaffAssociations = TrainingStaffAssociation::with('staffMember', 'trainingCourse')->get();

        return Inertia::render('PT/PerformanceTrackings/Create', [
            'trainingStaffAssociations' => $trainingStaffAssociations,
            'trainingPerformanceTracking' => $trainingPerformanceTracking
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'training_staff_association_id' => 'required|exists:training_staff_associations,id',
            'progress_percentage' => 'required|integer|min:0|max:100',
            'status' => 'required|string',
            'remarks' => 'nullable|string',
        ]);

        TrainingPerformanceTracking::create($request->all());

        return Redirect::route('performance.index');
    }

    public function update(Request $request, TrainingPerformanceTracking $trainingPerformanceTracking)
    {
        $request->validate([
            'progress_percentage' => 'required|integer|min:0|max:100',
            'status' => 'required|string',
            'remarks' => 'nullable|string',
        ]);

        $trainingPerformanceTracking->update($request->all());

        return Redirect::route('performance.index');
    }

    public function destroy(TrainingPerformanceTracking $trainingPerformanceTracking)
    {
        $trainingPerformanceTracking->delete();

        return Redirect::route('performance.index');
    }
}