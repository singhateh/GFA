import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaUserPlus } from 'react-icons/fa';

const JobApplicationsIndex = ({ jobApplications }) => {
    return (

        <AuthenticatedLayout>
            <Head title="Job Applications" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Job Applications</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            View and manage all staff, their details, and contact information.
                        </p>
                    </div>
                    <Link
                        href={route('recruitment.index')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to Recitment
                    </Link>

                </div>

                {/* Filters & Add Button - Flex Container */}
                <div className="flex justify-between items-center mb-4">
                    {/* Filters (Left) */}
                    <div>
                        <input
                            type="text"
                            placeholder="Search candidate..."
                            className="border border-gray-300 rounded-lg px-4 py-2 w-72 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                </div>

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    <table className="w-full border-collapse table-auto">
                        <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Posting</th>
                                <th className="py-3 px-4 text-left">Candidate Name</th>
                                <th className="py-3 px-4 text-left">Candidate Email</th>
                                <th className="py-3 px-4 text-left">Candidate resume</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobApplications.length > 0 ? (jobApplications.map((application) => (
                                <tr key={application.id} className="border-b hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    <td className="py-3 px-4">{application.jobPosting?.title}</td>
                                    <td className="py-3 px-4">{application.candidate_name}</td>
                                    <td className="py-3 px-4">{application.email}</td>
                                    <td className="py-3 px-4">{application.resume}</td>
                                    <td className="py-3 px-4">{application.status}</td>
                                    <td className="py-3 px-4">
                                        <Link href={route("recruitment.jobApplications.show", application)} className="btn btn-info">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                                        No Job Applications found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default JobApplicationsIndex;
