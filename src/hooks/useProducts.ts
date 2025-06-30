import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import {
  Category,
  Product,
  ProductDetails,
  ResponseAllProducts,
  ResponseProductById,
  ResponseMessage,
} from "@/types";
import { useAuthStore } from "@/context/useAuthStore";

export const useAllProducts = () => {
  return useQuery<Category[]>({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await api.get<ResponseAllProducts>("/all-product/");
      return res.data.categories;
    },
  });
};

export const useProductById = (productId: number) => {
  return useQuery<ProductDetails>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await api.get<ResponseProductById>(`/product/${productId}`);
      return res.data.product;
    },
    enabled: !!productId,
  });
};

export const useMyProducts = () => {
  const { token } = useAuthStore();

  return useQuery<Product[]>({
    queryKey: ["my-products"],
    queryFn: async () => {
      const res = await api.get<{ message: string; products: Product[] }>(
        "/product/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.products;
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
  });
};


export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();

  return useMutation({
    mutationFn: async ({
      productId,
      data,
    }: {
      productId: number;
      data: Partial<Omit<Product, "id" | "createdAt" | "updatedAt" | "imageUrl">>;
    }) => {
      const res = await api.put(`/product/${productId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
  });
};


export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();

  return useMutation({
    mutationFn: async (productId: number) => {
      const res = await api.delete<ResponseMessage>(`/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
  });
};

