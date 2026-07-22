import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api/services';

export const useUser = (id: number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const response = await userApi.getById(id);
            return response.data;
        },
    });
};

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await userApi.getAll();
            return response.data;
        },
    });
};

export const useStreaks = (userId: number) => {
    return useQuery({
        queryKey: ['streaks', userId],
        queryFn: async () => {
            const response = await userApi.getStreaks(userId);
            return response.data;
        },
    });
};
