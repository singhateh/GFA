import { router } from "@inertiajs/react";

export default function TrainingProgramForm({ training, data, setData, trainingTypes, handleSubmit, countries, errors }) {

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Training Name:</label>
                    <input type="text" name="name" value={data.name} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" min="1" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Training Type:</label>
                    <select name="training_type_id" value={data.training_type_id} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white">
                        <option value="">Select Training Type</option>
                        {trainingTypes.map((asset) => (
                            <option key={asset.id} value={asset.id}>{asset.name}</option>
                        ))}
                    </select>
                    {errors.training_type_id && <p className="text-red-500 text-sm">{errors.training_type_id}</p>}
                </div>

                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Country:</label>
                    <select name="country_id" value={data.country_id} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white">
                        <option value="">Select Country</option>
                        {countries.map((asset) => (
                            <option key={asset.id} value={asset.id}>{asset.name}</option>
                        ))}
                    </select>
                    {errors.country_id && <p className="text-red-500 text-sm">{errors.country_id}</p>}
                </div>

                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Duration:</label>
                    <input type="number" name="duration" value={data.duration} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" min="1" />
                    {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                </div>

                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Start Date:</label>
                    <input type="date" name="start_date" value={data.start_date} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" />
                    {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date}</p>}
                </div>

                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">End Date (Optional):</label>
                    <input type="date" name="end_date" value={data.end_date} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" />
                </div>

                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Certification:</label>
                    <input type="text" name="certification" value={data.certification} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" />
                </div>

                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Remarks:</label>
                    <input type="text" name="remarks" value={data.remarks} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" />
                </div>
            </div>

            <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                {training ? "Update Training" : "Create Training"}
            </button>
        </form>
    );
}
