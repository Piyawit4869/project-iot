import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../controller/user.actions";

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
