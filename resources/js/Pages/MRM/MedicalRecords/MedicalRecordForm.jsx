import React, { useEffect, useState, useRef } from "react";

const MedicalRecordForm = ({ staffMembers, doctors, data, setData, handleSubmit, errors, processing }) => {

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
                    {errors?.staff_member_id_id && (
                        <p className="text-red-500 text-sm mt-1">{errors.staff_member_id_id}</p>
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

                {/* Medical History */}
                <div className="mb-2 col-span-2">
                    <label className="block font-semibold">Medical History</label>
                    <textarea
                        value={data.medical_history}
                        onChange={(e) => setData({ ...data, medical_history: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        rows="2"
                        placeholder="Enter medical history"
                    />
                    {errors?.medical_history && (
                        <p className="text-red-500 text-sm mt-1">{errors.medical_history}</p>
                    )}
                </div>

                {/* Prescriptions */}
                <div className="mb-2 col-span-2">
                    <label className="block font-semibold">Prescriptions</label>
                    <textarea
                        value={data.prescriptions}
                        onChange={(e) => setData({ ...data, prescriptions: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        rows="2"
                        placeholder="Enter prescriptions"
                    />
                    {errors?.prescriptions && (
                        <p className="text-red-500 text-sm mt-1">{errors.prescriptions}</p>
                    )}
                </div>

                {/* Allergies */}
                <div className="mb-2 col-span-2">
                    <label className="block font-semibold">Allergies</label>
                    <textarea
                        value={data.allergies}
                        onChange={(e) => setData({ ...data, allergies: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        rows="2"
                        placeholder="Enter allergies"
                    />
                    {errors?.allergies && (
                        <p className="text-red-500 text-sm mt-1">{errors.allergies}</p>
                    )}
                </div>

                {/* Notes */}
                <div className="mb-2 col-span-2">
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

export default MedicalRecordForm;
