import React from "react";

export default function AssignAssetTable({ assignments, onEdit, onDelete }) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <table className="w-full border-collapse table-auto">
                <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Asset</th>
                        <th className="py-3 px-4 text-left">Assigned To</th>
                        <th className="py-3 px-4 text-left">Quantity</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Return Date</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.length > 0 ? (assignments.map((assign) => (
                        <tr key={assign.id} className="border-b hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                            <td className="py-3 px-4">{assign.asset.name}</td>
                            <td className="py-3 px-4">{assign.assigned_to_display}</td>
                            <td className="py-3 px-4">{assign.quantity_assigned}</td>
                            <td className="py-3 px-4">{assign.status}</td>
                            <td className="py-3 px-4">{assign.return_date || "N/A"}</td>
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
