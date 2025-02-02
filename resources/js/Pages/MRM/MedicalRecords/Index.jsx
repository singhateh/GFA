import React, { useState } from "react";
import { usePage, router, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaBookMedical, FaUserPlus } from "react-icons/fa";
import MedicalRecordTable from "./Table";
import Swal from "sweetalert2";

export default function MedicalRecordIndex({ medicalRecords }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Ensure medicalRecords is always an array
    const safeMedicalRecords = Array.isArray(medicalRecords) ? medicalRecords : [];

    // Handle Search Filtering
    const filteredMedicalRecords = safeMedicalRecords.filter((medicalRecord) => {
        const staffName = medicalRecord?.staff_member?.name?.toLowerCase() || "";
        const courseName = medicalRecord?.training_course?.name?.toLowerCase() || "";

        return (
            staffName.includes(searchTerm.toLowerCase()) ||
            courseName.includes(searchTerm.toLowerCase())
        );
    });

    const handleEdit = (medicalRecord) => {
        router.get(route('medical-records.edit', medicalRecord));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this medical record?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('medical-records.destroy', id));

                // Show success toast
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'The medical record has been deleted.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
        });
    };


    return (
        <AuthenticatedLayout>
            <Head title="Manage Medical Records" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Medical Records</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Manage medical records and patient history.
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
                        placeholder="Search by staff or course..."
                        className="border border-gray-300 rounded-lg px-4 py-2 w-72 dark:bg-gray-700 dark:text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Add Staff Button */}
                    <Link
                        href={route('medical-records.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                        <FaBookMedical /> Add New Medical Record
                    </Link>
                </div>

                {/* Table with Filtered Data */}
                <MedicalRecordTable
                    medicalRecords={filteredMedicalRecords}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </AuthenticatedLayout>
    );
}
