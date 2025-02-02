<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Training;
use App\Models\TrainingCourse;
use App\Models\TrainingType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;


class CourseController extends Controller
{
    public function index()
    {
        return Inertia::render('PT/TrainingCourses/Index', [
            'trainingCourses' => TrainingCourse::latest()->get(),
        ]);
    }


    public function create()
    {

        return Inertia::render('PT/TrainingCourses/Create', [
            'trainingTypes' => TrainingType::get(),
            'countries' => Country::get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated =  $request->validate([
            'name' => 'required|string',
            'type' => 'required',
            'status' => 'required',
            'certification' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        TrainingCourse::create($validated);

        return Redirect::route('courses.index');
    }

    public function update(Request $request, TrainingCourse $trainingCourse)
    {
        $validated =  $request->validate([
            'name' => 'required|string',
            'type' => 'required',
            'status' => 'required',
            'certification' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $trainingCourse->update($validated);

        return Redirect::route('courses.index');
    }

    public function edit(TrainingCourse $trainingCourse)
    {
        return Inertia::render('PT/TrainingCourses/Create', [
            'trainingTypes' => TrainingType::get(),
            'countries' => Country::get(),
            'trainingCourse' => $trainingCourse
        ]);
    }


    public function destroy(TrainingCourse $trainingCourse)
    {
        $trainingCourse->delete();

        return Redirect::route('courses.index');
    }
}