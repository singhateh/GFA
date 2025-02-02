import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaUsers, FaClipboardList, FaCalendarAlt } from 'react-icons/fa';

export default function RecruitmentManagement() {
    const hrSections = [
        {
            title: "Job Postings",
            icon: <FaClipboardList className="text-blue-600 text-5xl" />,
            description: "Handle job postings, create and manage available positions.",
            route: route('recruitment.jobPostings.index'),
        },
        {
            title: "Job Applications",
            icon: <FaUsers className="text-yellow-500 text-5xl" />,
            description: "Track and manage job applications from candidates.",
            route: route('recruitment.jobApplications.index'),
        },
        {
            title: "Interviews",
            icon: <FaCalendarAlt className="text-green-500 text-5xl" />,
            description: "Schedule and manage candidate interviews for selected positions.",
            route: route('recruitment.interviews.index'),
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Recruitment & Hiring" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Recruitment & Hiring</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            Handle job postings, applications, and candidate interviews.
                        </p>
                    </div>
                    <Link
                        href={route('hr-management')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to HRM
                    </Link>

                </div>
                {/* HR Sections Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hrSections.map((section, index) => (
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
