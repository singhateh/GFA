import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

export default function AssignAssetForm({ assetAssignment, data, setData, assets, asset, users, units, errors }) {
    const [assignType, setAssignType] = useState("Staff");

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleAssignTypeChange = (e) => {
        setAssignType(e.target.value);
        setData("assigned_to_type", e.target.value === "Staff" ? "App\\Models\\StaffMember" : "App\\Models\\Unit");
        setData("assigned_to_id", ""); // Reset selection
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (assetAssignment) {
            router.put(route("assignments.update", assetAssignment), data, {
            });
        } else {
            router.post(route("assignments.store"), data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Asset:</label>
                    <select name="asset_id" value={data.asset_id} onChange={handleChange} disabled={asset.length !== 0}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white">
                        <option value="">Select Asset</option>
                        {assets.map((asset) => (
                            <option key={asset.id} value={asset.id}>{asset.name}</option>
                        ))}
                    </select>

                    {asset ? (<input type="hidden" name="asset_id" value={data.asset_id} />) : ''}

                    {errors.asset_id && <p className="text-red-500 text-sm">{errors.asset_id}</p>}
                </div>

                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Assign To:</label>
                    <select name="assigned_to_type" value={data.assigned_to_type}
                        onChange={handleAssignTypeChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white">
                        <option value="Staff">Staff</option>
                        <option value="Unit">Unit</option>
                    </select>
                </div>

                {/* Dynamic Selection Based on Assign Type */}
                {assignType === "Staff" ? (
                    <div>
                        <label className="font-medium block text-gray-600 dark:text-gray-300">Select Staff:</label>
                        <select
                            value={data.assigned_to_id}
                            onChange={(e) => handleChange(e)}
                            name="assigned_to_id"
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">Select a staff member</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {errors.assigned_to_id && <p className="text-red-500 text-sm">{errors.assigned_to_id}</p>}
                    </div>
                ) : (
                    <div>
                        <label className="font-medium block text-gray-600 dark:text-gray-300">Select Unit:</label>
                        <select
                            value={data.assigned_to_id}
                            onChange={(e) => handleChange(e)}
                            name="assigned_to_id"
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">Select a unit</option>
                            {units.map((unit) => (
                                <option key={unit.id} value={unit.id}>
                                    {unit.unit_name} - {unit.department}
                                </option>
                            ))}
                        </select>
                        {errors.assigned_to_id && <p className="text-red-500 text-sm">{errors.assigned_to_id}</p>}
                    </div>
                )}

                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Quantity:</label>
                    <input type="number" name="quantity_assigned" value={data.quantity_assigned} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" min="1" />
                    {errors.quantity_assigned && <p className="text-red-500 text-sm">{errors.quantity_assigned}</p>}
                </div>

                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Assigned Date:</label>
                    <input type="date" name="assigned_date" value={data.assigned_date} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" />
                    {errors.assigned_date && <p className="text-red-500 text-sm">{errors.assigned_date}</p>}
                </div>

                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Return Date (Optional):</label>
                    <input type="date" name="return_date" value={data.return_date} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" />
                </div>

                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Status:</label>
                    <select name="status" value={data.status} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white">
                        <option value="Assigned">Assigned</option>
                        <option value="Returned">Returned</option>
                        <option value="Lost">Lost</option>
                        <option value="Damaged">Damaged</option>
                    </select>
                </div>

                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Remarks:</label>
                    <input type="text" name="remarks" value={data.remarks} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" />
                </div>
            </div>

            <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                {assetAssignment ? "Update Assignment" : "Assign Asset"}
            </button>
        </form>
    );
}
