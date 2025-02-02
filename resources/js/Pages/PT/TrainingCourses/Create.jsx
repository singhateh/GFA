import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import TrainingCourseForm from './TrainingCourseForm';

export default function CreateTraining({ trainingCourse }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: trainingCourse?.name || "",
        type: trainingCourse?.type || "",
        status: trainingCourse?.status || "Active",
        description: trainingCourse?.description || "",
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        const trainingCourseId = trainingCourse?.id;


        const updateOrCreate = trainingCourseId
            ? route('courses.update', trainingCourseId) // Ensure ID is passed correctly
            : route('courses.store');


        const method = trainingCourseId ? put : post; // Use `put` for update, `post` for create

        method(updateOrCreate, {
            data: trainingCourse, // Ensure trainingCourse data is sent
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: trainingCourseId ? 'TrainingCourse updated successfully!' : 'TrainingCourse added successfully!',
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
            <Head title="Add TrainingCourse" />

            {/* Back Button */}
            <div className="mb-4 mt-4 max-w-4xl mx-auto flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{trainingCourse ? "Edit Assignment" : "Assign TrainingCourse"}</h2>
                <Link
                    href={route('courses.index')}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    &larr; Back to Training Course
                </Link>
            </div>

            <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">

                <TrainingCourseForm
                    trainingCourse={trainingCourse}
                    data={data}
                    setData={setData}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />
            </div>
        </AuthenticatedLayout>
    );
}
