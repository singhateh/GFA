import React, { useState, useEffect } from "react";

export default function TrainingCourseForm({ trainingCourse, data, setData, handleSubmit, errors }) {

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4 mt-3">

                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Course Name:</label>
                    <input type="text" name="name" value={data.name} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" min="1" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Type:</label>
                    <select name="type" value={data.type} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white">
                        <option value="Civilian">Civilian</option>
                        <option value="Military">Military</option>
                    </select>
                    {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                </div>

                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Status:</label>
                    <select name="status" value={data.status} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                </div>


                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Description:</label>
                    <input type="text" name="description" value={data.description} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" />
                </div>
            </div>

            <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                {trainingCourse ? "Update Course" : "Create Course"}
            </button>
        </form>
    );
}
