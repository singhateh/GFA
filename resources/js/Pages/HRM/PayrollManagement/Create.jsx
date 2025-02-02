import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
    const { staffList } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        staff_member_id: "",
        salary: "",
        payment_date: "",
        status: "pending",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("payroll.store"), {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Payroll created successfully!",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
                reset(); // Clears form after success
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Failed to create payroll!",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            },
        });
    };


    return (
        <AuthenticatedLayout>
            <Head title="Create Payroll" />
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    Create Payroll
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Fill in the payroll details for staff, including salary and payment date.
                </p>

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Staff</label>
                            <select
                                value={data.staff_member_id}
                                onChange={(e) => setData("staff_member_id", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                            >
                                <option value="">Select Staff</option>
                                {staffList.map((staff) => (
                                    <option key={staff.id} value={staff.id}>
                                        {staff.name}
                                    </option>
                                ))}
                            </select>
                            {errors.staff_member_id && (
                                <p className="text-red-500">{errors.staff_member_id}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Salary</label>
                            <input
                                type="number"
                                value={data.salary}
                                onChange={(e) => setData("salary", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                            />
                            {errors.salary && <p className="text-red-500">{errors.salary}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Payment Date</label>
                            <input
                                type="date"
                                value={data.payment_date}
                                onChange={(e) => setData("payment_date", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                            />
                            {errors.payment_date && (
                                <p className="text-red-500">{errors.payment_date}</p>
                            )}
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? "Saving..." : "Save Payroll"}
                            </button>

                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                            >
                                ← Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
