import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Medical() {
    return (
        <AuthenticatedLayout>
            <Head title="Medical Records" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Medical Records</h1>
                <p>Manage medical checkups and health records.</p>
            </div>
        </AuthenticatedLayout>
    );
}
