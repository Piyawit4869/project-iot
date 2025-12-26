import { z } from "zod";

import { branchSchema } from "../order/order";

export const UsersFormSchema = z.object({
  id: z.string().optional(),
  email: z.string().email({ message: "รูปแบบอีเมลไม่ถูกต้อง @gmail.com" }),
  userName: z.string().min(1, "กรุณาระบุชื่อผู้ใช้").optional(),
  password: z.string().min(1, "กรุณาระบุรหัสผ่าน").optional(),
  confirmPassword: z
    .string()
    .min(1, "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน")
    .optional(),
  status: z.string().default("active"),
  active: z.boolean().default(true),

  profile: z.object({
    prefix: z.string().default(""),
    firstName: z.string().min(1, "กรุณาระบุชื่อ"),
    lastName: z.string().min(1, "กรุณาระบุนามสกุล"),
    firstNameTh: z.string().nullable(),
    lastNameTh: z.string().nullable(),
    gender: z.string().default(""),
    birthDate: z.string().nullable().default(null),
    phone: z.string().nullable(),
    age: z.coerce.number().nullable(),
    imageUrl: z.preprocess((v) => v ?? "", z.string()).default(""),
    photoUrl: z.preprocess((v) => v ?? "", z.string()).default(""),
    taxId: z.string().nullable().optional(),
    nickName: z.string().nullable().optional(),
    nationality: z.string().nullable().optional(),
    religion: z.string().nullable().optional(),
    weight: z.coerce.number().optional(),
    height: z.coerce.number().optional(),
    startWorkDate: z.string().nullable().default(null),
    endWorkDate: z.string().nullable().default(null),
    isMobile: z.boolean().default(false),
    deviceToken: z.string().nullable().default(null),

    educationInformations: z
      .array(
        z.object({
          id: z.string().optional(),
          institution: z.string().min(1, "กรุณากรอกสถาบันการศึกษา"),
          degree: z.string().min(1, "กรุณากรอกระดับการศึกษา"),
          major: z.string().min(1, "กรุณากรอกสาขา"),
          faculty: z.string().nullable(),
          gpa: z.number().optional(),
          startDate: z.string().nullable().default(null),
          endDate: z.string().nullable().default(null),
          isGraduated: z.boolean().optional(),
          description: z.string().nullable(),
        })
      )
      .default([]),

    socialMedia: z
      .array(
        z.object({
          id: z.string().optional(),
          platform: z.string().min(1, "กรุณากรอกชื่อแพลตฟอร์ม"),
          username: z.string().min(1, "กรุณากรอกชื่อบัญชี"),
          url: z
            .string()
            .url("กรุณากรอกลิงก์ที่ถูกต้อง (ต้องขึ้นต้นด้วย http/https)")
            .optional(),
          isPrimary: z.boolean().default(false).nullable(),
          description: z.string().nullable(),
        })
      )
      .default([]),

    skills: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().min(1, "กรุณากรอก"),
          level: z.string().min(1, "กรุณากรอก"),
          yearsOfExperience: z.number().optional(),
          isPrimary: z.boolean().default(false),
          description: z.string().nullable(),
        })
      )
      .default([]),

    workExperiences: z
      .array(
        z.object({
          id: z.string().optional(),
          company: z.string().min(1, "กรุณากรอกชื่อบริษัท"),
          position: z.string().min(1, "กรุณากรอกตำแหน่งงาน"),
          employmentType: z.string().nullable(),
          startDate: z.string().min(1, "กรุณากรอก"),
          endDate: z.string().nullable().default(null),
          isCurrent: z.boolean().default(false),
          location: z.string().nullable(),
          description: z.string().nullable(),
        })
      )
      .default([]),

    compensationConfigs: z
      .array(
        z.object({
          id: z.string().optional(),
          baseSalary: z.coerce.number().min(1, "กรุณากรอก"),
          currency: z.string().min(1, "กรุณากรอกสกุลเงิน"),
          bonusEligible: z.boolean().default(false),
          bonusRate: z.number().optional(),
          allowance: z.number().optional(),
          insurance: z.string().optional().nullable(),
          providentFund: z.boolean().default(false),
          contractType: z.string().min(1, "กรุณากรอก"),
          effectiveDate: z.string().nullable().default(null),
          expireDate: z.string().nullable().default(null),
          description: z.string().optional().nullable(),
        })
      )
      .default([]),

    documents: z
      .array(
        z.object({
          id: z.string().optional(),
          type: z.string(),
          fileName: z.string().min(1, "กรุณากรอกชื่อ"),
          mimeType: z.string(),
          size: z.number().optional(),
          url: z.string().url().default(""),
          storageProvider: z.string().min(1, "กรุณากรอก"),
          checksum: z.string().optional().default(""),
          tags: z.array(z.string()).default([]),
          isPrimary: z.boolean().default(false),
          version: z.number().optional(),
          expiresAt: z.string().nullable().optional(),
          verified: z.boolean().default(false),
          remark: z.string().nullable().optional().default(""),
        })
      )
      .default([]),
  }),

  userDepartments: z
    .array(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().optional(),
        userId: z.string().uuid().optional(),
        departmentId: z.string().uuid().optional(),
        // department: z.object({
        //   id: z.string().uuid().optional(),
        //   active: z.boolean().optional(),
        //
        //   description: z.string().optional(),
        //   status: z.string().optional(),
        //   organizationId: z.string().uuid().optional(),
        // }),
      })
    )
    .default([]),
  organizationId: z.string().optional(),
  branchId: z.string().optional(),
  organizationRoleId: z.string().optional(),
  permissions: z.array(z.string()).default([]),
  activate: z.boolean().default(true),
});

export type UsersFormValues = z.infer<typeof UsersFormSchema>;

export const WorkExperiencesSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        id: z.string().optional(),
        company: z.string().min(1, "กรุณากรอกชื่อบริษัท"),
        position: z.string().min(1, "กรุณากรอกตำแหน่งงาน"),
        employmentType: z.string().nullable(),
        startDate: z.string().min(1, "กรุณากรอก"),
        endDate: z.string().nullable().default(null),
        isCurrent: z.boolean().default(false),
        location: z.string().nullable(),
        description: z.string().nullable(),
      })
    )
    .default([]),
});

export const WorkExperiencesNewSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1, "กรุณากรอกชื่อบริษัท"),
  position: z.string().min(1, "กรุณากรอกตำแหน่งงาน"),
  employmentType: z.string().nullable(),
  startDate: z.string().min(1, "กรุณากรอก"),
  endDate: z.string().nullable().default(null),
  isCurrent: z.boolean().default(false),
  location: z.string().nullable(),
  description: z.string().nullable(),
});

export type WorkExperiencesValues = z.infer<typeof WorkExperiencesSchema>;
export type WorkExperiencesNewValues = z.infer<typeof WorkExperiencesNewSchema>;
