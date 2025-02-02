import React from "react";

const TrainingPerformanceForm = ({ trainingStaffAssociations, data, setData, handleSubmit, errors }) => {
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (

        <form onSubmit={handleSubmit}>
            {/* Training Assignment Selection */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">Training Assignment</label>
                <select
                    value={data.training_staff_association_id}
                    name="training_staff_association_id"
                    onChange={handleChange}
                    className="border border-gray-300 dark:border-gray-600 p-2 w-full bg-white dark:bg-gray-700 dark:text-white"
                >
                    <option value="">Select Training</option>
                    {trainingStaffAssociations.map((assoc) => (
                        <option key={assoc.id} value={assoc.id}>
                            {assoc.staff_member?.name} - {assoc.training_course?.name}
                        </option>
                    ))}
                </select>
                {errors?.training_staff_association_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.training_staff_association_id}</p>
                )}
            </div>

            {/* Progress */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">Progress (%)</label>
                <input
                    type="number"
                    name="progress_percentage"
                    value={data.progress_percentage}
                    onChange={handleChange}
                    className="border border-gray-300 dark:border-gray-600 p-2 w-full bg-white dark:bg-gray-700 dark:text-white"
                />
                {errors?.progress_percentage && (
                    <p className="text-red-500 text-sm mt-1">{errors.progress_percentage}</p>
                )}
            </div>

            {/* Status */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">Status</label>
                <select
                    value={data.status}
                    name="status"
                    onChange={handleChange}
                    className="border border-gray-300 dark:border-gray-600 p-2 w-full bg-white dark:bg-gray-700 dark:text-white"
                >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                </select>
                {errors?.status && (
                    <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                )}
            </div>

            {/* Remarks */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">Remarks</label>
                <textarea
                    value={data.remarks}
                    name="remarks"
                    onChange={handleChange}
                    className="border border-gray-300 dark:border-gray-600 p-2 w-full bg-white dark:bg-gray-700 dark:text-white"
                ></textarea>
                {errors?.remarks && (
                    <p className="text-red-500 text-sm mt-1">{errors.remarks}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md dark:bg-blue-600 dark:hover:bg-blue-700"
            >
                Save
            </button>
        </form>
    );
};

export default TrainingPerformanceForm;
