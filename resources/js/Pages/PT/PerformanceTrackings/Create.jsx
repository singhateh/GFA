import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import TrainingPerformanceForm from './TrainingPerformanceForm';

export default function CreateTrainingPerformance({ trainingPerformanceTracking, asset, trainingStaffAssociations }) {

    const { data, setData, post, put, processing, errors, reset } = useForm({
        training_staff_association_id: trainingPerformanceTracking?.training_staff_association_id || asset?.id,
        progress_percentage: trainingPerformanceTracking?.progress_percentage || "",
        status: trainingPerformanceTracking?.status || 'Not Started',
        remarks: trainingPerformanceTracking?.remarks || "",
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        const trainingPerformanceTrackingId = trainingPerformanceTracking?.id;


        const updateOrCreate = trainingPerformanceTrackingId
            ? route('training.performance.update', trainingPerformanceTrackingId) // Ensure ID is passed correctly
            : route('training.performance.store');


        const method = trainingPerformanceTrackingId ? put : post; // Use `put` for update, `post` for create

        method(updateOrCreate, {
            data: trainingPerformanceTracking, // Ensure asset data is sent
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: trainingPerformanceTrackingId ? 'Asset updated successfully!' : 'Asset added successfully!',
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
            <Head title={trainingPerformanceTracking ? "Edit Training Performance" : "Add Training Performance"} />

            {/* Back Button */}
            <div className="mb-4 mt-4 max-w-4xl mx-auto flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{trainingPerformanceTracking ? "Edit Training Performance" : "Add Training Performance"}</h2>
                <Link
                    href={route('performance.index')}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    &larr; Back to Performance
                </Link>
            </div>

            <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">

                <TrainingPerformanceForm
                    trainingStaffAssociations={trainingStaffAssociations}
                    trainingPerformanceTracking={trainingPerformanceTracking}
                    data={data}
                    setData={setData}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />

            </div>
        </AuthenticatedLayout>
    );
}
