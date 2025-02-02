import React, { useState } from "react";

const MissionTable = ({ missions, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    console.log(missions);


    // Pagination logic
    const totalPages = Math.ceil(missions.length / itemsPerPage);
    const paginatedData = missions.slice(
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
            Active: "bg-green-500",
            Completed: "bg-blue-500",
            OnHold: "bg-red-500",
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
                            {["Mission Name", "Mission Type", "Mission Sponsor", "Start Date", "End Date", "Country", "Status", "Actions"].map((header, index) => (
                                <th key={index} className="py-2 px-4">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((mission) => (
                            <tr key={mission.id} className="border-t border-gray-200 dark:border-gray-700">
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {truncateText(mission.name)}
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {mission.mission_type?.name}
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {mission.sponsor?.name}
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {mission.start_date}
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {truncateText(mission.end_date)}
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {truncateText(mission.country)}
                                </td>
                                <td className="py-2 px-4">{renderStatusBadge(mission.status)}</td>

                                <td className="py-3 px-4">
                                    <button onClick={() => onEdit(mission)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600 transition">
                                        Edit
                                    </button>
                                    <button onClick={() => onDelete(mission.id)}
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

export default MissionTable;
