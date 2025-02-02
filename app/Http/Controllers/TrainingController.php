<?php

namespace App\Http\Controllers;

use App\Models\Training;
use App\Models\TrainingStaffAssociation;
use Inertia\Inertia;

class TrainingController extends Controller
{
    public function index()
    {
        return Inertia::render('HRM/TrainingAndDevelopments/Index', [
            'recruitments' => [],
        ]);
    }


    public function create()
    {
        $trainingStaffAssociations = TrainingStaffAssociation::with('staffMember', 'trainingCourse')->get();

        return Inertia::render('PT/TrainingPrograms/Create', [
            'trainingStaffAssociations' => $trainingStaffAssociations
        ]);
    }

    public function edit(Training $training)
    {
        $trainingStaffAssociations = TrainingStaffAssociation::with('staffMember', 'trainingCourse')->get();

        return Inertia::render('PT/PerformanceTrackings/Create', [
            'trainingStaffAssociations' => $trainingStaffAssociations,
            'training' => $training
        ]);
    }
}