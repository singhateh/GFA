import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaUsers, FaClock, FaMoneyBill, FaUserTie, FaChartLine, FaUserGraduate, FaPlane } from 'react-icons/fa';

export default function HRManagement() {
    const hrSections = [
        {
            title: "Staff Directory",
            icon: <FaUsers className="text-blue-600 text-5xl" />,
            description: "View and manage all staff, their details, and contact information.",
            route: route('staff.index'),
        },
        {
            title: "Attendance & Time Tracking",
            icon: <FaClock className="text-yellow-500 text-5xl" />,
            description: "Track employee working hours, overtime, and attendance records.",
            route: route('attendance.index'),
        },
        {
            title: "Payroll & Compensation",
            icon: <FaMoneyBill className="text-green-500 text-5xl" />,
            description: "Manage employee salaries, bonuses, and tax deductions.",
            route: route('payroll.index'),
        },
        {
            title: "Recruitment & Hiring",
            icon: <FaUserTie className="text-purple-500 text-5xl" />,
            description: "Handle job postings, applications, and candidate interviews.",
            route: route('recruitment.index'),
        },
        {
            title: "Performance Reviews",
            icon: <FaChartLine className="text-red-500 text-5xl" />,
            description: "Evaluate employee performance and track key metrics.",
            route: route('performanceIndex.index'),
        },
        {
            title: "Training & Development",
            icon: <FaUserGraduate className="text-indigo-500 text-5xl" />,
            description: "Organize training programs and skill development sessions.",
            route: route('trainings.index'),
        },
        {
            title: "Leave & Vacation Management",
            icon: <FaPlane className="text-orange-500 text-5xl" />,
            description: "Approve and track employee leave requests and vacation days.",
            route: route('leave.index'),
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Human Resources Management" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Human Resources Management</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            Manage personnel records, ranks, payroll, attendance, hiring, and performance reviews.
                        </p>
                    </div>

                    <Link
                        href={route('dashboard')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to Dashboard
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
