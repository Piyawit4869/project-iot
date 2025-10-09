import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchLoginlog } from "~/api/server/login-log/login-log";

export const useLoginLogPaginate = ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  return useQuery({
    queryKey: ["paginate-login", pageIndex, pageSize],
    queryFn: () => fetchLoginlog({ page: pageIndex, limit: 20 }),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex && !!pageSize,
  });
};
