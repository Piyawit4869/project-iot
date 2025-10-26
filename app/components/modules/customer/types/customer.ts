import { z } from "zod";

export type CustomerType = {
  id: string;
  code?: string;
  customerCode?: string;
  active?: boolean;
  status?: string;
  customerType?: "ordinary_person" | "juristic_person";
  customerPlatform?: "backoffice" | "line_oa" | string;
  email?: string | null;
  priority?: number;
  progressPercentage?: number;
  isAiReply?: boolean;
  aiReplyResponseDuration?: string | null;
  createdAt?: string;
  updatedAt?: string;
  branchId?: string;
  updatedById: string | null;
  createdById: string | null;
  name: string | null;

  profile?: {
    nickName?: string | null;
    prefix?: string;
    name?: string | null;
    imageUrl?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    gender?: string | null;
    age?: number | null;
  };

  organizationDetails?: {
    businessName?: string | null;
    taxId?: string | null;
    branchCode?: string | null;
    registerVat?: boolean;
  } | null;

  contacts?: Array<{
    id: string;
    name?: string | null;
    phone?: string | null;
    email?: string | null;
    position?: string | null;
    department?: string | null;
    isPrimary?: boolean;
  }>;

  tags?: Array<{
    id: string;
    name: string;
    priority?: number;
  }>;

  supports?: Array<{
    id: string;
    isMain: boolean;
    userId?: string | null;
  }>;
};

export const customerNoteSchema = z.object({
  id: z.string().uuid(),
  note: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  user_name: z.string(),
});

export const customerRequestResponseSchema = z.object({
  id: z.string().uuid(),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),

  createdBy: z.string().nullable(),
  createdById: z.string().uuid().nullable(),
  updatedBy: z.string().nullable(),
  updatedById: z.string().uuid().nullable(),
  deletedBy: z.string().nullable(),
  deletedById: z.string().uuid().nullable(),

  customerStatus: z
    .enum([
      "newly_registered",
      "active",
      "loyal_customer",
      "at_risk",
      "churned",
    ])
    .nullable(),
  activityType: z.string().nullable(),
  customerName: z.string().nullable(),
  consentPii: z.boolean().nullable(),
  taxId: z.string().nullable(),
  contactNumber: z.string().nullable(),
  email: z.email().nullable(),
  inspector: z.string().nullable(),

  eventKeyDate: z.string().datetime().nullable(),
  eventSetupDate: z.string().datetime().nullable(),

  notes: z.array(customerNoteSchema),
  personality: z.string().nullable(),
  summary: z.string(),

  customerId: z.string().uuid(),
  branchId: z.string().uuid(),
});

export type CustomerRequestResponse = z.infer<
  typeof customerRequestResponseSchema
>;
