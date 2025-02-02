import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import MissionForm from './MissionForm';

export default function CreateMedicalMission({ mission, missionTypes, missionSponsors }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        mission_type_id: mission?.mission_type_id || '',
        mission_sponsor_id: mission?.mission_sponsor_id || '',
        name: mission?.name || "",
        start_date: mission?.start_date || "",
        end_date: mission?.end_date || "",
        country: mission?.country || "",
        status: mission?.status || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const missionId = mission?.id;

        const updateOrCreate = missionId
            ? route('missions.update', missionId) // Use correct route for update
            : route('missions.store'); // Correct route for store

        const method = missionId ? put : post; // Use `put` for update, `post` for create

        // Send the form data as `data`
        method(updateOrCreate, {
            data: { ...data }, // Spread form data here
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: missionId ? 'Medical record updated successfully!' : 'Medical record added successfully!',
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
            <Head title={mission ? "Edit Mission" : "Add Mission"} />

            {/* Back Button */}
            <div className="mb-4 mt-4 max-w-4xl mx-auto flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {mission ? "Edit Mission" : "Add Mission"}
                </h2>
                <Link
                    href={route('missions.index')}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    &larr; Back to Missions
                </Link>
            </div>

            <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <MissionForm
                    missionTypes={missionTypes}
                    missionSponsors={missionSponsors}
                    mission={mission}
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
