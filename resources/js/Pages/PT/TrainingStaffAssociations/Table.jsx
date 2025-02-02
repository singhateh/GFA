import React, { useState } from "react";

const TrainingStaffAssociationTable = ({ associations, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Pagination logic
    const totalPages = Math.ceil(associations.length / itemsPerPage);
    const paginatedData = associations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    // Function to render status badge
    const renderStatusBadge = (status) => {
        const statusColors = {
            OnGoing: "bg-yellow-500",
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
                            <th className="py-2 px-4">Staff Member</th>
                            <th className="py-2 px-4">Training Course</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((performance) => {
                            return (
                                <tr key={performance.id} className="border-t border-gray-200 dark:border-gray-700">
                                    <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{performance.staff_member.name}</td>
                                    <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{performance.training_course.name}</td>
                                    <td className="py-2 px-4">{renderStatusBadge(performance.status)}</td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => onEdit(performance)} className="px-3 py-1 bg-yellow-500 text-white rounded mr-2">Edit</button>
                                        <button onClick={() => onDelete(performance.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
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

export default TrainingStaffAssociationTable;
