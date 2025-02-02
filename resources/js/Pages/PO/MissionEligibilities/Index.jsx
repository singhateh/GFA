import React, { useState } from "react";
import { usePage, router, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaBookMedical, FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import MissionEligibilityTable from "./Table";

export default function MissionEligibilityIndex({ missionEligibilities }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Ensure missionEligibilities is always an array
    const safeMissionEligibilities = Array.isArray(missionEligibilities) ? missionEligibilities : [];

    // Handle Search Filtering
    const filteredMissionEligibilities = safeMissionEligibilities.filter((missionEligibility) => {
        const staffName = missionEligibility?.staff_member?.name?.toLowerCase() || "";
        const missionEligibilityType = missionEligibility?.type?.toLowerCase() || "";

        return (
            staffName.includes(searchTerm.toLowerCase()) ||
            missionEligibilityType.includes(searchTerm.toLowerCase())
        );
    });

    const handleEdit = (missionEligibility) => {
        router.get(route('mission_eligibility.edit', missionEligibility));
    };


    return (
        <AuthenticatedLayout>
            <Head title="Mission Eligibility Management" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mission Eligibility Management</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Manage medical missionEligibilities for staff.
                        </p>
                    </div>
                    <Link
                        href={route('peacekeeping')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to Peacekeeping
                    </Link>
                </div>


                {/* Table with Filtered Data */}
                <MissionEligibilityTable
                    missionEligibilities={filteredMissionEligibilities}
                    onEdit={handleEdit}
                />
            </div>
        </AuthenticatedLayout>
    );
}
