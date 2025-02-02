import React, { useState } from "react";

const MedicalRecordTable = ({ medicalRecords, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Pagination logic
    const totalPages = Math.ceil(medicalRecords.length / itemsPerPage);
    const paginatedData = medicalRecords.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Function to truncate text
    const truncateText = (text, maxLength = 20) => {
        if (!text) return "-";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100">
                            <th className="py-2 px-4">Staff Member</th>
                            <th className="py-2 px-4">Doctor</th>
                            <th className="py-2 px-4">Medical Histories</th>
                            <th className="py-2 px-4">Prescriptions</th>
                            <th className="py-2 px-4">Allergies</th>
                            <th className="py-2 px-4">Notes</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((record) => (
                            <tr key={record.id} className="border-t border-gray-200 dark:border-gray-700">
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100" title={record.staff_member?.name}>{truncateText(record.staff_member?.name)}</td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100" title={record.doctor?.name}>{truncateText(record.doctor?.name)}</td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100" title={record.medical_history}>{truncateText(record.medical_history)}</td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100" title={record.prescriptions}>{truncateText(record.prescriptions)}</td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100" title={record.allergies}>{truncateText(record.allergies)}</td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100" title={record.notes}>{truncateText(record.notes)}</td>
                                <td className="py-3 px-4">
                                    <button onClick={() => onEdit(record)} className="px-3 py-1 bg-yellow-500 text-white rounded mr-2">Edit</button>
                                    <button onClick={() => onDelete(record.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
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

export default MedicalRecordTable;
