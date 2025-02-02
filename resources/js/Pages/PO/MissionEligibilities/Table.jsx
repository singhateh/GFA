import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // Ensure to import the tooltip styles
import { Inertia } from "@inertiajs/inertia"; // Import Inertia.js
import { router } from "@inertiajs/react";

const MissionEligibilityTable = ({ missionEligibilities, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Pagination logic
    const totalPages = Math.ceil(missionEligibilities.length / itemsPerPage);
    const paginatedData = missionEligibilities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Function to format years properly
    const formatYears = (value) => {
        return `${value} year${value !== 1 ? "s" : ""}`;
    };

    // Function to truncate text
    const truncateText = (text, maxLength = 60) => {
        if (!text) return "-";
        const truncated = text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
        return (
            <span data-tip={text} data-for={`tooltip-${text}`}>
                {truncated}
            </span>
        );
    };

    // Function to handle scanning eligible staff for a specific mission
    const handleScanEligibleStaff = (missionId) => {
        // Use Inertia to navigate to the scan eligible staff route
        // Inertia.visit(`/mission-eligibility/scan-eligible-staff/${missionId}`);
        router.get(route('mission_eligibility.scan', missionId));
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100">
                            {["Min Length Of Service", "Min Gap Since Last Deployment", "Description", "Actions"].map((header, index) => (
                                <th key={index} className="py-2 px-4">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((missionEligibility) => (
                            <tr key={missionEligibility.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {formatYears(missionEligibility.min_length_of_service)}
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {formatYears(missionEligibility.min_gap_since_last_deployment)}
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {truncateText(missionEligibility.description)}
                                </td>
                                <td className="py-3 px-4">
                                    <button onClick={() => onEdit(missionEligibility)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600 transition">
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleScanEligibleStaff(missionEligibility.id)}
                                        className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition ml-2"
                                    >
                                        Scan Eligible Staff
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Tooltip Component (placed outside the text element) */}
            <Tooltip id="tooltip" place="top" effect="solid" />

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4">
                    <button
                        className={`px-4 py-2 mx-1 text-sm font-medium rounded-lg ${currentPage === 1
                            ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-400"
                            }`}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className={`px-4 py-2 mx-1 text-sm font-medium rounded-lg ${currentPage === totalPages
                            ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-400"
                            }`}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default MissionEligibilityTable;
