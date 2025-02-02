<?php


namespace App\Http\Controllers;

use App\Models\Interview;
use App\Models\JobApplication;
use Illuminate\Http\Request;

class InterviewController extends Controller
{

    public function index()
    {
        $jobInterviews = Interview::with('jobApplication.jobPosting')->get();

        return inertia('HRM/RecruitmentManagements/Interviews/Index', ['jobInterviews' => $jobInterviews]);
    }
    public function schedule(JobApplication $jobApplication)
    {
        return inertia('HRM/RecruitmentManagements/Interviews/Schedule', ['jobApplication' => $jobApplication]);
    }

    public function store(Request $request, JobApplication $jobApplication)
    {
        $request->validate([
            'scheduled_at' => 'required|date',
            'interview_type' => 'required|string',
            'status' => 'required|string',
        ]);

        Interview::create([
            'job_application_id' => $jobApplication->id,
            'scheduled_at' => $request->scheduled_at,
            'interview_type' => $request->interview_type,
            'status' => $request->status,
        ]);

        // Update the job application status to Interview Scheduled
        $jobApplication->update(['status' => 'Interview Scheduled']);

        return redirect()->route('recruitment.jobPostings.show', $jobApplication->jobPosting);
    }

    public function destroy(Interview $interview)
    {
        if (!$interview) {
            // Return an error if not found
            return response()->json(['message' => 'Job interview not found.'], 404);
        }

        // Delete the job interview
        $interview->delete();

        // Return a success response
        return response()->json(['message' => 'Job interview deleted successfully.'], 200);
    }
}