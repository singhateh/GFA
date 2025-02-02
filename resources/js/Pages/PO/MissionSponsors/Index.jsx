import React, { useState } from "react";
import { usePage, router, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaBookMedical, FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import MissionSponsorTable from "./Table";

export default function MissionSponsorIndex({ missionSponsors }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Ensure missionSponsors is always an array
    const safeMedicalRecords = Array.isArray(missionSponsors) ? missionSponsors : [];

    // Handle Search Filtering
    const filteredMedicalRecords = safeMedicalRecords.filter((missionSponsor) => {
        const staffName = missionSponsor?.staff_member?.name?.toLowerCase() || "";
        const missionSponsorType = missionSponsor?.type?.toLowerCase() || "";

        return (
            staffName.includes(searchTerm.toLowerCase()) ||
            missionSponsorType.includes(searchTerm.toLowerCase())
        );
    });

    const handleEdit = (missionSponsor) => {
        router.get(route('mission_sponsors.edit', missionSponsor));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this missionSponsor record?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router
                    .delete(route('mission_sponsors.destroy', { id }))
                    .then(() => {
                        // Show success toast only after successful deletion
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'The missionSponsor record has been deleted.',
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
                            text: 'Failed to delete the missionSponsor record. Please try again.',
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
            <Head title="Mision Sponsors" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mision Sponsors</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Explore mission sponsors involved in peacekeeping operations.
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
                        placeholder="Search by staff or missionSponsor..."
                        className="border border-gray-300 rounded-lg px-4 py-2 w-72 dark:bg-gray-700 dark:text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Add Staff Button */}
                    <Link
                        href={route('mission_sponsors.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                        <FaBookMedical /> Add New Clearance
                    </Link>
                </div>

                {/* Table with Filtered Data */}
                <MissionSponsorTable
                    missionSponsors={filteredMedicalRecords}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </AuthenticatedLayout>
    );
}
