import { useForm, Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect } from 'react';

export default function CreateAttendance({ staffLists }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        staff_member_id: '',
        date: new Date().toISOString().split('T')[0],  // Defaults to today
        check_in: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        check_out: '',
    });

    useEffect(() => {
        if (data.staff_member_id) {
            // Fetch additional staff details if needed
        }
    }, [data.staff_member_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('attendance.store'), {
            onSuccess: () => {
                reset();  // Clear form after successful submission
                alert('Attendance recorded successfully!'); // Use SweetAlert if preferred
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Attendance" />
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mark Attendance</h1>
                    <Link href={route('attendance.index')} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                        Back
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Staff Selection */}
                        <div>
                            <label htmlFor="staff_member_id" className="block text-gray-700 dark:text-gray-300">Select Staff</label>
                            <select
                                id="staff_member_id"
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                value={data.staff_member_id}
                                onChange={(e) => setData('staff_member_id', e.target.value)}
                            >
                                <option value="">-- Select Staff --</option>
                                {staffLists.map((staff) => (
                                    <option key={staff.id} value={staff.id}>
                                        {staff.name} - {staff.position}
                                    </option>
                                ))}
                            </select>
                            {errors.staff_member_id && <p className="text-red-500 text-sm">{errors.staff_member_id}</p>}
                        </div>

                        {/* Date */}
                        <FormInput
                            label="Date"
                            id="date"
                            type="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            error={errors.date}
                        />

                        {/* Check-in Time */}
                        <FormInput
                            label="Check-in Time"
                            id="check_in"
                            type="time"
                            value={data.check_in}
                            onChange={(e) => setData('check_in', e.target.value)}
                            error={errors.check_in}
                        />

                        {/* Check-out Time */}
                        <FormInput
                            label="Check-out Time"
                            id="check_out"
                            type="time"
                            value={data.check_out}
                            onChange={(e) => setData('check_out', e.target.value)}
                            error={errors.check_out}
                        />

                        {/* Buttons */}
                        <div className="flex justify-end space-x-3">
                            <Link href={route('attendance.index')} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Mark Attendance'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Reusable Form Input Component
const FormInput = ({ label, id, type, value, onChange, error }) => (
    <div>
        <label htmlFor={id} className="block text-gray-700 dark:text-gray-300">{label}</label>
        <input
            id={id}
            type={type}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
            value={value}
            onChange={onChange}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);
