import React, { useState } from "react";
import { usePage, router, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaBookMedical } from "react-icons/fa";
import MedicalCheckupTable from "./Table";
import Swal from "sweetalert2";

export default function MedicalCheckupIndex({ medicalCheckups }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Ensure medicalCheckups is always an array
    const safeMedicalCheckups = Array.isArray(medicalCheckups) ? medicalCheckups : [];

    // Handle Search Filtering
    const filteredMedicalCheckups = safeMedicalCheckups.filter((medicalCheckup) => {
        const staffName = medicalCheckup?.staff_member?.name?.toLowerCase() || "";
        const courseName = medicalCheckup?.training_course?.name?.toLowerCase() || "";

        return (
            staffName.includes(searchTerm.toLowerCase()) ||
            courseName.includes(searchTerm.toLowerCase())
        );
    });

    const handleEdit = (trainingPerformanceTracking) => {
        router.get(route('medical-checkups.edit', trainingPerformanceTracking));
    };


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this medical checkup?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('medical-checkups.destroy', id));

                // Show success toast
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'The medical checkup has been deleted.',
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
            <Head title="Manage Medical Checkups" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Medical Checkups</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Schedule and track medical checkups.
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
                        href={route('medical-checkups.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                        <FaBookMedical /> Add New Medical Checkup
                    </Link>
                </div>

                {/* Table with Filtered Data */}
                <MedicalCheckupTable
                    medicalCheckups={filteredMedicalCheckups}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </AuthenticatedLayout>
    );
}
