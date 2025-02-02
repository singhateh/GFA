import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AssetForm from './AssetForm';

export default function CreateAsset({ asset, assettypes, departments, units, religions, bloodGroups, positions, commissionTypes }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: asset?.name || "",
        asset_type_id: asset?.asset_type_id || "",
        serial_no: asset?.serial_no || "",
        status: asset?.status || "Available",
        condition: asset?.condition || "New",
        quantity_in_stock: asset?.quantity_in_stock || 1,
        quantity_in_use: asset?.quantity_in_use || 0,
        date_procured: asset?.date_procured || "",
        description: asset?.description || "",
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        const assetId = asset?.id;


        const updateOrCreate = assetId
            ? route('assets.update', assetId) // Ensure ID is passed correctly
            : route('assets.store');


        const method = assetId ? put : post; // Use `put` for update, `post` for create

        method(updateOrCreate, {
            data: asset, // Ensure asset data is sent
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: assetId ? 'Asset updated successfully!' : 'Asset added successfully!',
                    toast: true,
                    position: 'top-end',
                    timer: 3000,
                    showConfirmButton: false,
                });

                reset(); // Reset form data after success
            },
            onError: (errors) => {
                const errorMessages = Object.values(errors).flat().join("\n"); // Format error messages

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessages || "Something went wrong!",
                    toast: true,
                    position: 'top-end',
                    timer: 3000,
                    showConfirmButton: false,
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Asset" />

            {/* Back Button */}
            <div className="mb-4 mt-4 max-w-4xl mx-auto">
                <Link
                    href={route('assets.index')}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    &larr; Back to Asset
                </Link>
            </div>

            <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">

                <AssetForm
                    asset={asset}
                    data={data}
                    setData={setData}
                    handleSubmit={handleSubmit}
                    assettypes={assettypes}
                    errors={errors}
                />

            </div>
        </AuthenticatedLayout>
    );
}
