import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaBox, FaTruck, FaWarehouse, FaClipboardList, FaCogs, FaChartBar, FaTools } from 'react-icons/fa';

export default function AssetManagement() {
    const assetSections = [
        {
            title: "Asset Inventory",
            icon: <FaBox className="text-blue-600 text-5xl" />,
            description: "View and manage all military assets including vehicles, weapons, and equipment.",
            route: route('assets.index'),
        },
        {
            title: "Logistics & Supply Chain",
            icon: <FaTruck className="text-yellow-500 text-5xl" />,
            description: "Track asset movement, shipments, and supply logistics.",
            route: route('logistics.index'),
        },
        {
            title: "Storage & Warehousing",
            icon: <FaWarehouse className="text-green-500 text-5xl" />,
            description: "Manage storage locations and warehouse asset distribution.",
            route: route('warehouses.index'),
        },
        {
            title: "Asset Assignments",
            icon: <FaClipboardList className="text-purple-500 text-5xl" />,
            description: "Assign assets to personnel and track their usage history.",
            route: route('assignments.index'),
        },
        {
            title: "Maintenance & Repairs",
            icon: <FaTools className="text-red-500 text-5xl" />,
            description: "Schedule and track maintenance for vehicles, equipment, and infrastructure.",
            route: route('maintenance.index'),
        },
        {
            title: "Usage & Performance Reports",
            icon: <FaChartBar className="text-indigo-500 text-5xl" />,
            description: "Generate reports on asset usage, depreciation, and operational efficiency.",
            route: route('reports.index'),
        },
        {
            title: "Configuration & Settings",
            icon: <FaCogs className="text-orange-500 text-5xl" />,
            description: "Manage asset categories, tracking configurations, and system preferences.",
            route: route('settings.index'),
        },
    ];


    return (
        <AuthenticatedLayout>
            <Head title="Asset Management" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Asset Management</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            Track and manage military assets, logistics, assignments, and maintenance.
                        </p>
                    </div>

                    <Link
                        href={route('dashboard')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>


                {/* Asset Sections Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assetSections.map((section, index) => (
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
