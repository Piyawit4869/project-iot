import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchAllOrders,
  fetchCreateCustomerOrder,
  fetchCreateOrder,
  fetchDeleteOrder,
  fetchExportPdf,
  fetchOrder,
  fetchOrderPagination,
  fetchOrderPaginationFilter,
  fetchOrderSummary,
  fetchUpdateOrder,
  fetchUpdateSignature,
} from "~/api/server/order/order";
import type { OrderFormValues } from "~/schemas/order/order";

export const useOrdersPaginate = ({
  pageIndex,
  pageSize = 20,
  status = "",
  limit,
  isAll,
  docName,
  docNo,
  name,
  profit,
  total,
  docStatus,
}: {
  pageIndex: number;
  pageSize: number;
  status: string;
  limit: number;
  isAll?: boolean;
  docName?: string;
  docNo?: string;
  name?: string;
  profit?: number;
  total?: number;
  docStatus?: string;
}) => {
  return useQuery({
    queryKey: [
      "paginate",
      pageIndex,
      pageSize,
      status,
      limit,
      docName,
      docNo,
      name,
      profit,
      total,
      docStatus,
    ],
    queryFn: () =>
      fetchOrderPagination({
        page: pageIndex,
        limit: isAll ? 0 : pageSize,
        status: status,
        docName,
        docNo,
        name,
        profit,
        total,
        docStatus,
      }),
  });
};

export const useOrdersPaginateFilter = ({
  pageIndex,
  pageSize = 20,
  isAll,
  customerId,
  sortField,
  sortingBy,
}: {
  pageIndex: number;
  pageSize: number;
  isAll?: boolean;
  customerId?: string;
  sortField?: string;
  sortingBy?: string;
}) => {
  return useQuery({
    queryKey: [
      "paginate",
      pageIndex,
      pageSize,
      customerId,
      sortField,
      sortingBy,
    ],
    queryFn: () =>
      fetchOrderPaginationFilter({
        page: pageIndex,
        itemsPerPage: pageSize,
        limit: isAll ? 0 : 10,
        customerId,
        sortField,
        sortingBy,
      }),
  });
};

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ["all-order"],
    queryFn: () => fetchAllOrders(),
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (values: OrderFormValues) => fetchCreateOrder(values),
  });
};

export const useUpdateOrder = (id: string) => {
  return useMutation({
    mutationFn: (values: OrderFormValues) => fetchUpdateOrder(id, values),
  });
};

export const useGetOrder = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrder(id),
    enabled: !!id,
  });
};

export const useDeleteOrder = () => {
  return useMutation({
    mutationFn: (id: string) => fetchDeleteOrder(id),
  });
};

export const useCreateCustomerOrder = () => {
  return useMutation({
    mutationFn: (values: any) => fetchCreateCustomerOrder(values),
  });
};

export const useUpdateSignature = () => {
  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: { signatureUrl: string };
    }) => fetchUpdateSignature(id, values),
  });
};

export const useExportPdf = () => {
  return useMutation({
    mutationFn: (payload: { id: string }) => fetchExportPdf(payload),
  });
};

export const useAllOrderSummary = () => {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: () => fetchOrderSummary(),
    enabled: true,
  });
};
