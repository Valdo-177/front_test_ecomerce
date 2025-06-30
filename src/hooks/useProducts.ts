import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Category, Product, ProductDetails, ResponseAllProducts, ResponseProductById } from "@/types";

export const useAllProducts = () => {
  return useQuery<Category[] | undefined>({
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