import React from "react";

export default function TrainingTable({ trainingCourses, onEdit, onDelete }) {


    const renderStatusBadge = (status) => {
        const statusColors = {
            Pending: "bg-yellow-500",
            Active: "bg-green-500",
            Completed: "bg-blue-500",
            Inactive: "bg-red-500",
        };
        return (
            <span className={`px-3 py-1 text-white rounded ${statusColors[status] || "bg-gray-500"}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <table className="w-full border-collapse table-auto">
                <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Type</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trainingCourses.length > 0 ? (trainingCourses.map((trainingCourse) => (
                        <tr key={trainingCourse.id} className="border-b hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                            <td className="py-3 px-4">{trainingCourse?.name}</td>
                            <td className="py-3 px-4">{trainingCourse.type}</td>
                            <td className="py-2 px-4">{renderStatusBadge(trainingCourse.status)}</td>
                            <td className="py-3 px-4">{trainingCourse.description}</td>
                            <td className="py-3 px-4">
                                <button onClick={() => onEdit(trainingCourse)} className="px-3 py-1 bg-yellow-500 text-white rounded mr-2">Edit</button>
                                <button onClick={() => onDelete(trainingCourse.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                            </td>
                        </tr>
                    )))
                        : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                                    No trainingCourseed records found.
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
}
