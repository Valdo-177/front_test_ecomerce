"use client"

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useAuthStore } from '@/context/useAuthStore';

export const useAllUsers = () => {
    const token = useAuthStore((state) => state.token);

    return useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await api.get('/users/get-all-users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        },
    });
};

export const useDeleteUser = () => {
    const token = useAuthStore((s) => s.token);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            api.delete(`/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-users'] }),
    });
};

export const useReactivateUser = () => {
    const token = useAuthStore((s) => s.token);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            api.put(`/user/reactive/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-users'] }),
    });
};
