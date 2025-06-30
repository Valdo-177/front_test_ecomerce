// hooks/useOrders.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useCartStore } from "@/context/useCartStore";
import { useAuthStore } from "@/context/useAuthStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Order } from "@/types";

// Utilidad para extraer mensaje de error
const getErrorMessage = (error: unknown): string => {
    if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        (error as any).response?.data?.message
    ) {
        return (error as any).response.data.message;
    }
    return "An unexpected error occurred. Please try again.";
};

export const useCreateOrder = () => {
    const clearCart = useCartStore((state) => state.clearCart);
    const queryClient = useQueryClient();
    const token = useAuthStore((state) => state.token);
    const router = useRouter();

    return useMutation({
        mutationFn: async () => {
            const items = useCartStore.getState().items.map((item) => ({
                productId: item.product.id,
                quantity: item.quantity,
            }));

            const res = await api.post(
                "/order",
                { items },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return res.data;
        },
        onSuccess: () => {
            clearCart();
            queryClient.invalidateQueries({ queryKey: ["my-orders"] });
            toast.success("Order created successfully");
            router.push("/");
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
            console.error("Error creating order:", error);
        },
    });
};

export const useAllOrders = () => {
    const token = useAuthStore((s) => s.token);

    return useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await api.get("/admin/orders", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        },
    });
};

export const useUpdateOrder = () => {
    const token = useAuthStore((s) => s.token);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, items }: { id: number; items: { productId: number; quantity: number }[] }) =>
            api.put(`/order/${id}`, { items }, {
                headers: { Authorization: `Bearer ${token}` },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success("Order updated successfully");
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
            console.error("Error updating order:", error);
        },
    });
};

export const useMyOrders = () => {
    const { token } = useAuthStore();

    return useQuery<Order[]>({
        queryKey: ['my-orders'],
        queryFn: async () => {
            const res = await api.get<{ orders: Order[] }>('/orders', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.data.orders;
        },
    });
};


export const useDeleteOrder = () => {
    const token = useAuthStore((s) => s.token);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            api.delete(`/order/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success("Order deleted successfully");
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
            console.error("Error deleting order:", error);
        },
    });
};

export const useUpdateOrderStatus = () => {
    const token = useAuthStore((s) => s.token);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: number; status: "PENDING" | "SHIPPED" | "DELIVERED" }) =>
            api.put(`/order/${id}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success("Order status updated");
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
            console.error("Error updating status:", error);
        },
    });
};
