import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function StaffProfile({ staff }) {
    return (
        <AuthenticatedLayout>
            <Head title="Staff Profile" />

            <div className="p-6">
                {/* Back Button */}
                <div className="mb-4">
                    <Link
                        href={route('staff.index')}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        &larr; Back to Staff Directory
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Staff Profile</h1>

                {/* Staff Details Card */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    {/* Personal Details */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white pb-2 border-b">Personal Details</h2>
                        <ul className="grid grid-cols-2 gap-4 mt-4 text-gray-700 dark:text-gray-300">
                            <li><strong>Name:</strong> {staff.first_name} {staff.last_name}</li>
                            <li><strong>Email:</strong> {staff.email_address}</li>
                            <li><strong>Phone:</strong> {staff.contact_number}</li>
                            <li><strong>Gender:</strong> {staff.gender}</li>
                            <li><strong>Date of Birth:</strong> {staff.date_of_birth}</li>
                            <li><strong>Place of Birth:</strong> {staff.place_of_birth}</li>
                        </ul>
                    </div>

                    {/* Work Information */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white pb-2 border-b">Work Information</h2>
                        <ul className="grid grid-cols-2 gap-4 mt-4 text-gray-700 dark:text-gray-300">
                            <li><strong>Position:</strong> {staff.position}</li>
                            <li><strong>Rank:</strong> {staff.rank.rank_name}</li>
                            <li><strong>Department:</strong> {staff.department.name}</li>
                            <li><strong>Unit:</strong> {staff.unit.unit_name}</li>
                            <li><strong>Enlistment Date:</strong> {staff.date_of_enlistment}</li>
                            <li><strong>Blood Group:</strong> {staff.bloodGroup?.name}</li>
                            <li><strong>Religion:</strong> {staff.religion.name}</li>
                            <li><strong>Status:</strong> {staff.status}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
