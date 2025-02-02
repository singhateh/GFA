import React, { useState } from "react";
import { usePage, router, Head, Link } from "@inertiajs/react";
import AssignAssetForm from "./AssignAssetForm";
import AssignAssetTable from "./AssignAssetTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaUserPlus } from "react-icons/fa";

export default function AssignAssetIndex() {
    const { assignments, assets, staffMembers, units } = usePage().props;

    const handleEdit = (assignment) => {
        router.get(route('assignments.edit', assignment));
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this assignment?")) {
            router.delete(route('assignments.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manage Assigned Assets" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Assigned Assets</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Approve and track employee leave requests and vacation days.
                        </p>
                    </div>
                    <Link
                        href={route('asset-management')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to ASSET
                    </Link>
                </div>

                {/* Filters & Add Button - Flex Container */}
                <div className="flex justify-between items-center mb-4">
                    {/* Filters (Left) */}
                    <div>
                        <input
                            type="text"
                            placeholder="Search staff..."
                            className="border border-gray-300 rounded-lg px-4 py-2 w-72 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Add Staff Button (Right) */}
                    <Link
                        href={route('assignments.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                        <FaUserPlus /> Assign New Asset
                    </Link>
                </div>
                <AssignAssetTable assignments={assignments} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </AuthenticatedLayout>
    );
}
