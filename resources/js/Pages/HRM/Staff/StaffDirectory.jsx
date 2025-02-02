import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaUserPlus, FaEdit, FaTrash, FaStreetView } from 'react-icons/fa';
import axios from 'axios'; // Make sure to import axios
import Swal from 'sweetalert2';

export default function StaffDirectory({ staffs }) {

    const handleDelete = (id) => {
        // Confirmation prompt before deletion
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the staff member.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Make the delete request if confirmed
                axios
                    .delete(route('staff.destroy', id)) // Adjust the route as needed
                    .then(() => {
                        Swal.fire('Deleted!', 'The staff member has been deleted.', 'success');
                        // Optionally refresh or update the list of staff
                        window.location.reload(); // Reload the page to show the updated staff list
                    })
                    .catch((error) => {
                        Swal.fire('Error!', 'There was an error deleting the staff member.', 'error');
                    });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Staff Directory" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Staff Directory</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            View and manage all staff, their details, and contact information.
                        </p>
                    </div>
                    <Link
                        href={route('hr-management')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to HRM
                    </Link>

                </div>

                {/* Filters & Add Button - Flex Container */}
                <div className="flex justify-between items-center mb-4">
                    {/* Filters (Left) */}
                    <div>
                        <input
                            type="text"
                            placeholder="Search staff..."
                            className="border border-gray-300 rounded-lg px-4 py-2 w-72 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Add Staff Button (Right) */}
                    <Link
                        href={route('staff.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                        <FaUserPlus /> Add New Staff
                    </Link>
                </div>

                {/* Staff List Table */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    <table className="w-full border-collapse table-auto">
                        <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Position</th>
                                <th className="py-3 px-4 text-left">Department</th>
                                <th className="py-3 px-4 text-left">Unit</th>
                                <th className="py-3 px-4 text-left">Enlistment Date</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffs.data.length > 0 ? (
                                staffs.data.map((employee) => (
                                    <tr key={employee.id} className="border-b hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                        <td className="py-3 px-4">{employee.first_name} {employee.last_name}</td>
                                        <td className="py-3 px-4">{employee.email_address}</td>
                                        <td className="py-3 px-4">{employee.position}</td>
                                        <td className="py-3 px-4">{employee.department.name}</td>
                                        <td className="py-3 px-4">{employee.unit.unit_name}</td>
                                        <td className="py-3 px-4">{employee.date_of_enlistment}</td>
                                        <td className="py-3 px-4 flex gap-2">
                                            <Link
                                                href={route('staff.show', employee.id)}
                                                className="text-orange-500 hover:text-orange-700"
                                            >
                                                <FaStreetView />
                                            </Link>
                                            <Link
                                                href={route('staff.edit', employee.id)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <FaEdit />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(employee.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                                        No staff members found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    {staffs.links && (
                        <div className="flex justify-center mt-4">
                            <nav className="flex items-center space-x-2">
                                {/* Previous Page Link */}
                                {staffs.prev_page_url && (
                                    <Link
                                        href={staffs.prev_page_url}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    >
                                        Prev
                                    </Link>
                                )}

                                {/* Next Page Link */}
                                {staffs.next_page_url && (
                                    <Link
                                        href={staffs.next_page_url}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    >
                                        Next
                                    </Link>
                                )}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
