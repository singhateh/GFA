import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaChalkboardTeacher, FaBook, FaUsers, FaChartLine } from 'react-icons/fa';

export default function PersonnelTraining() {
    const trainingSections = [
        {
            title: "Training Programs",
            icon: <FaChalkboardTeacher className="text-blue-600 text-5xl" />,
            description: "Monitor personnel training programs and schedules.",
            route: route('training.index'),
        },
        {
            title: "Course Catalog",
            icon: <FaBook className="text-green-500 text-5xl" />,
            description: "Browse and manage training courses.",
            route: route('courses.index'),
        },
        {
            title: "Training Staff Association",
            icon: <FaUsers className="text-orange-500 text-5xl" />, // Changed icon to FaUsers
            description: "Browse and manage training staff associations.",
            route: route('staff-associations.index'), // Updated route to staff associations
        },
        {
            title: "Performance Tracking",
            icon: <FaChartLine className="text-red-500 text-5xl" />,
            description: "Track personnel training performance and progress.",
            route: route('performance.index'),
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Personnel Training Management" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Personnel Training Management</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            Monitor training programs, manage courses, and track personnel progress.
                        </p>
                    </div>

                    <Link
                        href={route('dashboard')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>

                {/* Training Sections Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trainingSections.map((section, index) => (
                        <Link
                            key={index}
                            href={section.route}
                            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex items-center gap-4 transition-transform transform hover:scale-105 hover:shadow-xl dark:hover:shadow-lg"
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
