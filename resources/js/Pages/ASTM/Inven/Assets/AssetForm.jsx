export default function AssetForm({ asset = null, data, setData, errors, handleSubmit, assettypes }) {

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{asset ? "Edit Asset" : "Add Asset"}</h2>
            <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={data?.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                        required
                    />
                    {errors?.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Asset Type */}
                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Asset Type:</label>
                    <select
                        name="asset_type_id"
                        value={data?.asset_type_id}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                        required
                    >
                        <option value="">Select Asset Type</option>

                        {assettypes.map((assetType) => (
                            <option key={assetType.id} value={assetType.id}>
                                {assetType.name}
                            </option>
                        ))}
                    </select>
                    {errors?.asset_type_id && <p className="text-red-500 text-sm mt-1">{errors.asset_type_id}</p>}
                </div>

                {/* Serial No */}
                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Serial No:</label>
                    <input
                        type="text"
                        name="serial_no"
                        value={data?.serial_no}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                        required
                    />
                    {errors?.serial_no && <p className="text-red-500 text-sm mt-1">{errors.serial_no}</p>}
                </div>

                {/* Status */}
                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Status:</label>
                    <select
                        name="status"
                        value={data?.status}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                        required
                    >
                        <option value="Available">Available</option>
                        <option value="In Use">In Use</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Retired">Retired</option>
                    </select>
                    {errors?.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                </div>

                {/* Condition */}
                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Condition:</label>
                    <select
                        name="condition"
                        value={data?.condition}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                        required
                    >
                        <option value="New">New</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Damaged">Damaged</option>
                    </select>
                    {errors?.condition && <p className="text-red-500 text-sm mt-1">{errors.condition}</p>}
                </div>

                {/* Quantity in Stock */}
                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Quantity in Stock:</label>
                    <input
                        type="number"
                        name="quantity_in_stock"
                        value={data?.quantity_in_stock}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                        min="1"
                        required
                    />
                    {errors?.quantity_in_stock && <p className="text-red-500 text-sm mt-1">{errors.quantity_in_stock}</p>}
                </div>

                {/* Quantity in Use */}
                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Quantity in Use:</label>
                    <input
                        type="number"
                        name="quantity_in_use"
                        value={data?.quantity_in_use}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                        min="0"
                        required
                    />
                    {errors?.quantity_in_use && <p className="text-red-500 text-sm mt-1">{errors.quantity_in_use}</p>}
                </div>

                {/* Date Procured */}
                <div>
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Date Procured:</label>
                    <input
                        type="date"
                        name="date_procured"
                        value={data?.date_procured}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                        required
                    />
                    {errors?.date_procured && <p className="text-red-500 text-sm mt-1">{errors.date_procured}</p>}
                </div>

                {/* Description */}
                <div className="col-span-2">
                    <label className="font-medium block text-gray-600 dark:text-gray-300">Description:</label>
                    <textarea
                        name="description"
                        value={data?.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                        required
                    />
                    {errors?.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
            </div>

            <button type="submit" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
                {asset ? "Update Asset" : "Add Asset"}
            </button>
        </form>
    );
}
