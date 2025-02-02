import React, { useEffect, useState, useRef } from "react";

const MedicalCheckupForm = ({ staffMembers, doctors, data, setData, handleSubmit, errors, processing }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStaff, setSelectedStaff] = useState([staffMembers.find((staff) => staff?.id === data.staff_member_id)]);
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


    // Filter staff members based on search
    const filteredStaff = staffMembers.filter(
        (staff) =>
            staff.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !selectedStaff.some((s) => s?.id === staff?.id) // Exclude already selected staff
    );

    // Handle staff member selection
    const handleStaffSelect = (staff) => {
        setSelectedStaff([staff]); // Replace the selected staff with the new selection
        setData({ ...data, staff_member_id: staff.id });
        setSearchQuery("");
        setIsDropdownOpen(false);

        console.log(staff.gender);

    };

    // Handle removal of selected staff
    const removeStaff = () => {
        setSelectedStaff([]);
        setData({ ...data, staff_member_id: "" });
        setIsDropdownOpen(false);
    };

    const handleScheduleDateChange = (e) => {
        const inputDate = e.target.value; // Example: '2025-02-01T15:30'

        // Parse and format the date as 'YYYY-MM-DD HH:mm:ss'
        const formattedDate = new Date(inputDate).toISOString().slice(0, 19).replace('T', ' ');

        setData({
            ...data,
            schedule_date: formattedDate
        });
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
                        {selectedStaff.length > 0 ? (
                            <div className="flex justify-between items-center">
                                <span>{selectedStaff[0]?.name}</span>
                                <button
                                    type="button"
                                    className="ml-2 hover:text-red-500"
                                    onClick={removeStaff}
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">Select staff member...</p>
                        )}
                    </div>

                    {/* Dropdown for Searching Staff */}
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
                    {errors?.staff_member_id && (
                        <p className="text-red-500 text-sm mt-1">{errors.staff_member_id}</p>
                    )}
                </div>

                {/* Doctor Selection */}
                <div className="mb-2">
                    <label className="block font-semibold">Doctor</label>
                    <select
                        value={data.doctor_id}
                        name="doctor_id"
                        onChange={(e) => setData({ ...data, doctor_id: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                    {errors?.doctor_id && (
                        <p className="text-red-500 text-sm mt-1">{errors.doctor_id}</p>
                    )}
                </div>

                {/* Checkup Date */}
                <div className="mb-2">
                    <label className="block font-semibold">Checkup Date</label>
                    <input
                        type="date"
                        value={data.checkup_date}
                        onChange={(e) => setData({ ...data, checkup_date: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors?.checkup_date && (
                        <p className="text-red-500 text-sm mt-1">{errors.checkup_date}</p>
                    )}
                </div>

                <div className="mb-2">
                    <label className="block font-semibold">Schedule Date and Time</label>
                    <input
                        type="datetime-local"
                        value={data.schedule_date}
                        onChange={handleScheduleDateChange}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors?.schedule_date && (
                        <p className="text-red-500 text-sm mt-1">{errors.schedule_date}</p>
                    )}
                </div>


                {/* Follow-up Required */}
                <div className="mb-2">
                    <label className="block font-semibold">Follow-up Required</label>
                    <select
                        value={data.follow_up_required}
                        onChange={(e) => setData({ ...data, follow_up_required: JSON.parse(e.target.value) })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Select Follow-up</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    {errors?.follow_up_required && (
                        <p className="text-red-500 text-sm mt-1">{errors.follow_up_required}</p>
                    )}
                </div>

                {/* Follow-up Required */}
                <div className="mb-2">
                    <label className="block font-semibold">Is Medical Cleared</label>
                    <select
                        value={data.is_medical_cleared}
                        onChange={(e) => setData({ ...data, is_medical_cleared: JSON.parse(e.target.value) })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Select Follow-up</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    {errors?.is_medical_cleared && (
                        <p className="text-red-500 text-sm mt-1">{errors.is_medical_cleared}</p>
                    )}
                </div>

                {/* Result */}
                <div className="mb-2 col-span-2">
                    <label className="block font-semibold">Result</label>
                    <textarea
                        value={data.result}
                        onChange={(e) => setData({ ...data, result: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        rows="2"
                        placeholder="Enter result"
                    />
                    {errors?.result && (
                        <p className="text-red-500 text-sm mt-1">{errors.result}</p>
                    )}
                </div>

                {/* Notes */}
                <div className="mb-2  col-span-2">
                    <label className="block font-semibold">Notes</label>
                    <textarea
                        value={data.notes}
                        onChange={(e) => setData({ ...data, notes: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        rows="2"
                        placeholder="Enter notes"
                    />
                    {errors?.notes && (
                        <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                    )}
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

export default MedicalCheckupForm;
