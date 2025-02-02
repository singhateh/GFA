import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import MissionSponsorForm from './MissionSponsorForm';

export default function CreateMedicalMissionSponsor({ missionSponsor }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: missionSponsor?.name || '',
        contact_info: missionSponsor?.contact_info || "",
        status: missionSponsor?.status || "",
        remarks: missionSponsor?.remarks || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const missionSponsorId = missionSponsor?.id;

        const updateOrCreate = missionSponsorId
            ? route('mission_sponsors.update', missionSponsorId) // Use correct route for update
            : route('mission_sponsors.store'); // Correct route for store

        const method = missionSponsorId ? put : post; // Use `put` for update, `post` for create

        // Send the form data as `data`
        method(updateOrCreate, {
            data: { ...data }, // Spread form data here
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: missionSponsorId ? 'Medical record updated successfully!' : 'Medical record added successfully!',
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
            <Head title={missionSponsor ? "Edit Mission Sponsor" : "Add Mission Sponsor"} />

            {/* Back Button */}
            <div className="mb-4 mt-4 max-w-4xl mx-auto flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {missionSponsor ? "Edit Mission Sponsor" : "Add Mission Sponsor"}
                </h2>
                <Link
                    href={route('mission_sponsors.index')}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    &larr; Back to Mission Sponsors
                </Link>
            </div>

            <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <MissionSponsorForm
                    missionSponsor={missionSponsor}
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
