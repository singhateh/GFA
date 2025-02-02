import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ payrolls = [] }) { // Ensure payrolls is always an array
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPayrolls = payrolls.data.filter((payroll) =>
        payroll?.staff_member_name?.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <Head title="Payroll Records" />
            <div className="p-6">


                {/*   Payroll Records Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Payroll Records
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Manage payroll details such as salary, payment dates, and status.
                        </p>
                    </div>
                    <Link
                        href={route('hr-management')}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to HRM
                    </Link>
                </div>

                {/* Search & Add Attendance Button */}
                <div className="flex justify-between items-center">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by staff name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-72 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <Link
                        href={route('payroll.create')} // Adjust route as necessary
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                        + Add Payroll
                    </Link>
                </div>

                {/* Payroll Table */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    <table className="w-full border-collapse table-auto">
                        <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">ID</th>
                                <th className="py-3 px-4 text-left">Staff Name</th>
                                <th className="py-3 px-4 text-left">Salary</th>
                                <th className="py-3 px-4 text-left">Payment Date</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayrolls.length > 0 ? (
                                filteredPayrolls.map((payroll) => (
                                    <tr key={payroll.id} className="border-b hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                        <td className="py-3 px-4 text-left">{payroll.id}</td>
                                        <td className="py-3 px-4 text-left">{payroll.staff_member_name || 'N/A'}</td>
                                        <td className="py-3 px-4 text-left">${payroll.salary}</td>
                                        <td className="py-3 px-4 text-left">{payroll.payment_date}</td>
                                        <td className="py-3 px-4 text-left">{payroll.status}</td>
                                        <td className="py-3 px-4 text-left">
                                            <Link href={`/payroll/${payroll.id}/edit`} className="px-2 text-blue-600">
                                                Edit
                                            </Link>
                                            <Link href={route("payroll.show", payroll.id)} className="px-2 text-green-600">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                                        No payroll records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
