import { z } from "zod";

// Chidren Schema
const openDaySchema = z.object({
  day: z.array(z.string()).optional(),
  isOpen: z.boolean().optional(),
  openTime: z.string().optional(),
  closeTime: z.string().optional(),
});

const settingSchema = z.object({
  active: z.boolean().optional(),
  theme: z.string().optional(),
  textDisplay: z.string().optional(),
  domainName: z.string().optional(),
  defaultLanguage: z.string().optional(),
  openDays: z.array(openDaySchema).optional(),
});

const addressSchema = z.object({
  active: z.boolean().optional(),
  language: z.string().optional(),
  isMain: z.boolean().optional(),
  name: z.string().optional(),
  building: z.string().optional(),
  roomNo: z.string().optional(),
  floorNo: z.string().optional(),
  village: z.string().optional(),
  villageNo: z.string().optional(),
  houseNo: z.string().optional(),
  alley: z.string().optional(),
  road: z.string().optional(),
  nation: z.string().optional(),
  subDistrict: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postalCode: z.string().optional(),
  note: z.string().optional(),
});

const profileSchema = z.object({
  prefix: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  birthDate: z.string().optional(),
  photoUrl: z.string().url().optional(),
  isMobile: z.boolean().optional(),
  deviceToken: z.string().optional(),
  phone: z
    .string()
    // .regex(/^(0|\\+66)[0-9]{8.optional(),9}$/)
    .optional(),
});

const userSchema = z.object({
  active: z.boolean().optional(),
  status: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  userName: z.string().optional(),
  profile: profileSchema.optional(),
});

// Main Schemas
const organizationSchema = z.object({
  active: z.boolean().optional(),
  status: z.string().optional(),
  fromType: z.string().optional(),
  taxId: z.string().optional(),
  type: z.string().optional(),
  openingDate: z.string().optional(),
  nameTh: z.string().optional(),
  nameEn: z.string().optional(),
  descriptionsTh: z.string().optional(),
  descriptionsEn: z.string().optional(),
  websiteUrl: z.string().url().optional(),
  registerVat: z.boolean().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  contactLine: z.string().optional(),
  contactFacebook: z.string().optional(),
  contactWhatsapp: z.string().optional(),
  contactWebsite: z.string().url().optional(),
  contactNote: z.string().optional(),
  logoUrl: z.string().nullable().optional(),
  domainName: z.string().optional(),
  user: userSchema.optional(),
  setting: settingSchema.optional(),
  address: addressSchema.optional(),
});

const branchSchema = z.object({
  active: z.boolean().optional(),
  isMain: z.boolean().optional(),
  status: z.string().optional(),
  fromType: z.string().optional(),
  taxId: z.string().optional(),
  type: z.string().optional(),
  openingDate: z.string().optional(),
  nameTh: z.string().optional(),
  nameEn: z.string().optional(),
  descriptionsTh: z.string().optional(),
  descriptionsEn: z.string().optional(),
  websiteUrl: z.string().url().optional(),
  registerVat: z.boolean().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  contactLine: z.string().optional(),
  contactFacebook: z.string().optional(),
  contactWhatsapp: z.string().optional(),
  contactWebsite: z.string().url().optional(),
  contactNote: z.string().optional(),
  logoUrl: z.string().url().optional(),
  setting: settingSchema.optional(),
  address: addressSchema.optional(),
  user: userSchema.optional(),
});

// Combined schema
export const createOrgSchema = z.object({
  organization: organizationSchema.optional(),
  branch: branchSchema.optional(),
});

export type CreateFormValues = z.infer<typeof createOrgSchema>;
