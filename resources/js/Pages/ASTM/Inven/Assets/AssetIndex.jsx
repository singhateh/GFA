import React, { useState } from "react";
import { usePage, router, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AssetTable from "./AssetTable";
import { FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";


export default function AssetIndex() {
    const { assets } = usePage().props;

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
                router.delete(`/assets/${id}`);
                Swal.fire("Deleted!", "The asset has been deleted.", "success");
            }
        });
    };

    const handleEdit = (id) => {
        router.get(route('assets.edit', id));
    };


    const handleBorrow = (id) => {
        router.get(route('assignments.create', id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manage Assets" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Assets</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Approve and track employee leave requests and vacation days.
                        </p>
                    </div>
                    <Link
                        href={route('asset-management')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        ← Back to ASSET
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
                        href={route('assets.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                        <FaUserPlus /> Add New Asset
                    </Link>
                </div>
                <AssetTable assets={assets}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onBorrow={handleBorrow}
                />
            </div>
        </AuthenticatedLayout>
    );
}
