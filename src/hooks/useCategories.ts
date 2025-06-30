import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Category, ResponseProductsByCategory } from "@/types";

export const useAllCategories = () => {
    return useQuery<Category[]>({
        queryKey: ["all-categories"],
        queryFn: async () => {
            const res = await api.get("/categories");
            return res.data.categories;
        },
    });
};

export const useCategoryProducts = (categoryId: number, page = 1, limit = 10) => {
    return useQuery<ResponseProductsByCategory>({
        queryKey: ["category-products", categoryId, page, limit],
        queryFn: async () => {
            const res = await api.get(`/categories/${categoryId}/products`, {
                params: { page, limit },
            });
            return res.data;
        },
        enabled: !!categoryId,
    });
};
