import React, { useState } from "react";
import { usePage, router, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaUserPlus } from "react-icons/fa";
import TrainingTable from "./Table";
import Swal from "sweetalert2";

export default function TrainingIndex({ trainingCourses }) {

    const handleEdit = (assignment) => {
        router.get(route('courses.edit', assignment));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('courses.destroy', id), {
                    onSuccess: () => {
                        Swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "success",
                            title: "Assignment deleted successfully",
                            showConfirmButton: false,
                            timer: 3000
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "error",
                            title: "Something went wrong",
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }
                });
            }
        });
    };
    return (
        <AuthenticatedLayout>
            <Head title="Manage Training Courses" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Training Courses</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Approve and track employee leave requests and vacation days.
                        </p>
                    </div>
                    <Link
                        href={route('training')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to Training
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
                        href={route('courses.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                        <FaUserPlus /> Add New Course
                    </Link>
                </div>
                <TrainingTable trainingCourses={trainingCourses}
                    onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </AuthenticatedLayout>
    );
}
