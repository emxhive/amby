import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <div className="grid gap-4">
                <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <h3 className="font-semibold">Welcome to Admin Dashboard</h3>
                        <p className="text-sm text-muted-foreground">Manage your application from here.</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
