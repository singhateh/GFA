<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Training;
use App\Models\TrainingType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TrainingProgramController extends Controller
{
    public function index()
    {
        return Inertia::render('PT/TrainingPrograms/Index', [
            'trainingPrograms' => Training::with('trainingType', 'country')->get(),
        ]);
    }


    public function create()
    {

        return Inertia::render('PT/TrainingPrograms/Create', [
            'trainingTypes' => TrainingType::get(),
            'countries' => Country::get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated =  $request->validate([
            'name' => 'required|string',
            'training_type_id' => 'required|exists:training_types,id',
            'country_id' => 'required|exists:countries,id',
            'duration' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'certification' => 'nullable|string',
            'remarks' => 'nullable|string',
        ]);

        Training::create($validated);

        return Redirect::route('training.index');
    }

    public function update(Request $request, Training $training)
    {
        $validated =  $request->validate([
            'name' => 'required|string',
            'training_type_id' => 'required|exists:training_types,id',
            'country_id' => 'required|exists:countries,id',
            'duration' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'certification' => 'nullable|string',
            'remarks' => 'nullable|string',
        ]);

        $training->update($validated);

        return Redirect::route('training.index');
    }

    public function edit(Training $training)
    {
        return Inertia::render('PT/TrainingPrograms/Create', [
            'trainingTypes' => TrainingType::get(),
            'countries' => Country::get(),
            'training' => $training
        ]);
    }


    public function destroy(Training $training)
    {
        $training->delete();

        return Redirect::route('training.index');
    }
}