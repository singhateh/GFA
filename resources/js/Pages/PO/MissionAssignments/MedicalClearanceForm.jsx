import React, { useEffect, useState, useRef } from "react";

const ClearanceForm = ({ staffMembers, data, setData, handleSubmit, errors, processing }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStaff, setSelectedStaff] = useState(staffMembers.find((staff) => staff?.id === data.staff_member_id) || null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

    const filteredStaff = staffMembers.filter(
        (staff) => staff.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleStaffSelect = (staff) => {
        setSelectedStaff(staff);
        setData({ ...data, staff_member_id: staff.id });
        setSearchQuery("");
        setIsDropdownOpen(false);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 transition bg-white dark:bg-gray-800 dark:text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Staff Member Selection */}
                <div className="mb-2 relative" ref={dropdownRef}>
                    <label className="block font-semibold">Staff Member</label>
                    <div
                        className="border p-2 w-full rounded-md cursor-pointer border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {selectedStaff ? (
                            <div className="flex justify-between items-center">
                                <span>{selectedStaff.name}</span>
                                <button type="button" className="ml-2 hover:text-red-500" onClick={() => setSelectedStaff(null)}>
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">Select staff member...</p>
                        )}
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute w-full border rounded-md mt-1 shadow-lg z-10 transition border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="p-2 w-full border-b outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="Search staff..."
                            />
                            <div className="max-h-40 overflow-y-auto">
                                {filteredStaff.length > 0 ? (
                                    filteredStaff.map((staff) => (
                                        <div
                                            key={staff.id}
                                            className="p-2 cursor-pointer transition hover:bg-blue-100 dark:hover:bg-blue-600"
                                            onClick={() => handleStaffSelect(staff)}
                                        >
                                            {staff.name}
                                        </div>
                                    ))
                                ) : (
                                    <p className="p-2 text-gray-500 dark:text-gray-400">No matching staff found</p>
                                )}
                            </div>
                        </div>
                    )}
                    {errors?.staff_member_id && <p className="text-red-500 text-sm mt-1">{errors.staff_member_id}</p>}
                </div>

                {/* Issued At */}
                <div className="mb-2">
                    <label className="block font-semibold">Issued At</label>
                    <input
                        type="date"
                        value={data.issued_at || ""}
                        onChange={(e) => setData({ ...data, issued_at: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors?.issued_at && <p className="text-red-500 text-sm mt-1">{errors.issued_at}</p>}
                </div>

                {/* Type */}
                <div className="mb-2">
                    <label className="block font-semibold">Clearance Type</label>
                    <select
                        value={data.type || ""}
                        onChange={(e) => setData({ ...data, type: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Select Type</option>
                        <option value="Medical">Medical</option>
                        <option value="Exit">Exit</option>
                        <option value="Re-engagement">Re-engagement</option>
                        <option value="Financial">Financial</option>
                        <option value="Security">Security</option>
                    </select>
                    {errors?.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                </div>

                {/* Status */}
                <div className="mb-2">
                    <label className="block font-semibold">Status</label>
                    <select
                        value={data.status || ""}
                        onChange={(e) => setData({ ...data, status: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    {errors?.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                </div>

                {/* Remarks */}
                <div className="mb-2 col-span-2">
                    <label className="block font-semibold">Remarks</label>
                    <textarea
                        value={data.remarks || ""}
                        onChange={(e) => setData({ ...data, remarks: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        rows="3"
                        placeholder="Enter remarks"
                    />
                    {errors?.remarks && <p className="text-red-500 text-sm mt-1">{errors.remarks}</p>}
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

export default ClearanceForm;
