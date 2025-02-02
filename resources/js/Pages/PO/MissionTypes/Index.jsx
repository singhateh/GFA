import React, { useState } from "react";
import { usePage, router, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaBookMedical, FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import MissionTypeTable from "./Table";

export default function MissionTypeIndex({ missionTypes }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Ensure missionTypes is always an array
    const safeMedicalRecords = Array.isArray(missionTypes) ? missionTypes : [];

    // Handle Search Filtering
    const filteredMedicalRecords = safeMedicalRecords.filter((missionType) => {
        const staffName = missionType?.staff_member?.name?.toLowerCase() || "";
        const missionTypeType = missionType?.type?.toLowerCase() || "";

        return (
            staffName.includes(searchTerm.toLowerCase()) ||
            missionTypeType.includes(searchTerm.toLowerCase())
        );
    });

    const handleEdit = (missionType) => {
        router.get(route('mission_types.edit', missionType));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this missionType record?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router
                    .delete(route('mission_types.destroy', { id }))
                    .then(() => {
                        // Show success toast only after successful deletion
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'The missionType record has been deleted.',
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                        });
                    })
                    .catch((error) => {
                        // Handle error case
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to delete the missionType record. Please try again.',
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                        });
                        console.error("Delete failed:", error);
                    });
            }
        });
    };


    return (
        <AuthenticatedLayout>
            <Head title="Mission Types" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mission Types</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Manage medical missionTypes for staff.
                        </p>
                    </div>
                    <Link
                        href={route('peacekeeping')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to Peacekeeping
                    </Link>
                </div>

                {/* Filters & Add Button - Flex Container */}
                <div className="flex justify-between items-center mb-4">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search by staff or missionType..."
                        className="border border-gray-300 rounded-lg px-4 py-2 w-72 dark:bg-gray-700 dark:text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Add Staff Button */}
                    <Link
                        href={route('mission_types.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                        <FaBookMedical /> Add New Mission Type
                    </Link>
                </div>

                {/* Table with Filtered Data */}
                <MissionTypeTable
                    missionTypes={filteredMedicalRecords}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </AuthenticatedLayout>
    );
}
