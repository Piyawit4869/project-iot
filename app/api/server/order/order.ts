"use server";

import { ApiConfig } from "~/api/config";
import type {
  CreateCRUDOrderInput,
  OrderFormValues,
} from "~/schemas/order/order";

export const fetchOrderPagination = async (params: {
  page: number;
  itemsPerPage?: number;
  status: string;
  limit?: number;
}) => {
  try {
    const p = Object.assign({});
    p.page = params.page;
    p.limit = params.limit;
    if (params.status && params.status !== "all") {
      p.status = params.status;
    }

    const res = await ApiConfig.get(`/crud/orders/paginate`, {
      params: p,
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchOrderPaginationFilter = async (params: {
  page: number;
  itemsPerPage: number;
  limit?: number;
  customerId?: string;
}) => {
  try {
    const res = await ApiConfig.get(`/crud/orders/paginate`, {
      //TO FIX
      params:
        params.limit === 0
          ? {
              limit: 0,
            }
          : {
              page: params.page,
              itemsPerPage: params.itemsPerPage,
              limit: params.limit,
              customerId: params.customerId,
            },
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchAllOrders = async () => {
  try {
    const res = await ApiConfig.get(`/crud/orders/paginate`, {
      params: { limit: 0 },
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchOrder = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/crud/orders/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCreateOrder = async (payload: OrderFormValues) => {
  try {
    const res = await ApiConfig.post(`/crud/orders/create`, payload);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchUpdateOrder = async (
  id: string,
  payload: OrderFormValues
) => {
  try {
    const res = await ApiConfig.put(`/crud/orders/${id}`, payload);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchDeleteOrder = async (id: string) => {
  try {
    const res = await ApiConfig.delete(`/crud/orders/delete/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCreateCustomerOrder = async (
  payload: CreateCRUDOrderInput
) => {
  try {
    const res = await ApiConfig.post(`/crud/orders/create`, payload);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchUpdateSignature = async (
  orderId: string,
  payload: { signatureUrl: string }
) => {
  try {
    const res = await ApiConfig.post(
      `/crud/orders/edit/signature/${orderId}`,
      payload
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchExportPdf = async (payload: { id: string }) => {
  try {
    const res = await ApiConfig.post(`/crud/orders/generate-pdf`, payload);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchOrderSummary = async () => {
  try {
    const res = await ApiConfig.get(`/crud/orders/status-summary`);

    return res.data;
  } catch (error) {
    return error;
  }
};
