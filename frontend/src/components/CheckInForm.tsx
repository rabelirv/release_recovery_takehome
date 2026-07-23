import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateCheckIn } from '../hooks/useCheckIns';
import { CURRENT_USER_ID } from '../App';
import { Smile, Meh, Frown, Droplet, Calendar, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

const checkInSchema = z.object({
    date: z.string(),
    mood: z.number().min(1).max(5),
    craving_level: z.number().min(1).max(5),
    attended_meeting: z.boolean(),
    fresh_start: z.boolean(),
    notes: z.string().optional(),
});

type CheckInFormData = z.infer<typeof checkInSchema>;

export default function CheckInForm() {
    const createCheckIn = useCreateCheckIn();

    const { register, handleSubmit, watch } = useForm<CheckInFormData>({
        resolver: zodResolver(checkInSchema),
        defaultValues: {
            date: format(new Date(), 'yyyy-MM-dd'),
            mood: 3,
            craving_level: 3,
            attended_meeting: false,
            fresh_start: false,
            notes: '',
        },
    });

    const mood = watch('mood');
    const cravingLevel = watch('craving_level');

    const onSubmit = (data: CheckInFormData) => {
        createCheckIn.mutate({
            ...data,
            user_id: CURRENT_USER_ID,
        });
    };

    const getMoodEmoji = (value: number) => {
        if (value <= 2) return <Frown className="text-red-500" size={24} />;
        if (value === 3) return <Meh className="text-yellow-500" size={24} />;
        return <Smile className="text-green-500" size={24} />;
    };

    if (createCheckIn.isSuccess) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-2">Check-in submitted! 🎉</h3>
                <p className="text-green-700">Great job staying accountable today.</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Today's Check-In</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Date */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Calendar size={18} />
                        Date
                    </label>
                    <input
                        type="date"
                        {...register('date')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                </div>

                {/* Mood Slider */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        {getMoodEmoji(mood)}
                        Mood: {mood}/5
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        {...register('mood', { valueAsNumber: true })}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Low</span>
                        <span>High</span>
                    </div>
                </div>

                {/* Craving Level Slider */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Droplet size={18} />
                        Craving Level: {cravingLevel}/5
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        {...register('craving_level', { valueAsNumber: true })}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Low</span>
                        <span>High</span>
                    </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            {...register('attended_meeting')}
                            className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className="text-sm font-medium text-gray-700">Attended a meeting today</span>
                    </label>

                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            {...register('fresh_start')}
                            className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className="text-sm font-medium text-gray-700">Fresh start (reset streak)</span>
                    </label>
                </div>

                {/* Notes */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <MessageSquare size={18} />
                        Notes (optional)
                    </label>
                    <textarea
                        {...register('notes')}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="How are you feeling today?"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={createCheckIn.isPending}
                    className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                >
                    {createCheckIn.isPending ? 'Submitting...' : 'Submit Check-In'}
                </button>

                {createCheckIn.isError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-800 text-sm">Error submitting check-in. Please try again.</p>
                    </div>
                )}
            </form>
        </div>
    );
}