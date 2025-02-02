import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaUsers, FaBoxOpen, FaGraduationCap, FaHeartbeat, FaGlobe } from 'react-icons/fa';

export default function Dashboard() {
    const dashboardItems = [
        {
            title: "Human Resources Management",
            icon: <FaUsers className="text-blue-600 text-4xl" />,
            description: "Manage personnel records, ranks, and assignments.",
            route: route('hr-management')
        },
        {
            title: "Asset Management",
            icon: <FaBoxOpen className="text-green-600 text-4xl" />,
            description: "Track and manage military assets and logistics.",
            route: route('asset-management')
        },
        {
            title: "Personnel Training",
            icon: <FaGraduationCap className="text-yellow-600 text-4xl" />,
            description: "Monitor training programs and performance.",
            route: route('training')
        },
        {
            title: "Medical Records",
            icon: <FaHeartbeat className="text-red-600 text-4xl" />,
            description: "Manage medical checkups and health records.",
            route: route('medical')
        },
        {
            title: "Peacekeeping Operations",
            icon: <FaGlobe className="text-purple-600 text-4xl" />,
            description: "Track peacekeeping missions and assignments.",
            route: route('peacekeeping')
        }
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dashboardItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.route}
                            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex items-center gap-4 transition transform hover:scale-105 hover:shadow-xl"
                        >
                            {item.icon}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
