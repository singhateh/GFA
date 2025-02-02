import React, { useEffect, useRef, useState } from "react";

const TrainingStaffAssociationForm = ({ staffMembers, trainingCourses, data, setData, handleSubmit, errors, processing }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStaff, setSelectedStaff] = useState(data.staff_member_ids);
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

    // Remove already selected staff from the dropdown
    const filteredStaff = staffMembers.filter(
        (staff) =>
            staff.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !selectedStaff.some((s) => s.id === staff.id) // Exclude selected staff
    );

    const handleStaffSelect = (staff) => {
        if (!selectedStaff.find((s) => s.id === staff.id)) {
            const updatedStaff = [...selectedStaff, staff];
            setSelectedStaff(updatedStaff);
            setData({ ...data, staff_member_ids: updatedStaff.map((s) => s.id) });
        }
        setSearchQuery("");
        // setIsDropdownOpen(false); // Close dropdown after selection
    };

    const removeStaff = (id) => {
        const updatedStaff = selectedStaff.filter((staff) => staff.id !== id);
        setSelectedStaff(updatedStaff);
        setData({ ...data, staff_member_ids: updatedStaff.map((s) => s.id) });
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    return (
        <form onSubmit={handleSubmit} className="p-6  transition bg-white dark:bg-gray-800 dark:text-white">
            {/* Multiple Staff Selection with Search */}
            <div className="mb-4 relative" ref={dropdownRef}>
                <label className="block font-semibold">Select Staff Members</label>

                <div
                    className="border p-2 w-full rounded-md cursor-pointer border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {selectedStaff.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {selectedStaff.map((staff) => (
                                <span key={staff.id} className="px-3 py-1 rounded-full text-sm flex items-center bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white">
                                    {staff.name}
                                    <button
                                        type="button"
                                        className="ml-2 hover:text-red-500"
                                        onClick={() => removeStaff(staff.id)}
                                    >
                                        ✕
                                    </button>
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">Select staff members...</p>
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

                {errors?.staff_member_ids && (
                    <p className="text-red-500 text-sm mt-1">{errors.staff_member_ids}</p>
                )}
            </div>

            {/* Training Course Selection */}
            <div className="mb-4">
                <label className="block font-semibold">Training Course</label>
                <select
                    value={data.training_course_id}
                    name="training_course_id"
                    onChange={(e) => setData({ ...data, training_course_id: e.target.value })}
                    className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                    <option value="">Select Training Course</option>
                    {trainingCourses.map((trainingCourse) => (
                        <option key={trainingCourse.id} value={trainingCourse.id}>
                            {trainingCourse.name}
                        </option>
                    ))}
                </select>
                {errors?.training_course_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.training_course_id}</p>
                )}
            </div>

            <div className="mb-4">
                <label className="font-medium block text-gray-600 dark:text-gray-300">Status:</label>
                <select name="status" value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white">
                    <option value="OnGoing">OnGoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Hold">Hold</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="px-4 py-2 rounded-md transition duration-300 bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
            >
                {processing ? 'Creating...' : 'Create Association'}
            </button>
        </form>
    );
};

export default TrainingStaffAssociationForm;
