import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaGlobe, FaShieldAlt, FaUsersCog, FaTasks, FaHandshake, FaCheckCircle } from 'react-icons/fa';

export default function PeacekeepingOperations() {
    const peacekeepingSections = [
        {
            title: "Peacekeeping Overview",
            icon: <FaGlobe className="text-blue-600 text-5xl" />,
            description: "Monitor global peacekeeping missions and deployments.",
            route: route('peacekeeping.index'),
        },

        {
            title: "Mission Types",
            icon: <FaTasks className="text-purple-600 text-5xl" />,
            description: "View and manage different mission types for peacekeeping operations.",
            route: route('mission_types.index'),
        },
        {
            title: "Mission Sponsors",
            icon: <FaHandshake className="text-teal-600 text-5xl" />,
            description: "Explore mission sponsors involved in peacekeeping operations.",
            route: route('mission_sponsors.index'),
        },
        {
            title: "Mission Eligibility",
            icon: <FaCheckCircle className="text-yellow-500 text-5xl" />,
            description: "Manage eligibility criteria for peacekeeping personnel and missions.",
            route: route('mission_eligibility.index'),
        },
        {
            title: "Mission Assignments",
            icon: <FaShieldAlt className="text-green-500 text-5xl" />,
            description: "Manage personnel assignments for peacekeeping missions.",
            route: route('assignments.index'),
        },
        {
            title: "Missions & Reports",
            icon: <FaUsersCog className="text-orange-500 text-5xl" />,
            description: "Track active missions, reports, and strategic operations.",
            route: route('missions.index'),
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Peacekeeping Operations" />
            <div className="p-6">

                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Peacekeeping Operations</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            Track peacekeeping missions, assignments, and operations globally.
                        </p>
                    </div>

                    <Link
                        href={route('dashboard')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>

                {/* Peacekeeping Sections Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {peacekeepingSections.map((section, index) => (
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
