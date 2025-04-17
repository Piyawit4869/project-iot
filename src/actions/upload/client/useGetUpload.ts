import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchUpload, fetchMe } from "../server/upload";

export const useGetMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

export const useUpload = () => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useMutation({
    mutationFn: (formData: FormData) => fetchUpload(formData, accessToken),
  });
};
