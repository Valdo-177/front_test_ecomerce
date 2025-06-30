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

// Obtener todos los productos agrupados por categoría
export const useAllProducts = () => {
  return useQuery<Category[]>({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await api.get<ResponseAllProducts>("/all-product/");
      return res.data.categories;
    },
  });
};

// Obtener detalle de producto por ID
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

// Obtener productos del usuario autenticado (SELLER o ADMIN)
export const useMyProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["my-products"],
    queryFn: async () => {
      const res = await api.get<{ message: string; products: Product[] }>("/product/");
      return res.data.products;
    },
  });
};

// Crear producto
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
  });
};

// Actualizar producto
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      data,
    }: {
      productId: number;
      data: Partial<Omit<Product, "id" | "createdAt" | "updatedAt" | "imageUrl">>;
    }) => {
      const res = await api.put(`/product/${productId}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
  });
};

// Eliminar producto
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number) => {
      const res = await api.delete<ResponseMessage>(`/product/${productId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
  });
};
