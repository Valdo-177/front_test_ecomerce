import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await api.get("/all-product/");
      return res.data.categories; 
    },
  });
};
