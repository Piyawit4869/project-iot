import { z } from "zod";

import { branchSchema } from "../order/order";

export const UsersFormSchema = z.object({
  id: z.string().optional(),
  email: z
    .string()
    .email("รูปแบบอีเมลไม่ถูกต้อง")
    .transform((v) => v.trim().toLowerCase()),

  userName: z.string().optional().nullable().default(null),
  password: z
    .preprocess((v) => v ?? "", z.string().min(1, "กรุณาระบุรหัสผ่าน"))
    .optional(),
  confirmPassword: z
    .preprocess((v) => v ?? "", z.string().min(1, "กรุณาระบุยืนยันรหัสผ่าน"))
    .optional(),
  status: z.string().default("active"),
  active: z.boolean().default(true),

  profile: z.object({
    prefix: z.string().default("").nullable(),
    firstName: z.preprocess((v) => v ?? "", z.string().min(1, "กรุณาระบุชื่อ")),
    lastName: z.preprocess(
      (v) => v ?? "",
      z.string().min(1, "กรุณาระบุนามสกุล")
    ),
    firstNameTh: z.string().nullable(),
    lastNameTh: z.string().nullable(),
    emId: z.string().nullable(),
    gender: z.string().default("").nullable(),
    birthDate: z.string().nullable().default(null),
    phone: z
      .string()
      .nullable()
      .optional()
      .refine(
        (val) => {
          if (!val || val === "") return true;
          return val.length === 10 || val.length === 9;
        },
        {
          message: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ",
        }
      ),
    age: z.coerce.number().nullable(),
    imageUrl: z.preprocess((v) => v ?? "", z.string()).default(""),
    photoUrl: z.preprocess((v) => v ?? "", z.string()).default(""),
    taxId: z
      .string()
      .nullable()
      .optional()
      .refine(
        (val) => {
          if (!val || val === "") return true;
          return val.length === 13;
        },
        {
          message: "กรุณากรอกเลขประจำตัวผู้เสียภาษีให้ครบ 13 หลัก",
        }
      ),
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
          institution: z.preprocess(
            (v) => v ?? "",
            z.string().min(1, "กรุณากรอกสถาบันการศึกษา")
          ),

          degree: z.preprocess(
            (v) => v ?? "",
            z.string().min(1, "กรุณากรอกระดับการศึกษา")
          ),

          major: z.preprocess(
            (v) => v ?? "",
            z.string().min(1, "กรุณากรอกสาขา")
          ),
          faculty: z.string().nullable().optional(),
          gpa: z.string().optional(),
          startDate: z.string().nullable().default(null),
          endDate: z.string().nullable().default(null),
          isGraduated: z.boolean().optional(),
          description: z.string().nullable().optional(),
        })
      )
      .default([]),

    socialMedia: z
      .array(
        z.object({
          id: z.string().optional(),
          platform: z.preprocess(
            (v) => v ?? "",
            z.string().min(1, "กรุณากรอกชื่อแพลตฟอร์ม")
          ),

          username: z.preprocess(
            (v) => v ?? "",
            z.string().min(1, "กรุณากรอกชื่อบัญชี")
          ),

          url: z.preprocess(
            (v) => v ?? "",
            z
              .string()
              .min(1, "กรุณากรอกลิงก์")
              .url(
                "กรุณากรอกลิงก์ที่ถูกต้อง (ต้องขึ้นต้นด้วย http://,https://)"
              )
          ),
          isPrimary: z.boolean().default(false).nullable(),
          description: z.string().nullable().optional(),
        })
      )
      .default([]),

    skills: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.preprocess(
            (v) => v ?? "",
            z.string().min(1, "กรุณากรอกชื่อทักษะ")
          ),
          level: z.string().optional().nullable(),
          yearsOfExperience: z.number().optional(),
          isPrimary: z.boolean().default(false),
          description: z.string().nullable().optional(),
        })
      )
      .default([]),

    workExperiences: z
      .array(
        z.object({
          id: z.string().optional(),
          company: z.preprocess(
            (v) => v ?? "",
            z.string().min(1, "กรุณากรอกชื่อบริษัท")
          ),

          position: z.preprocess(
            (v) => v ?? "",
            z.string().min(1, "กรุณากรอกตำแหน่งงาน")
          ),
          employmentType: z.string().nullable().optional(),
          startDate: z.preprocess(
            (v) => v ?? "",
            z.string().min(1, "กรุณากรอกวันที่เริ่มงาน")
          ),
          endDate: z.string().nullable().default(null),
          isCurrent: z.boolean().default(false),
          location: z.string().nullable().optional(),
          description: z.string().nullable().optional(),
        })
      )
      .default([]),

    compensationConfigs: z
      .array(
        z.object({
          id: z.string().optional(),
          baseSalary: z.preprocess(
            (v) =>
              v === "" || v === null || v === undefined ? undefined : Number(v),
            z.number().min(1, "กรุณากรอกเงินเดือนพื้นฐาน")
          ),
          currency: z.string().min(1, "กรุณากรอกสกุลเงิน"),
          bonusEligible: z.boolean().default(false),
          bonusRate: z.number().optional(),
          allowance: z.number().optional(),
          insurance: z.string().optional().nullable(),
          providentFund: z.boolean().default(false),
          // contractType: z.string().optional().nullable(),
          contractType: z.preprocess(
            (v) => v ?? "",
            z.string().min(1, "กรุณากรอกประเภทสัญญาจ้าง")
          ),
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
          type: z.preprocess(
            (v) => v ?? "",
            z.string().min(1, "กรุณาเลือกประเภทเอกสาร")
          ),
          fileName: z.preprocess(
            (v) => v ?? "",
            z.string().min(1, "กรุณากรอกชื่อไฟล์เอกสาร")
          ),
          mimeType: z.string().optional(),
          size: z.number().optional(),
          url: z.preprocess(
            (v) => v ?? "",
            z.string().url("กรุณาอัพโหลดเอกสาร")
          ),
          storageProvider: z.string().optional(),
          // storageProvider: z.string().min(1, "กรุณากรอก"),
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
  mainDepartment: z.string().optional().nullable(),
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
