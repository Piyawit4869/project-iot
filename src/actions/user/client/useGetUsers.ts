import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../server/user";

export const useGetUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
