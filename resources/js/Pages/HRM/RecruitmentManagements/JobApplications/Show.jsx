import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Import the layout
import { Head, Link } from '@inertiajs/react';

const JobPostingsShow = ({ jobApplication }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Job Application View" />

            <div className="p-6">
                {/* Back Button */}
                <div className="mb-4 flex justify-between  items-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Job Application View</h1>
                    <Link
                        href={route('recruitment.jobApplications.index')}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        &larr; Back to Job Application
                    </Link>
                </div>


                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{jobApplication.candidate_name}</h1>
                    <p className="mt-4 text-gray-800 dark:text-white"><strong>Email:</strong> {jobApplication.email}</p>
                    <p className="mt-4 text-gray-800 dark:text-white"><strong>Status:</strong> {jobApplication.status}</p>
                    <p className="mt-4 text-gray-800 dark:text-white"><strong>Resume:</strong> <a target='_blank' href={jobApplication.resume}>View Resume</a></p>

                    {/* Apply Button */}
                    <div className="mt-6">
                        <Link
                            href={route("recruitment.interviews.schedule", jobApplication)}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            {jobApplication.status == 'Interview Scheduled' ? 'Re-Schedule an Interview' : 'Schedule an Interview'}

                        </Link>
                    </div>

                    {/* Job Applications Table */}
                    <h3 className="mt-8 text-xl font-semibold text-gray-800 dark:text-white">Job Applications</h3>
                    <table className="min-w-full mt-4 table-auto border-collapse">
                        <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                            <tr className="border-b">
                                <th className="py-2 px-4 text-left">Candidate Name</th>
                                <th className="py-2 px-4 text-left">Scheduled At</th>
                                <th className="py-2 px-4 text-left">Interview Type</th>
                                <th className="py-2 px-4 text-left">Status</th>
                                {/* <th className="py-2 px-4 text-left">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {jobApplication.job_interviews?.map((interview) => (
                                <tr key={interview.id} className="border-b hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    <td className="py-2 px-4">{interview.job_application.candidate_name}</td>
                                    <td className="py-2 px-4">{interview.scheduled_at}</td>
                                    <td className="py-2 px-4">{interview.interview_type}</td>
                                    <td className="py-2 px-4">{interview.status}</td>
                                    {/* <td className="py-2 px-4">
                                        <Link
                                            href={`/recruitment/job-applications/${interview.id}`}
                                            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                                        >
                                            View Application
                                        </Link>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default JobPostingsShow;
