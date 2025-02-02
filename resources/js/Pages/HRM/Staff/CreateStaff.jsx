import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function CreateStaff({ staff, ranks, departments, units, religions, bloodGroups, positions, commissionTypes }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        first_name: staff?.first_name || '',
        last_name: staff?.last_name || '',
        date_of_birth: staff?.date_of_birth || '',
        place_of_birth: staff?.place_of_birth || '',
        rank_id: staff?.rank_id || '',
        position: staff?.position || '',
        department_id: staff?.department_id || '',
        unit_id: staff?.unit_id || '',
        date_of_enlistment: staff?.date_of_enlistment || '',
        commission_type: staff?.commission_type || '',
        contact_number: staff?.contact_number || '',
        intake_name: staff?.intake_name || '',
        email_address: staff?.email_address || '',
        gender: staff?.gender || '',
        religion_id: staff?.religion_id || '',
        status: staff?.status || '',
        blood_group_id: staff?.blood_group_id || '',
    });




    const handleSubmit = (e) => {
        e.preventDefault();

        const staffId = staff?.id;

        const updateOrCreate = staffId
            ? route('staff.update', staffId) // Use correct route for update
            : route('staff.store'); // Correct route for store

        const method = staffId ? put : post; // Use `put` for update, `post` for create


        method(updateOrCreate, {
            data: { ...data }, // Spread form data here
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Staff member added successfully!',
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
                    text: 'There was an error while adding the staff member.',
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
            <Head title="Add Staff" />

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

                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Add New Staff</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
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

                        {/* Last Name */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300">Last Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                required
                            />
                            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300">Date of Birth</label>
                            <input
                                type="date"
                                className="w-full p-2 border rounded"
                                value={data.date_of_birth}
                                onChange={(e) => setData('date_of_birth', e.target.value)}
                                required
                            />
                            {errors.date_of_birth && <p className="text-red-500 text-sm">{errors.date_of_birth}</p>}
                        </div>

                        {/* Place of Birth */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300">Place of Birth</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={data.place_of_birth}
                                onChange={(e) => setData('place_of_birth', e.target.value)}
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300">Gender</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={data.gender}
                                onChange={(e) => setData('gender', e.target.value)}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Religion */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300">Religion</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={data.religion_id}
                                onChange={(e) => setData('religion_id', e.target.value)}
                            >
                                <option value="">Select Religion</option>
                                {religions.map((religion) => (
                                    <option key={religion.id} value={religion.id}>
                                        {religion.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Rank */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300">Rank</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={data.rank_id}
                                onChange={(e) => setData('rank_id', e.target.value)}
                            >
                                <option value="">Select Rank</option>
                                {ranks.map((rank) => (
                                    <option key={rank.id} value={rank.id}>
                                        {rank.rank_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Position */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300">Position</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={data.position}
                                onChange={(e) => setData('position', e.target.value)}
                            >
                                <option value="">Select Position</option>
                                {positions.map((position) => (
                                    <option key={position.id} value={position.id}>
                                        {position.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Commission Type */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300">Commission Type</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={data.commission_type}
                                onChange={(e) => setData('commission_type', e.target.value)}
                            >
                                <option value="">Select Commission Type</option>
                                {commissionTypes.map((commission) => (
                                    <option key={commission.id} value={commission.id}>
                                        {commission.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Department */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300">Department</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={data.department_id}
                                onChange={(e) => setData('department_id', e.target.value)}
                            >
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Unit */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300">Unit</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={data.unit_id}
                                onChange={(e) => setData('unit_id', e.target.value)}
                            >
                                <option value="">Select Unit</option>
                                {units.map((unit) => (
                                    <option key={unit.id} value={unit.id}>
                                        {unit.unit_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300">Email Address</label>
                            <input
                                type="email"
                                className="w-full p-2 border rounded"
                                value={data.email_address}
                                onChange={(e) => setData('email_address', e.target.value)}
                                required
                            />
                            {errors.email_address && <p className="text-red-500 text-sm">{errors.email_address}</p>}
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300">Contact Number</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={data.contact_number}
                                onChange={(e) => setData('contact_number', e.target.value)}
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-gray-600 dark:text-gray-300">Status</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Retired">Retired</option>
                                <option value="Deceased">Deceased</option>
                            </select>
                        </div>
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label className="block text-gray-600 dark:text-gray-300">Blood Group</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={data.bloodGroup_id}
                            onChange={(e) => setData('bloodGroup_id', e.target.value)}
                        >
                            <option value="">Select Blood Group</option>
                            {bloodGroups.map((bloodGroup) => (
                                <option key={bloodGroup.id} value={bloodGroup.id}>
                                    {bloodGroup.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                            disabled={processing}
                        >
                            {processing ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>

            </div>
        </AuthenticatedLayout>
    );
}
