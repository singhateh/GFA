<?php


namespace App\Http\Controllers;

use App\Models\JobPosting;
use Illuminate\Http\Request;

class JobPostingController extends Controller
{
    public function index()
    {
        $jobPostings = JobPosting::all();
        return inertia('HRM/RecruitmentManagements/JobPostings/Index', ['jobPostings' => $jobPostings]);
    }

    public function create()
    {
        return inertia('HRM/RecruitmentManagements/JobPostings/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'status' => 'required|string',
            'location' => 'required|string',
        ]);

        JobPosting::create($request->all());

        return redirect()->route('recruitment.jobPostings.index');
    }

    public function show(JobPosting $jobPosting)
    {
        return inertia('HRM/RecruitmentManagements/JobPostings/Show', ['jobPosting' => $jobPosting->load('applications')]);
    }
}