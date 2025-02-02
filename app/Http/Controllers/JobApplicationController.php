<?php


namespace App\Http\Controllers;

use App\Models\JobApplication;
use App\Models\JobPosting;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{

    public function index()
    {
        $jobApplications = JobApplication::with('jobPosting')->get();

        // dd($jobApplications);
        return inertia('HRM/RecruitmentManagements/JobApplications/Index', ['jobApplications' => $jobApplications]);
    }

    public function create(JobPosting $jobPosting)
    {
        return inertia('HRM/RecruitmentManagements/JobApplications/Create', ['jobPosting' => $jobPosting]);
    }

    public function store(Request $request, JobPosting $jobPosting)
    {
        $request->validate([
            'candidate_name' => 'required|string|max:255',
            'email' => 'required|email',
            'resume' => 'required|file|mimes:pdf,docx,doc|max:2048',
        ]);

        $path = $request->file('resume')->store('resumes');

        JobApplication::create([
            'job_posting_id' => $jobPosting->id,
            'candidate_name' => $request->candidate_name,
            'email' => $request->email,
            'resume' => $path,
            'status' => 'Applied',
        ]);

        return redirect()->route('recruitment.jobPostings.show', $jobPosting);
    }

    public function show(JobApplication $jobApplication)
    {

        // dd($jobApplication->load('jobPosting', 'jobPostings', 'jobInterviews.jobApplication'));
        // Load the related models: jobPosting (one-to-one), jobPostings (many-to-many or different relationship), jobInterviews (one-to-many or another relationship)
        return inertia(
            'HRM/RecruitmentManagements/JobApplications/Show',
            [
                'jobApplication' => $jobApplication->load('jobPosting', 'jobPostings', 'jobInterviews.jobApplication')
            ]
        );
    }
}