import Layout from '../components/Layout';
import { useStreaks } from '../hooks/useUser';
import { CURRENT_USER_ID } from '../App';
import { Flame, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    const { data: streaks, isLoading, error } = useStreaks(CURRENT_USER_ID);

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
                    <p className="text-red-800">Error loading dashboard data</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Your Dashboard</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <Flame className="text-orange-600" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Current Streak</h3>
                        </div>
                        <p className="text-5xl font-bold text-gray-900">{streaks?.current_streak || 0}</p>
                        <p className="text-gray-600 mt-2">days strong</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <TrendingUp className="text-blue-600" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Longest Streak</h3>
                        </div>
                        <p className="text-5xl font-bold text-gray-900">{streaks?.longest_streak || 0}</p>
                        <p className="text-gray-600 mt-2">days record</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
