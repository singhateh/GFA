import React from "react";

export default function AssetTable({ assets, onEdit, onDelete, onBorrow }) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <table className="w-full border-collapse table-auto">
                <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">SN</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Type</th>
                        <th className="py-3 px-4 text-left">In Stock</th>
                        <th className="py-3 px-4 text-left">In Used</th>
                        <th className="py-3 px-4 text-left">Date Procured</th>
                        <th className="py-3 px-4 text-left">Condition</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset) => (
                        <tr key={asset.id} className="border-b hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                            <td className="py-3 px-4">{asset.serial_no}</td>
                            <td className="py-3 px-4">{asset.name}</td>
                            <td className="py-3 px-4">{asset.asset_type.name}</td>
                            <td className="py-3 px-4">{asset.quantity_in_stock}</td>
                            <td className="py-3 px-4">{asset.quantity_in_use}</td>
                            <td className="py-3 px-4">{asset.date_procured}</td>
                            <td className="py-3 px-4">{asset.condition}</td>
                            <td className="py-3 px-4">{asset.status}</td>
                            <td className="py-3 px-4">

                                <button onClick={() => onBorrow(asset)} className="px-3 py-1 bg-blue-500 text-white rounded mr-2"> Borrow</button>
                                <button onClick={() => onEdit(asset)} className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"> Edit</button>
                                <button onClick={() => onDelete(asset.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
