import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Peacekeeping() {
    return (
        <AuthenticatedLayout>
            <Head title="Peacekeeping Operations" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Peacekeeping Operations</h1>
                <p>Track peacekeeping missions and assignments.</p>
            </div>
        </AuthenticatedLayout>
    );
}
