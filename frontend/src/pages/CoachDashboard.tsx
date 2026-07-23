import Layout from '../components/Layout';
import { useUsers } from '../hooks/useUser';
import { useStreaks } from '../hooks/useUser';
import { User, Flame, Calendar, AlertCircle } from 'lucide-react';
import { format, parseISO, differenceInDays } from 'date-fns';

function ClientCard({ user }: { user: any }) {
    const { data: streaks } = useStreaks(user.id);

    const daysSinceLastCheckIn = user.last_check_in_date
        ? differenceInDays(new Date(), parseISO(user.last_check_in_date))
        : null;

    const missedYesterday = daysSinceLastCheckIn !== null && daysSinceLastCheckIn > 1;

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gray-100 rounded-full">
                        <User size={24} className="text-gray-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                </div>

                {missedYesterday && (
                    <div className="flex items-center gap-1 text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                        <AlertCircle size={16} />
                        <span className="text-sm font-semibold">Missed</span>
                    </div>
                )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Flame size={16} className="text-orange-600" />
                        <span className="text-xs font-semibold text-gray-700">Current Streak</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{streaks?.current_streak || 0}</p>
                    <p className="text-xs text-gray-600">days</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Calendar size={16} className="text-blue-600" />
                        <span className="text-xs font-semibold text-gray-700">Last Check-In</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                        {user.last_check_in_date
                            ? format(parseISO(user.last_check_in_date), 'MMM d')
                            : 'Never'}
                    </p>
                    <p className="text-xs text-gray-600">
                        {daysSinceLastCheckIn !== null
                            ? `${daysSinceLastCheckIn} days ago`
                            : ''}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function CoachDashboard() {
    const { data: users, isLoading, error } = useUsers();

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-500">Loading...</div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800">Error loading clients</p>
                </div>
            </Layout>
        );
    }

    const clients = users?.filter(u => u.role === 'client') || [];

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Coach Dashboard</h2>
                    <p className="text-gray-600 mt-1">Monitor your clients' progress</p>
                </div>

                {clients.length === 0 ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                        <p className="text-gray-600">No clients assigned yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clients.map((client) => (
                            <ClientCard key={client.id} user={client} />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}