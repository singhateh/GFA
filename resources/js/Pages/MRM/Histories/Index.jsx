import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import NotImplemented from '@/Components/NotImplemented';

const HistoryIndex = ({ recruitments }) => {

    const [interviews, setInterviews] = useState(recruitments);


    return (
        <AuthenticatedLayout>
            <Head title="Health History" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Health History</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            View health records and past treatments.
                        </p>
                    </div>
                    <Link
                        href={route('medical')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to Medical
                    </Link>
                </div>
                <NotImplemented />
            </div>
        </AuthenticatedLayout>
    );
};

export default HistoryIndex;
