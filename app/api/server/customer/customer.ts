"use server";

import { ApiConfig } from "~/api/config";
import type {
  CustomerValueNote,
  CustomerConnectedChatRoomAI,
  CustomerDeleteValueNote,
  CustomerUpdateChatDetails,
  CustomerUpdateChatDetailsAndTags,
  CustomerUpdateTags,
  CustomerUpdateValueNote,
  CustomerCreateTag,
} from "~/schemas/customer/customer";
import type {
  ContactValues,
  CustomerValues,
} from "~/schemas/customer/customer-form";

export const fetchCustomerPagination = async (params: {
  page: number;
  limit?: number;
  status?: string;
  itemsPerPage?: number;
  name?: string;
  fullname?: string;
  customerPlatform?: string;
  priorityForm?: number;
  priorityTo?: number;
  priority?: number;
  tags?: string;
  customerType?: string;
  phone?: string;
  createdBy?: string;
  updatedBy?: string;
  createdFrom?: string;
  createdTo?: string;
  updatedFrom?: string;
  updatedTo?: string;
}) => {
  try {
    const p = Object.fromEntries(
      Object.entries(params).filter(
        ([_, v]) => v !== undefined && v !== "" && v !== null
      )
    );

    if (p.status === "all") {
      delete p.status;
    }

    const res = await ApiConfig.get(`/crud/customers/paginate`, { params: p });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCustomerAll = async () => {
  try {
    const res = await ApiConfig.get(`/crud/customers`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCustomerById = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/crud/customers/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCustomerNoteAiById = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/crud/customers/ai-collects/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCustomerSummaryNoteAiById = async (customerId: string) => {
  try {
    const res = await ApiConfig.get(`/chats/summary/note/${customerId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCreateCustomer = async (payload: CustomerValues) => {
  try {
    const res = await ApiConfig.post(`/crud/customers/create`, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateCustomer = async (
  id: string,
  payload: CustomerValues
) => {
  try {
    const res = await ApiConfig.put(`/crud/customers/edit/${id}`, payload);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchAiReplySettings = async (
  id: string,
  payload: CustomerValues
) => {
  try {
    const res = await ApiConfig.put(
      `/crud/chats/rooms/edit/${id}/ai-reply-settings`,
      payload
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchDeleteCustomer = async (id: string) => {
  try {
    const res = await ApiConfig.delete(`/crud/customers/delete/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCustomerSummary = async (customerType?: string) => {
  try {
    const res = await ApiConfig.get(`/crud/customers/status-summary`, {
      params: { customerType },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllContact = async () => {
  try {
    const res = await ApiConfig.get(`/crud/customer-contacts`);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchGetAnalyzeCustomer = async (id: string) => {
  try {
    const res = await ApiConfig.get(
      `/crud/customers/${id}/summary-chat-message
       `
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchGetAiSettings = async (id: string) => {
  try {
    const res = await ApiConfig.get(
      `/crud/chats/rooms/${id}/ai-reply-settings`
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchAllContactByCustomer = async (id: string) => {
  try {
    const res = await ApiConfig.get(
      `/crud/customer-contacts/by-customer/${id}`
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchContact = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/crud/customer-contacts/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCreateContact = async (
  customerId: string,
  payload: ContactValues
) => {
  const newPayload = {
    ...payload,
    customerId,
  };

  try {
    const res = await ApiConfig.post(
      `/crud/customer-contacts/create`,
      newPayload
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchUpdateContact = async (
  id: string,
  payload: ContactValues
) => {
  try {
    const res = await ApiConfig.put(
      `/crud/customer-contacts/edit/${id}`,
      payload
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchDeleteContact = async (id: string) => {
  try {
    const res = await ApiConfig.delete(`/crud/customer-contacts/delete/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchCreateCustomerNote = async (
  id: string,
  payload: CustomerValueNote
) => {
  try {
    const res = await ApiConfig.post(
      `/crud/customers/create/${id}/note`,
      payload
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchUpdateCustomerNote = async (
  id: string,
  payload: CustomerUpdateValueNote
) => {
  try {
    const res = await ApiConfig.put(`/crud/customers/edit/${id}/note`, payload);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const connectedChatRoomAssistant = async (
  payload: CustomerConnectedChatRoomAI
) => {
  try {
    const res = await ApiConfig.post(`/chats/push-message/assistants`, payload);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const connectedChatRoomAIConfig = async (
  payload: CustomerConnectedChatRoomAI
) => {
  try {
    const res = await ApiConfig.post(`/chats/push-message/config`, payload);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchDeleteCustomerNote = async (
  id: string,
  payload: CustomerDeleteValueNote
) => {
  try {
    const res = await ApiConfig.delete(`/crud/customers/delete/${id}/note`, {
      data: payload,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchUpdateCustomerChatDetails = async (
  id: string,
  payload: CustomerUpdateChatDetails
) => {
  try {
    const res = await ApiConfig.put(
      `/crud/customers/edit/${id}/chat-details`,
      payload
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateCustomerTags = async (
  id: string,
  payload: CustomerUpdateTags
) => {
  try {
    const res = await ApiConfig.put(`/crud/customers/edit/${id}/tags`, payload);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateCustomerChatDetailsAndTags = async (
  id: string,
  payload: CustomerUpdateChatDetailsAndTags
) => {
  try {
    const { chatDetails, tags } = payload;
    const resChatDetails = await fetchUpdateCustomerChatDetails(
      id,
      chatDetails
    );
    // const resTags = await fetchUpdateCustomerTags(id, tags);
    return {
      chatDetails: resChatDetails.data,
      // tags: [],
    };
  } catch (error) {
    return error;
  }
};

export const createTag = async (payload: CustomerCreateTag) => {
  try {
    const res = await ApiConfig.post(`/crud/tags/create`, payload);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTags = async () => {
  try {
    const res = await ApiConfig.get(`/crud/tags`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getChatRoomPartipants = async (id: string) => {
  try {
    const res = await ApiConfig.get(`/crud/chats/rooms/participants/${id}`);

    return res.data;
  } catch (error) {
    throw error;
  }
};
