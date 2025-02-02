import React, { useEffect, useState, useRef } from "react";

const MissionTypeForm = ({ data, setData, handleSubmit, errors, processing }) => {


    return (
        <form onSubmit={handleSubmit} className="p-6 transition bg-white dark:bg-gray-800 dark:text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div className="mb-2 col-span-2">
                    <label className="block font-semibold">Name</label>
                    <input
                        type="text"
                        value={data.name || ""}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors?.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Remarks */}
                <div className="mb-2 col-span-2">
                    <label className="block font-semibold">Description</label>
                    <textarea
                        value={data.description || ""}
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        rows="3"
                        placeholder="Enter description"
                    />
                    {errors?.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                {/* Submit Button */}
                <div className="col-span-2">
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-md transition duration-300 bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
                        disabled={processing}
                    >
                        {processing ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default MissionTypeForm;
