import React, { useState } from "react";
import { usePage, router, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaUserPlus } from "react-icons/fa";
import TrainingPerformanceTable from "./Table";

export default function TrainingPerformanceIndex({ trainingPerformances }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Handle Search Filtering
    const filteredPerformances = trainingPerformances.filter((performance) => {
        const staffName = performance.training_staff_association?.staff_member?.name?.toLowerCase() || "";
        const courseName = performance.training_staff_association?.training_course?.name?.toLowerCase() || "";

        return (
            staffName.includes(searchTerm.toLowerCase()) ||
            courseName.includes(searchTerm.toLowerCase())
        );
    });

    const handleEdit = (trainingPerformanceTracking) => {
        router.get(route('training.performance.edit', trainingPerformanceTracking));
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this trainingPerformanceTracking?")) {
            router.delete(route('assignments.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manage Training Performance Tracking" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Training Performance Tracking</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Approve and track employee leave requests and vacation days.
                        </p>
                    </div>
                    <Link
                        href={route('training')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to Training
                    </Link>
                </div>

                {/* Filters & Add Button - Flex Container */}
                <div className="flex justify-between items-center mb-4">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search by staff or course..."
                        className="border border-gray-300 rounded-lg px-4 py-2 w-72 dark:bg-gray-700 dark:text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Add Staff Button */}
                    <Link
                        href={route('training.performance.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                        <FaUserPlus /> Add New Performance Tracking
                    </Link>
                </div>

                {/* Table with Filtered Data */}
                <TrainingPerformanceTable
                    trainingPerformances={filteredPerformances}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </AuthenticatedLayout>
    );
}
