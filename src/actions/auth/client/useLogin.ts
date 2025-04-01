import { login } from "@/actions/auth/server/auth";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const setToken = useAuthStore((s) => s.setToken);

  return useMutation({
    mutationFn: ({ user, password }: { user: string; password: string }) =>
      login(user, password),
    onSuccess: (data) => {
      setToken(data.token);
    },
  });
};
