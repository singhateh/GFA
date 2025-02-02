import React, { useState } from "react";

const MissionSponsorTable = ({ missionSponsors, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Pagination logic
    const totalPages = Math.ceil(missionSponsors.length / itemsPerPage);
    const paginatedData = missionSponsors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Function to truncate text
    const truncateText = (text, maxLength = 20) => {
        if (!text) return "-";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    // Function to render status badge
    const renderStatusBadge = (status) => {
        const statusColors = {
            Pending: "bg-yellow-500",
            Approved: "bg-green-500",
            Rejected: "bg-red-500",
        };
        return (
            <span className={`px-3 py-1 text-white rounded ${statusColors[status] || "bg-gray-500"}`}>
                {status}
            </span>
        );
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100">
                            {["Name", "Contact Info", 'Status', "Remarks", "Actions"].map((header, index) => (
                                <th key={index} className="py-2 px-4">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((missionSponsor) => (
                            <tr key={missionSponsor.id} className="border-t border-gray-200 dark:border-gray-700">
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {truncateText(missionSponsor?.name)}
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {truncateText(missionSponsor.contact_info)}
                                </td>
                                <td className="py-2 px-4">{renderStatusBadge(missionSponsor.status)}</td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {truncateText(missionSponsor.remarks)}
                                </td>
                                <td className="py-3 px-4">
                                    <button onClick={() => onEdit(missionSponsor)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600 transition">
                                        Edit
                                    </button>
                                    <button onClick={() => onDelete(missionSponsor.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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

export default MissionSponsorTable;
