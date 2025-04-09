import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  // fetchCreateProducts,
  fetchMe,
  fetchProducts,
} from "../server/products";
import { useSession } from "next-auth/react";

export const useGetMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

export const usePaginate = ({
  pageIndex,
  pageSize = 10,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useQuery({
    queryKey: ["paginate", pageIndex, pageSize],
    queryFn: () =>
      fetchProducts({ page: pageIndex, itemsPerPage: pageSize }, accessToken),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex && !!pageSize && !!accessToken,
  });
};

// export const useCreate = ({CreateFormValues}) => {
//   const data = useSession();
//   const userDetails = data.data?.user;

//   const user = userDetails as { user: { auth: { accessToken: string } } };
//   const accessToken = user?.user?.auth?.accessToken;

//   return useQuery({
//     queryKey: ["paginate", pageIndex, pageSize],
//     queryFn: () =>
//       fetchCreateProducts(
//         {values.name,
//       values.description,
//       values.quantity,
//       values.price,
//       values.discount,
//       values.total},
//         accessToken
//       ),
//     placeholderData: keepPreviousData,
//     enabled: !!pageIndex && !!pageSize && !!accessToken,
//   });
// };

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: fetchMe,
  });
