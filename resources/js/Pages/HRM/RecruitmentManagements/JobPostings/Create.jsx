import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const JobPostingsCreate = () => {
    const { data, setData, processing, post } = useForm({
        title: '',
        description: '',
        requirements: '',
        status: '',
        location: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('recruitment.jobPostings.store'), data);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Job Posting" />
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create Job Posting</h1>
                    <Link href={route('recruitment.jobPostings.index')} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                        Back to Postings
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <label htmlFor="title" className="block text-gray-700 dark:text-gray-300">Title</label>
                            <input
                                id="title"
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label className="block text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label className="block text-gray-700 dark:text-gray-300">Requirements</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                value={data.requirements}
                                onChange={(e) => setData('requirements', e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label className="block text-gray-700 dark:text-gray-300">Status</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Closed">Closed</option>
                                <option value="On Hold">On Hold</option>
                            </select>
                        </div>
                        <div className="form-group mb-4">
                            <label className="block text-gray-700 dark:text-gray-300">Location</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                            />
                        </div>
                        {/* Buttons */}
                        <div className="flex justify-end space-x-3">
                            <Link href={route('recruitment.jobPostings.index')} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Create Job Posting'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default JobPostingsCreate;
