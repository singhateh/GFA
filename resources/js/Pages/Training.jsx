import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Training() {
    return (
        <AuthenticatedLayout>
            <Head title="Personnel Training" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Personnel Training</h1>
                <p>Monitor training programs and performance.</p>
            </div>
        </AuthenticatedLayout>
    );
}
