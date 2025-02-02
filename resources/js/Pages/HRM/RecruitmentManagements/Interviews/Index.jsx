import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Swal from 'sweetalert2'; // Import SweetAlert for confirmation
import axios from 'axios';

const JobApplicationsIndex = ({ jobInterviews }) => {

    const [interviews, setInterviews] = useState(jobInterviews);

    const handleDelete = (interviewId) => {
        // Show confirmation dialog before proceeding with deletion
        Swal.fire({
            title: 'Are you sure?',
            text: 'This interview record will be permanently deleted.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // If confirmed, proceed to delete
                axios.delete(route('recruitment.interviews.destroy', interviewId))
                    .then((response) => {
                        // Step 3: Remove the deleted interview from the interviews state
                        setInterviews(interviews.filter(interview => interview.id !== interviewId));

                        Swal.fire(
                            'Deleted!',
                            'The interview record has been deleted.',
                            'success'
                        );
                    })
                    .catch((error) => {
                        Swal.fire(
                            'Error!',
                            'There was an error deleting the interview record.',
                            'error'
                        );
                        console.error(error); // Log the error for debugging purposes
                    });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Job Interviews" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Job Interviews</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            View and manage all interviews, their details, and contact information.
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
                            placeholder="Search interview..."
                            className="border border-gray-300 rounded-lg px-4 py-2 w-72 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    <table className="w-full border-collapse table-auto">
                        <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                            <tr>
                                <th className="py-2 px-4 text-left">Posting</th>
                                <th className="py-2 px-4 text-left">Candidate Name</th>
                                <th className="py-2 px-4 text-left">Scheduled At</th>
                                <th className="py-2 px-4 text-left">Interview Type</th>
                                <th className="py-2 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interviews.length > 0 ? (
                                interviews.map((interview) => (
                                    <tr key={interview.id} className="border-b hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                        <td className="py-2 px-4">{interview.job_application?.job_posting?.title}</td>
                                        <td className="py-2 px-4">{interview.job_application.candidate_name}</td>
                                        <td className="py-2 px-4">{interview.scheduled_at}</td>
                                        <td className="py-2 px-4">{interview.interview_type}</td>
                                        <td className="py-2 px-4">{interview.status}</td>
                                        <td className="py-2 px-4">
                                            <button
                                                onClick={() => handleDelete(interview.id)} // Handle delete button click
                                                className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                                        No Job Application Interviews found.
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
