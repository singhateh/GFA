import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import TrainingStaffAssociationForm from './TrainingStaffAssociationForm';

export default function CreateTrainingStaffAssociation({ trainingStaffAssociation, staffMembers, trainingCourses }) {

    const { data, setData, post, put, processing, errors, reset } = useForm({
        staff_member_ids: trainingStaffAssociation?.staff_member_id ? [trainingStaffAssociation.staff_member] : [],
        staff_member_id: trainingStaffAssociation?.staff_member_id || '',
        training_course_id: trainingStaffAssociation?.training_course_id || "",
        status: trainingStaffAssociation?.status || "OnGoing",
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        const trainingStaffAssociationId = trainingStaffAssociation?.id;


        const updateOrCreate = trainingStaffAssociationId
            ? route('training.staff-associations.update', trainingStaffAssociationId) // Ensure ID is passed correctly
            : route('training.staff-associations.store');


        const method = trainingStaffAssociationId ? put : post; // Use `put` for update, `post` for create

        method(updateOrCreate, {
            data: trainingStaffAssociation, // Ensure asset data is sent
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: trainingStaffAssociationId ? 'Asset updated successfully!' : 'Asset added successfully!',
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
            <Head title={trainingStaffAssociation ? "Edit Staff Association" : "Add Staff Association"} />

            {/* Back Button */}
            <div className="mb-4 mt-4 max-w-4xl mx-auto flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{trainingStaffAssociation ? "Edit Staff Association" : "Add Staff Association"}</h2>
                <Link
                    href={route('staff-associations.index')}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    &larr; Back to Staff Association
                </Link>
            </div>

            <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">

                <TrainingStaffAssociationForm
                    staffMembers={staffMembers}
                    trainingCourses={trainingCourses}
                    trainingStaffAssociation={trainingStaffAssociation}
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
