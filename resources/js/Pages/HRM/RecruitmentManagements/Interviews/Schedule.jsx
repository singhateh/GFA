
import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const InterviewSchedule = ({ jobApplication }) => {
    const { data, setData, post, progress, processing } = useForm({
        scheduled_at: '',
        interview_type: '',
        status: 'Scheduled',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/recruitment/job-applications/${jobApplication.id}/interview`, data);
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Schedule Interview for ${jobApplication.candidate_name}`} />
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Schedule Interview for {jobApplication.candidate_name}</h1>
                    <Link href={route('recruitment.jobApplications.show', jobApplication)} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                        Back to show
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <label className="block text-gray-700 dark:text-gray-300">Scheduled At</label>
                            <input
                                type="datetime-local"
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                value={data.scheduled_at}
                                onChange={(e) => setData('scheduled_at', e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label className="block text-gray-700 dark:text-gray-300">Interview Type</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                value={data.interview_type}
                                onChange={(e) => setData('interview_type', e.target.value)}
                            >
                                <option value="Virtual">Virtual</option>
                                <option value="In-Person">In-Person</option>
                            </select>
                        </div>
                        <div className="form-group mb-4">
                            <label className="block text-gray-700 dark:text-gray-300">Status</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                            >
                                <option value="Scheduled">Scheduled</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                        {progress && <progress value={progress.percentage} max="100">{progress.percentage}%</progress>}

                        {/* Buttons */}
                        <div className="flex justify-between space-x-3 mt-3">
                            <Link href={route('recruitment.jobApplications.index')} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : '  Schedule Interview'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default InterviewSchedule;
