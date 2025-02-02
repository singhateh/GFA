import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import MedicalRecordForm from './MedicalRecordForm';

export default function CreateMedicalRecord({ medicalRecord, staffMembers, doctors }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        staff_member_id: medicalRecord?.staff_member_id || '',
        doctor_id: medicalRecord?.doctor_id || "",
        medical_history: medicalRecord?.medical_history || "",
        prescriptions: medicalRecord?.prescriptions || "",
        allergies: medicalRecord?.allergies || "",
        notes: medicalRecord?.notes || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const medicalRecordId = medicalRecord?.id;

        const updateOrCreate = medicalRecordId
            ? route('medical-records.update', medicalRecordId) // Use correct route for update
            : route('medical-records.store'); // Correct route for store

        const method = medicalRecordId ? put : post; // Use `put` for update, `post` for create

        // Send the form data as `data`
        method(updateOrCreate, {
            data: { ...data }, // Spread form data here
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: medicalRecordId ? 'Medical record updated successfully!' : 'Medical record added successfully!',
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
            <Head title={medicalRecord ? "Edit Medical Record" : "Add Medical Record"} />

            {/* Back Button */}
            <div className="mb-4 mt-4 max-w-4xl mx-auto flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {medicalRecord ? "Edit Medical Record" : "Add Medical Record"}
                </h2>
                <Link
                    href={route('medical-records.index')}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    &larr; Back to Medical Records
                </Link>
            </div>

            <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <MedicalRecordForm
                    staffMembers={staffMembers}
                    doctors={doctors}
                    medicalRecord={medicalRecord}
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
