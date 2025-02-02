
const MissionSponsorForm = ({ data, setData, handleSubmit, errors, processing }) => {

    return (
        <form onSubmit={handleSubmit} className="p-6 transition bg-white dark:bg-gray-800 dark:text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Issued At */}
                <div className="mb-2">
                    <label className="block font-semibold">Name</label>
                    <input
                        type="text"
                        value={data.name || ""}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors?.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Issued At */}
                <div className="mb-2">
                    <label className="block font-semibold">Contact Info</label>
                    <input
                        type="text"
                        value={data.contact_info || ""}
                        onChange={(e) => setData({ ...data, contact_info: e.target.value })}
                        className="border p-2 w-full rounded-md outline-none border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors?.contact_info && <p className="text-red-500 text-sm mt-1">{errors.contact_info}</p>}
                </div>

                {/* Status */}
                <div className="mb-2 col-span-2">
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

export default MissionSponsorForm;
