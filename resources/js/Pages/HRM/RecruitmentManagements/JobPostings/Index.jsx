import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaUserPlus } from 'react-icons/fa';

const JobPostingsIndex = ({ jobPostings }) => {
    return (

        <AuthenticatedLayout>
            <Head title="Job Postings" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Job Postings</h1>
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
                            placeholder="Search staff..."
                            className="border border-gray-300 rounded-lg px-4 py-2 w-72 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Add Staff Button (Right) */}
                    <Link
                        href={route('recruitment.jobPostings.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                        <FaUserPlus />  Create Job Posting
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    <table className="w-full border-collapse table-auto">
                        <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Title</th>
                                <th className="py-3 px-4 text-left">Location</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobPostings.length > 0 ? (jobPostings.map((posting) => (
                                <tr key={posting.id} className="border-b hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    <td className="py-3 px-4">{posting.title}</td>
                                    <td className="py-3 px-4">{posting.location}</td>
                                    <td className="py-3 px-4">{posting.status}</td>
                                    <td className="py-3 px-4">
                                        <Link href={`/recruitment/job-postings/${posting.id}`} className="btn btn-info">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                                        No Job Posting found.
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

export default JobPostingsIndex;
