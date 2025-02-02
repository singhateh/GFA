import React, { useState } from "react";

const MedicalCheckupTable = ({ medicalCheckups, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Pagination logic
    const totalPages = Math.ceil(medicalCheckups.length / itemsPerPage);
    const paginatedData = medicalCheckups.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-gray-100">
                            <th className="py-2 px-4">Staff Member</th>
                            <th className="py-2 px-4">Doctor</th>
                            <th className="py-2 px-4">Result</th>
                            <th className="py-2 px-4">Checkup Date</th>
                            <th className="py-2 px-4">Schedule Date</th>
                            <th className="py-2 px-4">Created Date</th>
                            <th className="py-2 px-4">Notes</th>
                            <th className="py-2 px-4">Is Medical Cleared</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((medicalCheckup) => (
                            <tr key={medicalCheckup.id} className="border-t border-gray-200 dark:border-gray-700">
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {medicalCheckup.staff_member?.name}
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {medicalCheckup.doctor?.name}
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {medicalCheckup.result}
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {new Date(medicalCheckup.checkup_date).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {new Date(medicalCheckup.schedule_date).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {new Date(medicalCheckup.created_at).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {medicalCheckup.notes}
                                </td>
                                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                                    {medicalCheckup.is_medical_cleared == true ? 'Yes' : 'No'}
                                </td>
                                <td className="py-3 px-4 flex gap-2">
                                    <button
                                        onClick={() => onEdit(medicalCheckup)}
                                        className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(medicalCheckup.id)}
                                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition">
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
                            : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
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
                            : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
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

export default MedicalCheckupTable;
