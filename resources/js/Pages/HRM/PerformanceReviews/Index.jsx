import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Swal from 'sweetalert2'; // Import SweetAlert for confirmation
import axios from 'axios';
import NotImplemented from '@/Components/NotImplemented';

const PerformanceReviewIndex = ({ recruitments }) => {

    const [interviews, setInterviews] = useState(recruitments);


    return (
        <AuthenticatedLayout>
            <Head title="Performance Reviews" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Performance Reviews</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Evaluate employee performance and track key metrics.
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

export default PerformanceReviewIndex;
