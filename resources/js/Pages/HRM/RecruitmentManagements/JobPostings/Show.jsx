import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Import the layout
import { Head, Link } from '@inertiajs/react';

const JobPostingsShow = ({ jobPosting }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Job Posting View" />

            <div className="p-6">
                {/* Back Button */}
                <div className="mb-4 flex justify-between  items-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Job Posting View</h1>
                    <Link
                        href={route('recruitment.jobPostings.index')}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        &larr; Back to Job Postings
                    </Link>
                </div>


                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{jobPosting.title}</h1>
                    <p className="mt-4 text-gray-800 dark:text-white"><strong>Location:</strong> {jobPosting.location}</p>
                    <p className="mt-4 text-gray-800 dark:text-white"><strong>Status:</strong> {jobPosting.status}</p>
                    <p className="mt-4 text-gray-800 dark:text-white"><strong>Description:</strong> {jobPosting.description}</p>
                    <p className="mt-4 text-gray-800 dark:text-white"><strong>Requirements:</strong> {jobPosting.requirements}</p>

                    {/* Apply Button */}
                    <div className="mt-6">
                        <Link
                            href={`/recruitment/job-postings/${jobPosting.id}/apply`}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            Apply Now
                        </Link>
                    </div>

                    {/* Job Applications Table */}
                    <h3 className="mt-8 text-xl font-semibold text-gray-800 dark:text-white">Job Applications</h3>
                    <table className="min-w-full mt-4 table-auto border-collapse">
                        <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                            <tr className="border-b">
                                <th className="py-2 px-4 text-left">Candidate Name</th>
                                <th className="py-2 px-4 text-left">Status</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobPosting.applications.map((application) => (
                                <tr key={application.id} className="border-b hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    <td className="py-2 px-4">{application.candidate_name}</td>
                                    <td className="py-2 px-4">{application.status}</td>
                                    <td className="py-2 px-4">
                                        <Link
                                            href={`/recruitment/job-applications/${application.id}`}
                                            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                                        >
                                            View Application
                                        </Link>
                                    </td>
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
