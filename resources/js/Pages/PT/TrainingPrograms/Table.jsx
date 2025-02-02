import React from "react";

export default function TrainingProgramTable({ trainingPrograms, onEdit, onDelete }) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <table className="w-full border-collapse table-auto">
                <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Training Type</th>
                        <th className="py-3 px-4 text-left">Country</th>
                        <th className="py-3 px-4 text-left">Duration</th>
                        <th className="py-3 px-4 text-left">Start Date</th>
                        <th className="py-3 px-4 text-left">End Date</th>
                        <th className="py-3 px-4 text-left">Certificate</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trainingPrograms.length > 0 ? (trainingPrograms.map((assign) => (
                        <tr key={assign.id} className="border-b hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                            <td className="py-3 px-4">{assign.name}</td>
                            <td className="py-3 px-4">{assign.training_type.name}</td>
                            <td className="py-3 px-4">{assign.country.name}</td>
                            <td className="py-3 px-4">{assign.duration}</td>
                            <td className="py-3 px-4">{assign.start_date}</td>
                            <td className="py-3 px-4">{assign.end_date}</td>
                            <td className="py-3 px-4">{assign.certification || "N/A"}</td>
                            <td className="py-3 px-4">
                                <button onClick={() => onEdit(assign)} className="px-3 py-1 bg-yellow-500 text-white rounded mr-2">Edit</button>
                                <button onClick={() => onDelete(assign.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                            </td>
                        </tr>
                    )))
                        : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                                    No assigned records found.
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
}
