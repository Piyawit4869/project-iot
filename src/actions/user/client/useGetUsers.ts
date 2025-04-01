import { useQuery } from "@tanstack/react-query";
import { fetchMe, fetchUsers } from "../server/user";

export const useGetMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

export const useGetUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
