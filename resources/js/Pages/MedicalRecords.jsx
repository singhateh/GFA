import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaBriefcaseMedical, FaHeartbeat, FaNotesMedical, FaClipboardCheck } from 'react-icons/fa';

export default function MedicalRecords() {
    const medicalSections = [
        {
            title: "Medical Records",
            icon: <FaBriefcaseMedical className="text-blue-600 text-5xl" />,
            description: "Manage medical records and patient history.",
            route: route('medical-records.index'),
        },
        {
            title: "Medical Checkups",
            icon: <FaHeartbeat className="text-red-500 text-5xl" />,
            description: "Schedule and track medical checkups.",
            route: route('medical-checkups.index'),
        },
        {
            title: "Health History",
            icon: <FaNotesMedical className="text-green-500 text-5xl" />,
            description: "View health records and past treatments.",
            route: route('health-history.index'),
        },
        {
            title: "Clearance Management",
            icon: <FaClipboardCheck className="text-purple-600 text-5xl" />,
            description: "Manage medical clearances for staff.",
            route: route('clearances.index'),
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Medical Records Management" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Medical Records Management</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            Manage medical checkups, health history, and patient records.
                        </p>
                    </div>

                    <Link
                        href={route('dashboard')}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>

                {/* Medical Sections Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {medicalSections.map((section, index) => (
                        <Link
                            key={index}
                            href={section.route}
                            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex items-center gap-4 transition transform hover:scale-105 hover:shadow-lg"
                        >
                            {section.icon}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{section.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{section.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
