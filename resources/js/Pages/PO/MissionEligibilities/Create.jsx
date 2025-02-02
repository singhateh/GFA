import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import MissionEligibilityForm from './MissionEligibilityForm';

export default function CreateMissionEligibility({ missionEligibility }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        description: missionEligibility?.description || '',
        min_length_of_service: missionEligibility?.min_length_of_service || "",
        min_gap_since_last_deployment: missionEligibility?.min_gap_since_last_deployment || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const missionEligibilityId = missionEligibility?.id;

        const updateOrCreate = missionEligibilityId
            ? route('mission_eligibility.update', missionEligibilityId) // Use correct route for update
            : route('mission_eligibility.store'); // Correct route for store

        const method = missionEligibilityId ? put : post; // Use `put` for update, `post` for create

        // Send the form data as `data`
        method(updateOrCreate, {
            data: { ...data }, // Spread form data here
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: missionEligibilityId ? 'Medical record updated successfully!' : 'Medical record added successfully!',
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
            <Head title={missionEligibility ? "Edit Mission Eligibility" : "Add Mission Eligibility"} />

            {/* Back Button */}
            <div className="mb-4 mt-4 max-w-4xl mx-auto flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {missionEligibility ? "Edit MissionEligibility" : "Add MissionEligibility"}
                </h2>
                <Link
                    href={route('mission_eligibility.index')}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    &larr; Back to Mission Eligibilities
                </Link>
            </div>

            <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <MissionEligibilityForm
                    missionEligibility={missionEligibility}
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
