import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Swal from 'sweetalert2'; // Import SweetAlert for confirmation
import axios from 'axios';
import NotImplemented from '@/Components/NotImplemented';

const LeaveAndVacationManagementIndex = ({ recruitments }) => {

    const [interviews, setInterviews] = useState(recruitments);


    return (
        <AuthenticatedLayout>
            <Head title="Leave & Vacation Management" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Leave & Vacation Management</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Approve and track employee leave requests and vacation days.
                        </p>
                    </div>
                    <Link
                        href={route('hr-management')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to HRM
                    </Link>
                </div>
                <NotImplemented />
            </div>
        </AuthenticatedLayout>
    );
};

export default LeaveAndVacationManagementIndex;
