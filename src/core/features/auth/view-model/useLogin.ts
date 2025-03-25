import { useAuthStore } from "@/core/stores/auth/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { login } from "../controller/auth.actions";

export const useLogin = () => {
  const setToken = useAuthStore((s) => s.setToken);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      setToken(data.token);
    },
  });
};
