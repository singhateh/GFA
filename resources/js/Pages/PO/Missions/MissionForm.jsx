import React, { useEffect, useState, useRef } from "react";

const MissionForm = ({ missionTypes, missionSponsors, data, setData, handleSubmit, errors, processing }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);




    return (
        <form onSubmit={handleSubmit} className="p-6 transition bg-white dark:bg-gray-800 dark:text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Mission Name */}
                <div className="mb-2">
                    <label className="block font-semibold">Mission Name</label>
                    <input
                        type="text"
                        value={data.name || ""}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter mission name"
                    />
                    {errors?.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Mission Type */}
                <div className="mb-2">
                    <label className="block font-semibold">Mission Type</label>
                    <select
                        value={data.mission_type_id || ""}
                        onChange={(e) => setData({ ...data, mission_type_id: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Select Mission Type</option>
                        {missionTypes.map((missionType) => (
                            <option key={missionType.id} value={missionType.id}>
                                {missionType.name}
                            </option>
                        ))}
                    </select>
                    {errors?.mission_type_id && <p className="text-red-500 text-sm mt-1">{errors.mission_type_id}</p>}
                </div>

                {/* Mission Sponsor */}
                <div className="mb-2">
                    <label className="block font-semibold">Mission Sponsor</label>
                    <select
                        value={data.mission_sponsor_id || ""}
                        onChange={(e) => setData({ ...data, mission_sponsor_id: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Select Mission Sponsor</option>
                        {missionSponsors.map((missionSponsor) => (
                            <option key={missionSponsor.id} value={missionSponsor.id}>
                                {missionSponsor.name}
                            </option>
                        ))}
                    </select>
                    {errors?.mission_sponsor_id && <p className="text-red-500 text-sm mt-1">{errors.mission_sponsor_id}</p>}
                </div>

                {/* Start Date */}
                <div className="mb-2">
                    <label className="block font-semibold">Start Date</label>
                    <input
                        type="date"
                        value={data.start_date || ""}
                        onChange={(e) => setData({ ...data, start_date: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors?.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
                </div>

                {/* End Date */}
                <div className="mb-2">
                    <label className="block font-semibold">End Date</label>
                    <input
                        type="date"
                        value={data.end_date || ""}
                        onChange={(e) => setData({ ...data, end_date: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors?.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>}
                </div>

                {/* Country */}
                <div className="mb-2">
                    <label className="block font-semibold">Country</label>
                    <input
                        type="text"
                        value={data.country || ""}
                        onChange={(e) => setData({ ...data, country: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter country"
                    />
                    {errors?.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>

                {/* Mission Status */}
                <div className="mb-2">
                    <label className="block font-semibold">Mission Status</label>
                    <select
                        value={data.status || ""}
                        onChange={(e) => setData({ ...data, status: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Select Mission Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                    </select>
                    {errors?.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
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

export default MissionForm;
