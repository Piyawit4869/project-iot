import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchLoginlog } from "~/api/server/login-log/login-log";

export const useLoginLogPaginate = ({
  pageIndex,
  pageSize,
  name,
  email,
  event,
  createdFrom,
  createdTo,
}: {
  pageIndex: number;
  pageSize: number;
  name?: string;
  email?: string;
  event?: string;
  createdFrom?: string;
  createdTo?: string;
}) => {
  return useQuery({
    queryKey: [
      "paginate-login",
      pageIndex,
      pageSize,
      name,
      email,
      event,
      createdFrom,
      createdTo,
    ],
    queryFn: () =>
      fetchLoginlog({
        page: pageIndex,
        limit: 20,
        name,
        email,
        event,
        createdFrom,
        createdTo,
      }),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex && !!pageSize,
  });
};
