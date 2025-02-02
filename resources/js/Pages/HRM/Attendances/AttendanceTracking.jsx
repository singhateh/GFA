import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function AttendanceTracking({ attendanceRecords }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredRecords = attendanceRecords?.filter((record) =>
        record?.staff_member.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log(filteredRecords);


    return (
        <AuthenticatedLayout>
            <Head title="Attendance & Time Tracking" />
            <div className="p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Attendance & Time Tracking</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Track staff working hours, overtime, and attendance records.
                        </p>
                    </div>
                    <Link
                        href={route('hr-management')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to HRM
                    </Link>
                </div>

                {/* Buttons Section */}
                <div className="flex justify-between items-center">

                    {/* Search Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by attendance..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-72 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <Link
                        href={route('attendance.create')} // Change route based on your setup
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                        + Add Attendance
                    </Link>
                </div>

                {/* Attendance Table */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                                <th className="py-3 px-4 text-left">Staff</th>
                                <th className="py-3 px-4 text-left">Date</th>
                                <th className="py-3 px-4 text-left">Check-in</th>
                                <th className="py-3 px-4 text-left">Check-out</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.length > 0 ? (
                                filteredRecords.map((record) => (
                                    <tr key={record.id} className="border-b hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                        <td className="py-3 px-4">{record?.staff_member.name}</td>
                                        <td className="py-3 px-4">{record?.date}</td>
                                        <td className="py-3 px-4">{record?.check_in}</td>
                                        <td className="py-3 px-4">{record?.check_out}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500 dark:text-gray-400">
                                        No attendance records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
