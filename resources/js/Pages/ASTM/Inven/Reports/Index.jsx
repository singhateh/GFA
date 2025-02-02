import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import NotImplemented from '@/Components/NotImplemented';

const ReportIndex = ({ recruitments }) => {

    return (
        <AuthenticatedLayout>
            <Head title="Usage & Performance Reports" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Usage & Performance Reports</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Generate reports on asset usage, depreciation, and operational efficiency.
                        </p>
                    </div>
                    <Link
                        href={route('asset-management')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to ASSET
                    </Link>
                </div>
                <NotImplemented />
            </div>
        </AuthenticatedLayout>
    );
};

export default ReportIndex;
