import { useCheckIns } from '../hooks/useCheckIns';
import { CURRENT_USER_ID } from '../App';
import { format } from 'date-fns';
import { Calendar, Smile, Meh, Frown, Droplet, CheckCircle } from 'lucide-react';

export default function RecentCheckIns() {
    const { data: checkIns, isLoading } = useCheckIns(CURRENT_USER_ID);

    if (isLoading) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Check-Ins</h3>
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    const recentCheckIns = checkIns?.slice(0, 7) || [];

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

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Check-Ins</h3>

            {recentCheckIns.length === 0 ? (
                <p className="text-gray-500">No check-ins yet. Submit your first one above!</p>
            ) : (
                <div className="space-y-3">
                    {recentCheckIns.map((checkIn) => (
                        <div
                            key={checkIn.id}
                            className={`border rounded-lg p-4 ${getMoodColor(checkIn.mood)}`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <Calendar size={18} className="text-gray-600 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {format(new Date(checkIn.check_in_date), 'EEEE, MMM d, yyyy')}
                                        </p>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-700">
                                            <div className="flex items-center gap-1">
                                                {getMoodIcon(checkIn.mood)}
                                                <span>Mood: {checkIn.mood}/5</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Droplet size={16} className="text-blue-500" />
                                                <span>Craving: {checkIn.craving_level}/5</span>
                                            </div>
                                            {checkIn.attended_meeting && (
                                                <div className="flex items-center gap-1 text-green-700">
                                                    <CheckCircle size={16} />
                                                    <span>Meeting</span>
                                                </div>
                                            )}
                                            {checkIn.fresh_start && (
                                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold">
                          Fresh Start
                        </span>
                                            )}
                                        </div>
                                        {checkIn.notes && (
                                            <p className="mt-2 text-sm text-gray-600 italic">"{checkIn.notes}"</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}