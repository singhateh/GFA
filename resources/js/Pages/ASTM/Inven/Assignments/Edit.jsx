import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function EditStaff({ staff, ranks, departments, units, religions, bloodGroups, positions, commissionTypes }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        first_name: staff.first_name || '',
        last_name: staff.last_name || '',
        date_of_birth: staff.date_of_birth || '',
        place_of_birth: staff.place_of_birth || '',
        rank_id: staff.rank_id || '',
        position: staff.position || '',
        department_id: staff.department_id || '',
        unit_id: staff.unit_id || '',
        date_of_enlistment: staff.date_of_enlistment || '',
        commission_type: staff.commission_type || '',
        contact_number: staff.contact_number || '',
        intake_name: staff.intake_name || '',
        email_address: staff.email_address || '',
        gender: staff.gender || '',
        religion_id: staff.religion_id || '',
        status: staff.status || '',
        blood_group_id: staff.blood_group_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('staff.update', staff.id), { // Use PUT or PATCH for updating existing staff
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Staff member updated successfully!',
                    toast: true,
                    position: 'top-end',
                    timer: 3000,
                    showConfirmButton: false,
                });
                reset();  // Reset form data after successful submission
            },
            onError: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error while updating the staff member.',
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
            <Head title="Edit Staff" />

            {/* Back Button */}
            <div className="mb-4 mt-4 max-w-4xl mx-auto">
                <Link
                    href={route('staff.index')}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    &larr; Back to Staff Directory
                </Link>
            </div>

            <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">

                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Edit Staff</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form fields here */}
                    {/* For example: */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300">First Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                required
                            />
                            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                        </div>

                        {/* Add other form fields similarly */}

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </AuthenticatedLayout>
    );
}
