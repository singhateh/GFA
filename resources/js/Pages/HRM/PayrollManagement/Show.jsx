import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show() {
    const { payroll } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title={`Payroll Details - ${payroll?.staff_member_name || "N/A"}`} />

            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    Payroll Details
                </h1>

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <div className="space-y-3">
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            <strong>Staff Member:</strong> {payroll?.staff_member_name || "N/A"}
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            <strong>Salary:</strong> ${Number(payroll?.salary).toFixed(2)}
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            <strong>Payment Date:</strong> {payroll?.payment_date || "Not Set"}
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            <strong>Status:</strong> {payroll?.status || "Unknown"}
                        </p>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <Link
                            href={route("payroll.index")}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                        >
                            ← Back to Payroll List
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
