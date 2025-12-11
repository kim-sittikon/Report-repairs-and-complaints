import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import AdminDashboard from '@/Components/Dashboards/AdminDashboard';
import RepairDashboard from '@/Components/Dashboards/RepairDashboard';
import ComplaintDashboard from '@/Components/Dashboards/ComplaintDashboard';
import UserHistory from '@/Components/Dashboards/UserHistory';
import LandingPage from '@/Components/Groups/Common/LandingPage';

// Determine which view to show based on query param and strict permission
const DashboardContent = ({ view, user, urgentNews, generalNews }) => {
    // Security Checks: Fallback to History if no permission
    if (view === 'admin' && user.job_admin) return <AdminDashboard />;
    if (view === 'repair' && user.job_repair) return <RepairDashboard />;
    if (view === 'complaint' && user.job_complaint) return <ComplaintDashboard />;

    // Explicit History View
    if (view === 'history') return <UserHistory urgentNews={urgentNews} generalNews={generalNews} />;

    // Fallback?
    return <UserHistory urgentNews={urgentNews} generalNews={generalNews} />;
};

export default function Dashboard() {
    const { auth, urgent_news, general_news } = usePage().props;
    const user = auth.user;

    // Get URL query params
    const queryParams = new URLSearchParams(window.location.search);
    const view = queryParams.get('view');

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="">
                {/* Full Width Container Handling */}
                {!view ? (
                    <LandingPage />
                ) : (
                    <div className="py-2">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <DashboardContent view={view} user={user} urgentNews={urgent_news} generalNews={general_news} />
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
