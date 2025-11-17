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
  id: z.string(),
  note: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  user_name: z.string(),
});

export const customerRequestResponseSchema = z.object({
  id: z.string().optional(),

  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deletedAt: z.string().nullable().optional(),

  createdBy: z.string().nullable().optional(),
  createdById: z.string().nullable().optional(),
  updatedBy: z.string().nullable().optional(),
  updatedById: z.string().nullable().optional(),
  deletedBy: z.string().nullable().optional(),
  deletedById: z.string().nullable().optional(),

  customerStatus: z
    .enum([
      "newly_registered",
      "active",
      "loyal_customer",
      "at_risk",
      "churned",
    ])
    .nullable()
    .optional(),
  activityType: z.string().nullable().optional(),
  customerName: z.string().nullable().optional(),
  consentPii: z.boolean().nullable().optional(),
  taxId: z.string().nullable().optional(),
  contactNumber: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  inspector: z.string().nullable().optional(),

  eventKeyDate: z.string().nullable().optional(),
  eventSetupDate: z.string().nullable().optional(),

  notes: z.array(customerNoteSchema).optional(),
  personality: z.string().nullable().optional(),
  summary: z.string().optional(),

  customerId: z.string().optional(),
  branchId: z.string().optional(),

  // ✅ ฟิลด์ใหม่จาก infoItems
  contactName: z.string().nullable().optional(),
  companyName: z.string().nullable().optional(),
  brandNameEn: z.string().nullable().optional(),
  orderQuantity: z.string().nullable().optional(),
  budgetRange: z.string().nullable().optional(),
  etdDate: z.string().nullable().optional(),
  contactPhone: z.string().nullable().optional(),
});

export type CustomerRequestResponse = z.infer<
  typeof customerRequestResponseSchema
>;
