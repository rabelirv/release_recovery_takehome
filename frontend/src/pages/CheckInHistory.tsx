import Layout from '../components/Layout';
import { useCheckIns } from '../hooks/useCheckIns';
import { CURRENT_USER_ID } from '../App';
import { format } from 'date-fns';
import { Calendar, Smile, Meh, Frown, Droplet, CheckCircle, MessageSquare } from 'lucide-react';

export default function CheckInHistory() {
    const { data: checkIns, isLoading, error } = useCheckIns(CURRENT_USER_ID);

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
                    <p className="text-red-800">Error loading check-in history</p>
                </div>
            </Layout>
        );
    }

    const getMoodIcon = (mood: number) => {
        if (mood <= 2) return <Frown className="text-red-500" size={20} />;
        if (mood === 3) return <Meh className="text-yellow-500" size={20} />;
        return <Smile className="text-green-500" size={20} />;
    };

    const getMoodColor = (mood: number) => {
        if (mood <= 2) return 'bg-red-50 border-red-200';
        if (mood === 3) return 'bg-yellow-50 border-yellow-200';
        return 'bg-green-50 border-green-200';
    };

    const getMoodLabel = (mood: number) => {
        if (mood <= 2) return 'Low';
        if (mood === 3) return 'Neutral';
        return 'Good';
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Check-In History</h2>
                    <p className="text-gray-600 mt-1">View all your check-ins</p>
                </div>

                {!checkIns || checkIns.length === 0 ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                        <Calendar size={48} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No check-ins yet. Start your journey today!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {checkIns.map((checkIn) => (
                            <div
                                key={checkIn.id}
                                className={`border rounded-lg p-6 ${getMoodColor(checkIn.mood)}`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg">
                                            <Calendar size={20} className="text-gray-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {format(new Date(checkIn.date), 'EEEE, MMMM d, yyyy')}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Submitted {format(new Date(checkIn.created_at), 'MMM d, yyyy h:mm a')}
                                            </p>
                                        </div>
                                    </div>

                                    {checkIn.fresh_start && (
                                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                      Fresh Start
                    </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            {getMoodIcon(checkIn.mood)}
                                            <span className="text-sm font-semibold text-gray-700">Mood</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{checkIn.mood}/5</p>
                                        <p className="text-sm text-gray-600">{getMoodLabel(checkIn.mood)}</p>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Droplet size={20} className="text-blue-500" />
                                            <span className="text-sm font-semibold text-gray-700">Craving Level</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{checkIn.craving_level}/5</p>
                                        <p className="text-sm text-gray-600">
                                            {checkIn.craving_level <= 2 ? 'Low' : checkIn.craving_level === 3 ? 'Moderate' : 'High'}
                                        </p>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle size={20} className="text-green-500" />
                                            <span className="text-sm font-semibold text-gray-700">Meeting</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {checkIn.attended_meeting ? 'Yes' : 'No'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {checkIn.attended_meeting ? 'Attended' : 'Not attended'}
                                        </p>
                                    </div>
                                </div>

                                {checkIn.notes && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MessageSquare size={18} className="text-gray-600" />
                                            <span className="text-sm font-semibold text-gray-700">Notes</span>
                                        </div>
                                        <p className="text-gray-800">{checkIn.notes}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}