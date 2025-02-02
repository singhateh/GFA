import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import MedicalClearanceForm from './MedicalClearanceForm';

export default function CreateMedicalClearance({ clearance, staffMembers }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        staff_member_id: clearance?.staff_member_id || '',
        issued_at: clearance?.issued_at || "",
        type: clearance?.type || "",
        status: clearance?.status || "",
        remarks: clearance?.remarks || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const clearanceId = clearance?.id;

        const updateOrCreate = clearanceId
            ? route('clearances.update', clearanceId) // Use correct route for update
            : route('clearances.store'); // Correct route for store

        const method = clearanceId ? put : post; // Use `put` for update, `post` for create

        // Send the form data as `data`
        method(updateOrCreate, {
            data: { ...data }, // Spread form data here
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: clearanceId ? 'Medical record updated successfully!' : 'Medical record added successfully!',
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
            <Head title={clearance ? "Edit Clearance" : "Add Clearance"} />

            {/* Back Button */}
            <div className="mb-4 mt-4 max-w-4xl mx-auto flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {clearance ? "Edit Clearance" : "Add Clearance"}
                </h2>
                <Link
                    href={route('clearances.index')}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    &larr; Back to Clearances
                </Link>
            </div>

            <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <MedicalClearanceForm
                    staffMembers={staffMembers}
                    clearance={clearance}
                    data={data}
                    setData={setData}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    processing={processing}
                />
            </div>
        </AuthenticatedLayout>
    );
}
