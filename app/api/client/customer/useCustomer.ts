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
  fetchCustomerSummaryNoteAiById,
  createTag,
  getAllTags,
  getChatRoomPartipants,
  fetchGetAiSettings,
  getChatRoomAssistantId,
} from "../../server/customer/customer";
import type {
  ContactValues,
  CustomerValues,
} from "~/schemas/customer/customer-form";
import type {
  CustomerCreateTag,
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
  priorityForm,
  priorityTo,
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
  status?: string;
  limit?: number;
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
      priorityForm,
      priorityTo,
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
        limit: limit || undefined,
        name,
        fullname,
        customerPlatform,
        priorityForm,
        priorityTo,
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

export const useConnectedChatRoomAssistant = () => {
  return useMutation({
    mutationFn: (values: any) => connectedChatRoomAssistant(values),
  });
};

export const useConnectedChatRoomAIConfig = () => {
  return useMutation({
    mutationFn: (values: any) => connectedChatRoomAIConfig({ ...values }),
  });
};

export const useGetAiNote = (id: string) =>
  useQuery({
    queryKey: ["customer-ai-note", id],
    queryFn: () => fetchCustomerNoteAiById(id),
    enabled: !!id,
  });

export const useGetSummaryAINote = (id: string) =>
  useQuery({
    queryKey: ["customer-ai-summary-note", id],
    queryFn: () => fetchCustomerSummaryNoteAiById(id),
    enabled: !!id,
  });

export const useAllCustomer = (id?: string) =>
  useQuery({
    queryKey: ["customer-all"],
    queryFn: () => fetchCustomerAll(),
    enabled: !id,
  });

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: ["customer-single", id],
    queryFn: () => fetchCustomerById(id),
    enabled: !!id,
  });
};

export const useCustomerNote = (id: string) => {
  return useQuery({
    queryKey: ["customer-note", id],
    queryFn: () => fetchCustomerById(id),
    enabled: !!id,
  });
};

export const useCustomerAiSetting = (id: string) => {
  return useQuery({
    queryKey: ["customer-ai-setting", id],
    queryFn: () => fetchCustomerById(id),
    enabled: !!id,
  });
};

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

export const useGetAiReplySettings = (id: string) => {
  return useQuery({
    queryKey: ["ai-reply-setting", id],
    queryFn: () => fetchGetAiSettings(id),
    enabled: !!id,
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

export const useAllCustomerSummary = (customerType?: string) => {
  return useQuery({
    queryKey: ["contacts", customerType],
    queryFn: () => fetchCustomerSummary(customerType),
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

export const useCreateTag = () => {
  return useMutation({
    mutationFn: (values: CustomerCreateTag) => createTag(values),
  });
};

export const useGetAllTags = () => {
  return useQuery({
    queryKey: ["customer-tags"],
    queryFn: () => getAllTags(),
  });
};

export const useChatRoomParticipants = (id: string) => {
  return useQuery({
    queryKey: ["room-participant", id],
    queryFn: () => getChatRoomPartipants(id),
    enabled: !!id,
  });
};

export const useGetChatRoomAssistantId = (id: string) => {
  return useQuery({
    queryKey: ["room-assistant-id", id],
    queryFn: () => getChatRoomAssistantId(id),
    enabled: !!id,
  });
};
