import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchAiReplySettings,
  connectedChatRoomAssistant,
  connectedChatRoomAIConfig,
  fetchAllContact,
  fetchAllContactByCustomer,
  fetchContact,
  fetchCreateContact,
  fetchCreateCustomer,
  fetchCreateCustomerNote,
  fetchCustomerAll,
  fetchCustomerById,
  fetchCustomerNoteAiById,
  fetchCustomerPagination,
  fetchCustomerSummary,
  fetchDeleteContact,
  fetchDeleteCustomer,
  fetchDeleteCustomerNote,
  fetchUpdateContact,
  fetchUpdateCustomer,
  fetchUpdateCustomerChatDetails,
  fetchUpdateCustomerChatDetailsAndTags,
  fetchUpdateCustomerNote,
  fetchUpdateCustomerTags,
  fetchGetAnalyzeCustomer,
} from "../../server/customer/customer";
import type {
  ContactValues,
  CustomerValues,
} from "~/schemas/customer/customer-form";
import type {
  CustomerDeleteValueNote,
  CustomerUpdateChatDetails,
  CustomerUpdateChatDetailsAndTags,
  CustomerUpdateTags,
  CustomerUpdateValueNote,
  CustomerValueNote,
} from "~/schemas/customer/customer";

export const useCustomerPaginate = ({
  pageIndex,
  pageSize = 10,
  status = "",
  limit,
  name,
  fullname,
  customerPlatform,
  priority,
  tags,
  customerType,
  phone,
  createdBy,
  updatedBy,
  createdFrom,
  createdTo,
  updatedFrom,
  updatedTo,
}: {
  pageIndex: number;
  pageSize: number;
  status: string;
  limit: number;
  name?: string;
  fullname?: string;
  customerPlatform?: string;
  priority?: string;
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
  return useQuery({
    queryKey: [
      "customer-paginate",
      pageIndex,
      pageSize,
      status,
      limit,
      name,
      fullname,
      customerPlatform,
      priority,
      tags,
      customerType,
      phone,
      createdBy,
      updatedBy,
      createdFrom,
      createdTo,
      updatedFrom,
      updatedTo,
    ],
    queryFn: () =>
      fetchCustomerPagination({
        page: pageIndex,
        // itemsPerPage: pageSize,
        status: status,
        limit: limit,
        name,
        fullname,
        customerPlatform,
        priority,
        tags,
        customerType,
        phone,
        createdBy,
        updatedBy,
        createdFrom,
        createdTo,
        updatedFrom,
        updatedTo,
      }),
    enabled: !!pageIndex && !!pageSize,
  });
};

export const useConnectedChatRoomAssistant = (
  customerId: string,
  chatRoomId: string
) => {
  return useMutation({
    mutationFn: (values: any) =>
      connectedChatRoomAssistant({
        ...values,
        customerId: customerId,
        chatRoomId: chatRoomId,
      }),
  });
};

export const useConnectedChatRoomAIConfig = (chatRoomId: string) => {
  return useMutation({
    mutationFn: (values: any) =>
      connectedChatRoomAIConfig({ ...values, chatRoomId: chatRoomId }),
  });
};

export const useGetAiNote = (id: string) =>
  useQuery({
    queryKey: ["customer-ai-note", id],
    queryFn: () => fetchCustomerNoteAiById(id),
  });

export const useAllCustomer = (id?: string) =>
  useQuery({
    queryKey: ["customer-all"],
    queryFn: () => fetchCustomerAll(),
    enabled: !id,
  });

export const useCustomer = (id: string) =>
  useQuery({
    queryKey: ["customer", id],
    queryFn: () => fetchCustomerById(id),
    enabled: !!id,
  });

export const useCustomerNote = (id: string) =>
  useQuery({
    queryKey: ["customer-note", id],
    queryFn: () => fetchCustomerById(id),
    enabled: !!id,
  });

export const useCustomerAiSetting = (id: string) =>
  useQuery({
    queryKey: ["customer-ai-setting", id],
    queryFn: () => fetchCustomerById(id),
    enabled: !!id,
  });

export const useCreateCustomer = () => {
  return useMutation({
    mutationFn: (values: CustomerValues) => fetchCreateCustomer(values),
  });
};

export const useUpdateCustomer = (id: string) => {
  return useMutation({
    mutationFn: (values: any) => fetchUpdateCustomer(id, values),
  });
};

export const useAiReplySettings = (id: string) => {
  return useMutation({
    mutationFn: (values: any) => fetchAiReplySettings(id, values),
  });
};

export const useDeleteCustomer = () => {
  return useMutation({
    mutationFn: (id: string) => fetchDeleteCustomer(id),
  });
};

export const useAllContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: () => fetchAllContact(),
    enabled: true,
  });
};

export const useGetAnalyzeCustomer = (id: string) => {
  return useQuery({
    queryKey: ["analyze-customer", id],
    queryFn: () => fetchGetAnalyzeCustomer(id),
    enabled: !!id,
  });
};

export const useAllContactsByCustomer = (id: string) => {
  return useQuery({
    queryKey: ["contacts", id],
    queryFn: () => fetchAllContactByCustomer(id),
    enabled: !!id,
  });
};

export const useContact = (id: string) => {
  return useQuery({
    queryKey: ["contact", id],
    queryFn: () => fetchContact(id),
    enabled: !!id,
  });
};

export const useCreateContact = (id: string) => {
  return useMutation({
    mutationFn: (values: ContactValues) => fetchCreateContact(id, values),
  });
};

export const useUpdateContact = () => {
  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: ContactValues }) =>
      fetchUpdateContact(id, values),
  });
};

export const useDeleteContact = () => {
  return useMutation({
    mutationFn: (id: string) => fetchDeleteContact(id),
  });
};

export const useAllCustomerSummary = (id?: string) => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: () => fetchCustomerSummary(),
    enabled: !id,
  });
};

export const useCreateCustomerNote = (id: string) => {
  return useMutation({
    mutationFn: (values: CustomerValueNote) =>
      fetchCreateCustomerNote(id, values),
  });
};

export const useUpdateCustomerNote = (id: string) => {
  return useMutation({
    mutationFn: (values: CustomerUpdateValueNote) =>
      fetchUpdateCustomerNote(id, values),
  });
};

export const useDeleteCustomerNote = (id: string) => {
  return useMutation({
    mutationFn: (values: CustomerDeleteValueNote) =>
      fetchDeleteCustomerNote(id, values),
  });
};

export const useUpdateCustomerChatDetails = (id: string) => {
  return useMutation({
    mutationFn: (values: CustomerUpdateChatDetails) =>
      fetchUpdateCustomerChatDetails(id, values),
  });
};

export const useUpdateCustomerTags = (id: string) => {
  return useMutation({
    mutationFn: (values: CustomerUpdateTags) =>
      fetchUpdateCustomerTags(id, values),
  });
};

export const useUpdateCustomerChatDetailsAndTags = (id: string) => {
  return useMutation({
    mutationFn: (values: CustomerUpdateChatDetailsAndTags) =>
      fetchUpdateCustomerChatDetailsAndTags(id, values),
  });
};
