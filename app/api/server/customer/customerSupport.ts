"use server";

import { ApiConfig } from "~/api/config";
import type { CustomerSupportFormValues } from "~/schemas/customer/support/support";

export const fetchCreateCustomerSupport = async (
  chatRoomId: string,
  payload: CustomerSupportFormValues
) => {
  try {
    const res = await ApiConfig.post(
      `/chats/add/participant/${chatRoomId}`,
      payload
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDeleteCustomerSupport = async (
  chatRoomId: string,
  payload: CustomerSupportFormValues
) => {
  try {
    const res = await ApiConfig.post(
      `/chats/remove/participant/${chatRoomId}`,
      payload
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
