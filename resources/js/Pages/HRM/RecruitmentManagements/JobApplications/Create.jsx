import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Swal from 'sweetalert2'; // Import Swal

const JobApplicationsCreate = ({ jobPosting, errors }) => {
    const { data, setData, post, processing, progress, reset } = useForm({
        candidate_name: '',
        email: '',
        resume: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('candidate_name', data.candidate_name);
        formData.append('email', data.email);
        if (data.resume) {
            formData.append('resume', data.resume);
        }

        post(route("recruitment.jobApplications.store", jobPosting), {
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },

            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Application Submitted!',
                    text: 'Your application has been successfully submitted.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                });
                reset(); // Clears form after success
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Failed to apply application!",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Apply for ${jobPosting.title}`} />
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Apply for {jobPosting.title}</h1>
                    <Link href={route('recruitment.jobPostings.show', jobPosting)} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                        Back to show
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="form-group mb-4">
                            <label htmlFor="candidate_name" className="block text-gray-700 dark:text-gray-300">Candidate Name</label>
                            <input
                                type="text"
                                id="candidate_name"
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                value={data.candidate_name}
                                onChange={(e) => setData('candidate_name', e.target.value)}
                                required
                            />
                            {errors.candidate_name && <p className="text-red-500 text-sm">{errors.candidate_name}</p>}
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="resume" className="block text-gray-700 dark:text-gray-300">Resume</label>
                            <input
                                type="file"
                                id="resume"
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                                onChange={(e) => setData('resume', e.target.files[0])}
                                required
                            />
                            {errors.resume && <p className="text-red-500 text-sm">{errors.resume}</p>}
                        </div>

                        {progress && <progress value={progress.percentage} max="100">{progress.percentage}%</progress>}

                        {/* Buttons */}
                        <div className="flex justify-end space-x-3 mt-3">
                            <Link href={route('recruitment.jobPostings.index')} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : ' Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default JobApplicationsCreate;
