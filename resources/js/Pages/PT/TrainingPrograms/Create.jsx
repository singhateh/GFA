import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import TrainingProgramForm from './TrainingProgramForm';

export default function CreateProgramTraining({ trainingTypes, countries, training }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: training?.name || "",
        training_type_id: training?.training_type_id || "",
        country_id: training?.country_id || "",
        duration: training?.duration || "",
        start_date: training?.start_date || "",
        end_date: training?.end_date || "",
        certification: training?.certification || "",
        remarks: training?.remarks || "",
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        const trainingId = training?.id;


        const updateOrCreate = trainingId
            ? route('training.update', trainingId) // Ensure ID is passed correctly
            : route('training.store');


        const method = trainingId ? put : post; // Use `put` for update, `post` for create

        method(updateOrCreate, {
            data: training, // Ensure training data is sent
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: trainingId ? 'Asset updated successfully!' : 'Asset added successfully!',
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
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{training ? "Edit Training Programs" : "Create Training Programs"}</h2>
                <Link
                    href={route('training.index')}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    &larr; Back to Assignment
                </Link>
            </div>

            <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">

                <TrainingProgramForm
                    training={training}
                    trainingTypes={trainingTypes}
                    countries={countries}
                    data={data}
                    setData={setData}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />

            </div>
        </AuthenticatedLayout>
    );
}
