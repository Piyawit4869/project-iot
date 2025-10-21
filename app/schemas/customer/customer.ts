// import { chartItemSchema } from "@/schemas/customer/customer";

import type { UseFormReturn } from "react-hook-form";
import type { ContactValues, CustomerValues } from "./customer-form";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { UsersFormValues } from "./users";

export type CustomerType = {
  id: string; // assuming you have this for row actions
  name: string;
  // companyName: string;
  // taxId: string;
  // firstName: string;
  // lastName: string;
  profile: {
    nickName: string;
    id: string;
    prefix: string;
    firstName: string;
    lastName: string;
    name: string;
    imageUrl: string;
  };
  // contactEmail: string;
  // contactPhone: string;
};

export interface CustomerFormCreateProps {
  customer?: any;
  form: UseFormReturn<CustomerValues>;
  loading?: boolean;
  dataFromAI?: any;
}

export interface CustomerContactFormProps {
  form: UseFormReturn<CustomerValues>;
  expandedIndex: number | null;
  setExpandedIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface CustomerContactManagementProps {
  contacts: ContactValues[];
  refetchContacts: (options?: RefetchOptions) => Promise<QueryObserverResult>;
  loading?: boolean;
  expandedIndex: number | null;
  setExpandedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  expandedCreate: boolean;
  setExpandedCreate: React.Dispatch<React.SetStateAction<boolean>>;
  contactId: string;
  setContactId: React.Dispatch<React.SetStateAction<string>>;
  form: UseFormReturn<ContactValues>;
  isSubmitting?: boolean;
  formCreate: UseFormReturn<ContactValues>;
  isCreating?: boolean;
  loadContact?: boolean;
  onCreate: (
    values: ContactValues,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>,
    setExpandedCreate: React.Dispatch<React.SetStateAction<boolean>>,
    formCreate: UseFormReturn<ContactValues>
  ) => void;
  onUpdate: (values: ContactValues, contactId: string) => void;
  onDelete: (
    contactId: string,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
  ) => void;
}

export interface CustomerStatusOption {
  label: string;
  value:
    | "newly_registered"
    | "active"
    | "loyal_customer"
    | "at_risk"
    | "churned";
}

export interface CustomerTypeOption {
  label: string;
  value: "ordinary_person" | "juristic_person";
}

export interface CustomerRelationshipFormProps {
  form: UseFormReturn<CustomerValues>;
  customer?: CustomerValues;
  users?: UsersFormValues[];
  loading?: boolean;
  isEdit?: boolean;
  fetchCustomer?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<CustomerValues, unknown>>;
}

export interface DualProgressCircleProps {
  salerName?: string;
  human?: HumanProps[];
  ai?: number | undefined;
  progress?: number | undefined;
}

// export interface DualProgressCircleProps {
//   chartData?: chartItemSchema[];
// }

export interface HumanProps {
  name: string;
  score: number;
  userId: string;
}

export type CustomerValueNote = {
  note: string;
};

export type CustomerConnectedChatRoomAI = {
  message: string;
  messageType: string;
  customerId: string;
};

export type CustomerUpdateValueNote = {
  id: string;
  note: string;
};

export type CustomerDeleteValueNote = {
  id: string;
};

export type CustomerUpdateChatDetails = {
  customerName: string;
  status: string;
  remark: string;
  rating: number;
  lineName: string;
};

export type CustomerUpdateTags = {
  tags: { name: string; active: boolean }[];
};

export type CustomerUpdateChatDetailsAndTags = {
  chatDetails: CustomerUpdateChatDetails;
  tags: CustomerUpdateTags;
};
