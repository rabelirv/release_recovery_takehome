import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { checkInApi } from '../api/services';
import type { CheckInFormData } from '../types';

export const useCheckIns = (userId?: number) => {
    return useQuery({
        queryKey: ['checkIns', userId],
        queryFn: async () => {
            const response = await checkInApi.getAll(userId);
            return response.data;
        },
    });
};

export const useCreateCheckIn = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CheckInFormData & { user_id: number }) => {
            const response = await checkInApi.create(data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['checkIns'] });
            queryClient.invalidateQueries({ queryKey: ['streaks'] });
        },
    });
};
