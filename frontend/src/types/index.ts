export interface User {
    id: number;
    name: string;
    email: string;
    role: 'client' | 'coach';
    coach_id?: number;
    created_at: string;
    updated_at: string;
}

export interface CheckIn {
    id: number;
    user_id: number;
    check_in_date: string;
    mood: number;
    craving_level: number;
    attended_meeting: boolean;
    fresh_start: boolean;
    notes?: string;
    created_at: string;
    updated_at: string;
}

export interface Streak {
    current_streak: number;
    longest_streak: number;
    last_check_in_date?: string;
}

export interface CheckInFormData {
    check_in_date: string;
    mood: number;
    craving_level: number;
    attended_meeting: boolean;
    fresh_start: boolean;
    notes?: string;
}
