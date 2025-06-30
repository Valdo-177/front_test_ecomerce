import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface LoginInput {
  email: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const res = await api.post("/auth/register", data);
      return res.data;
    },
  });
}
