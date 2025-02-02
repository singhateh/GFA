import React, { useEffect, useState, useRef } from "react";

const MissionEligibilityForm = ({ data, setData, handleSubmit, errors, processing }) => {

    return (
        <form onSubmit={handleSubmit} className="p-6 transition bg-white dark:bg-gray-800 dark:text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div className="mb-2">
                    <label className="block font-semibold">Min Length of service</label>
                    <input
                        type="number"
                        value={data.min_length_of_service}
                        onChange={(e) => setData({ ...data, min_length_of_service: e.target.value })}
                        min={0}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors?.min_length_of_service && (
                        <p className="text-red-500 text-sm mt-1">{errors.min_length_of_service}</p>
                    )}
                </div>

                <div className="mb-2">
                    <label className="block font-semibold">Min gap since last deployment</label>
                    <input
                        type="number"
                        value={data.min_gap_since_last_deployment}
                        onChange={(e) => setData({ ...data, min_gap_since_last_deployment: e.target.value })}
                        min={0}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors?.min_gap_since_last_deployment && (
                        <p className="text-red-500 text-sm mt-1">{errors.min_gap_since_last_deployment}</p>
                    )}
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

export default MissionEligibilityForm;
