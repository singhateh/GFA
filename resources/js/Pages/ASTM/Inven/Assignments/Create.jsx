import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AssignAssetForm from './AssignAssetForm';

export default function CreateAssignment({ assetAssignment, assets, staffMembers, units, asset = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        asset_id: assetAssignment?.asset_id || asset.id,
        assigned_to_id: assetAssignment?.assigned_to_id || "",
        assigned_to_type: assetAssignment?.assigned_to_type || "App\\Models\\StaffMember",
        quantity_assigned: assetAssignment?.quantity_assigned || 1,
        assigned_date: assetAssignment?.assigned_date || "",
        return_date: assetAssignment?.return_date || "",
        status: assetAssignment?.status || "Assigned",
        remarks: assetAssignment?.remarks || "",
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
            <div className="mb-4 mt-4 max-w-4xl mx-auto flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{assetAssignment ? "Edit Assignment" : "Assign Asset"}</h2>
                <Link
                    href={route('assignments.index')}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    &larr; Back to Assignment
                </Link>
            </div>

            <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">

                <AssignAssetForm
                    assetAssignment={assetAssignment}
                    asset={asset}
                    assets={assets}
                    users={staffMembers}
                    units={units}
                    data={data}
                    setData={setData}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />

            </div>
        </AuthenticatedLayout>
    );
}
