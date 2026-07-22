import apiClient from './client';
import type { User, CheckIn, Streak, CheckInFormData } from '../types';

// User endpoints
export const userApi = {
    getAll: () => apiClient.get<User[]>('/users'),
    getById: (id: number) => apiClient.get<User>(`/users/${id}`),
    create: (data: Partial<User>) => apiClient.post<User>('/users', data),
    update: (id: number, data: Partial<User>) => apiClient.patch<User>(`/users/${id}`, data),
    delete: (id: number) => apiClient.delete(`/users/${id}`),
    getStreaks: (id: number) => apiClient.get<Streak>(`/users/${id}/streaks`),
};

// CheckIn endpoints
export const checkInApi = {
    getAll: (userId?: number) => {
        const params = userId ? { user_id: userId } : {};
        return apiClient.get<CheckIn[]>('/check_ins', { params });
    },
    getById: (id: number) => apiClient.get<CheckIn>(`/check_ins/${id}`),
    create: (data: CheckInFormData & { user_id: number }) =>
        apiClient.post<CheckIn>('/check_ins', data),
    update: (id: number, data: Partial<CheckInFormData>) =>
        apiClient.patch<CheckIn>(`/check_ins/${id}`, data),
    delete: (id: number) => apiClient.delete(`/check_ins/${id}`),
};
