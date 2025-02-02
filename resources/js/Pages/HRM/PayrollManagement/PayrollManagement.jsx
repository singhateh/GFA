import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaMoneyBill } from 'react-icons/fa';

export default function PayrollManagement({ payrolls }) {
    return (
        <AuthenticatedLayout>
            <Head title="Payroll & Compensation" />
            <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Payroll & Compensation</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Manage employee salaries, bonuses, and tax deductions.
                </p>

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                                <th className="py-3 px-4 text-left">Employee</th>
                                <th className="py-3 px-4 text-left">Salary</th>
                                <th className="py-3 px-4 text-left">Bonus</th>
                                <th className="py-3 px-4 text-left">Deductions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payrolls.length > 0 ? (
                                payrolls.map((pay) => (
                                    <tr key={pay.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <td className="py-3 px-4">{pay.employee_name}</td>
                                        <td className="py-3 px-4">${pay.salary}</td>
                                        <td className="py-3 px-4">${pay.bonus}</td>
                                        <td className="py-3 px-4">${pay.deductions}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500 dark:text-gray-400">
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
