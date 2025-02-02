import React, { useState } from "react";
import { usePage, router, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaUserPlus } from "react-icons/fa";
import TrainingStaffAssociationTable from "./Table";

export default function TrainingStaffAssociationIndex({ associations }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Handle Search Filtering
    const filteredPerformances = associations.filter((performance) => {
        const staffName = performance?.staff_member?.name?.toLowerCase() || "";
        const courseName = performance?.training_course?.name?.toLowerCase() || "";

        return (
            staffName.includes(searchTerm.toLowerCase()) ||
            courseName.includes(searchTerm.toLowerCase())
        );
    });

    const handleEdit = (trainingPerformanceTracking) => {
        router.get(route('training.staff-associations.edit', trainingPerformanceTracking));
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this trainingPerformanceTracking?")) {
            router.delete(route('training.staff-associations.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manage Training Staff Association" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Training Staff Association</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Browse and manage training staff associations.
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
                        href={route('training.staff-associations.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                        <FaUserPlus /> Add New Staff Association
                    </Link>
                </div>

                {/* Table with Filtered Data */}
                <TrainingStaffAssociationTable
                    associations={filteredPerformances}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </AuthenticatedLayout>
    );
}
