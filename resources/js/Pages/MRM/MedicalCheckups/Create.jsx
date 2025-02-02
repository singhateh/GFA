import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import MedicalCheckupForm from './MedicalCheckupForm';

export default function CreateMedicalCheckup({ medicalCheckup, staffMembers, doctors }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        staff_member_id: medicalCheckup?.staff_member_id || '',
        doctor_id: medicalCheckup?.doctor_id || "",
        checkup_date: medicalCheckup?.checkup_date || "",
        schedule_date: medicalCheckup?.schedule_date || "",
        follow_up_required: !!medicalCheckup?.follow_up_required,
        is_medical_cleared: !!medicalCheckup?.is_medical_cleared,
        result: medicalCheckup?.result || "",
        notes: medicalCheckup?.notes || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const medicalCheckupId = medicalCheckup?.id;

        const updateOrCreate = medicalCheckupId
            ? route('medical-checkups.update', medicalCheckupId) // Use correct route for update
            : route('medical-checkups.store'); // Correct route for store

        const method = medicalCheckupId ? put : post; // Use `put` for update, `post` for create

        // Send the form data as `data`
        method(updateOrCreate, {
            data: { ...data }, // Spread form data here
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: medicalCheckupId ? 'Medical record updated successfully!' : 'Medical record added successfully!',
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
            <Head title={medicalCheckup ? "Edit Medical Checkup" : "Add Medical Checkup"} />

            {/* Back Button */}
            <div className="mb-4 mt-4 max-w-4xl mx-auto flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {medicalCheckup ? "Edit Medical Checkup" : "Add Medical Checkup"}
                </h2>
                <Link
                    href={route('medical-checkups.index')}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    &larr; Back to Medical Checkups
                </Link>
            </div>

            <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <MedicalCheckupForm
                    staffMembers={staffMembers}
                    doctors={doctors}
                    medicalCheckup={medicalCheckup}
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
