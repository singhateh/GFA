import React, { useState } from "react";
import { usePage, router, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaBookMedical, FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import MedicalClearanceTable from "./Table";

export default function MedicalClearanceIndex({ clearances }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Ensure clearances is always an array
    const safeMedicalRecords = Array.isArray(clearances) ? clearances : [];

    // Handle Search Filtering
    const filteredMedicalRecords = safeMedicalRecords.filter((clearance) => {
        const staffName = clearance?.staff_member?.name?.toLowerCase() || "";
        const clearanceType = clearance?.type?.toLowerCase() || "";

        return (
            staffName.includes(searchTerm.toLowerCase()) ||
            clearanceType.includes(searchTerm.toLowerCase())
        );
    });

    const handleEdit = (clearance) => {
        router.get(route('clearances.edit', clearance));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this clearance record?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router
                    .delete(route('clearances.destroy', { id }))
                    .then(() => {
                        // Show success toast only after successful deletion
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'The clearance record has been deleted.',
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
                            text: 'Failed to delete the clearance record. Please try again.',
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
            <Head title="Clearance Management" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Clearance Management</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Manage medical clearances for staff.
                        </p>
                    </div>
                    <Link
                        href={route('medical')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to Medical
                    </Link>
                </div>

                {/* Filters & Add Button - Flex Container */}
                <div className="flex justify-between items-center mb-4">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search by staff or clearance..."
                        className="border border-gray-300 rounded-lg px-4 py-2 w-72 dark:bg-gray-700 dark:text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Add Staff Button */}
                    <Link
                        href={route('clearances.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                        <FaBookMedical /> Add New Clearance
                    </Link>
                </div>

                {/* Table with Filtered Data */}
                <MedicalClearanceTable
                    clearances={filteredMedicalRecords}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </AuthenticatedLayout>
    );
}
