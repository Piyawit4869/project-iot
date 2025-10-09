"use client";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import React from "react";
import { User } from "lucide-react";
import dayjs from "dayjs";
import { GlobalImage } from "~/components/shared/global-image";
import type { UsersFormValues } from "~/schemas/users/user";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { InfoRow } from "~/components/shared/InfoRow";

const statusOptions = [
  { label: "ใช้งานอยู่", value: "active" },
  { label: "ทดลองงาน", value: "probation" },
  { label: "ลาหยุดชั่วคราว", value: "on_leave" },
  { label: "ลาออกแล้ว", value: "resigned" },
  { label: "เลิกจ้าง", value: "terminated" },
] as const;

function getLabel<T extends { label: string; value: string }>(
  value?: string,
  options: readonly T[] = []
) {
  if (!value) return "-";
  return options.find((o) => o.value === value)?.label ?? value;
}

export interface UserFormProfileProps {
  data?: Partial<UsersFormValues>;
  loading?: boolean;
}

export const UserProfileView: React.FC<UserFormProfileProps> = ({
  data,
  loading = false,
}) => {
  const profile: Partial<UsersFormValues["profile"]> = data?.profile ?? {};
  const userDepartments = data?.userDepartments;
  const Departments = userDepartments?.filter((s: any) => !s.isMain);

  return (
    <>
      <CardHeader>
        <div className="flex gap-2 items-center">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <User className="h-5 w-5" />
            ข้อมูลส่วนตัว
          </CardTitle>
        </div>
      </CardHeader>

      {loading ? (
        <CardContent className="space-y-4">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <CardContent className="space-y-6">
          {profile.imageUrl ? (
            <GlobalImage
              src={profile.imageUrl}
              alt="profile"
              className="h-28 w-28 object-cover rounded-md border"
            />
          ) : (
            <div className="h-28 w-28 rounded-md border bg-muted flex items-center justify-center text-sm text-muted-foreground">
              ไม่มีรูป
            </div>
          )}
          <div className="grid grid-cols-2 gap-5">
            <InfoRow label="ชื่อ" value={data?.userName} />
            <InfoRow label="อีเมล" value={data?.email} />
            <InfoRow
              label="สถานะพนักงาน"
              value={getLabel(data?.status, statusOptions)}
            />
            <div className="flex flex-col w-full">
              <span>แผนก</span>
              <div className="flex flex-row flex-wrap mt-2 gap-4 text-sm text-[#71717A]">
                {Departments && Departments.length > 0 ? (
                  Departments.map((s: any) => {
                    const deptName = s.department?.name || s.name || "-";

                    return (
                      <div key={s.id} className="flex items-center gap-2">
                        <GlobalImage
                          src={`https://api.dicebear.com/9.x/initials/svg?seed=${deptName}`}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">{deptName}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <span>ยังไม่ได้เลือกแผนก</span>
                )}
              </div>
            </div>
            <InfoRow
              label="เปิดใช้งาน"
              value={data?.active ? "เปิดใช้งาน" : "ปิดใช้งาน"}
            />
            <InfoRow label="ชื่อเล่น" value={profile.nickName} />
            <InfoRow
              label="คำนำหน้า"
              value={
                profile.prefix
                  ? getLabel(profile.prefix, [
                      { label: "นาย", value: "mr" },
                      { label: "นาง", value: "mrs" },
                      { label: "นางสาว", value: "ms" },
                    ])
                  : "-"
              }
            />

            <InfoRow label="ชื่อ" value={profile.firstName} />
            <InfoRow label="นามสกุล" value={profile.lastName} />
            {/* <InfoRow label="ชื่อ (ไทย)" value={profile.firstNameTh} />
            <InfoRow label="นามสกุล (ไทย)" value={profile.lastNameTh} /> */}
            <InfoRow
              label="เพศ"
              value={
                profile.gender
                  ? getLabel(profile.gender, [
                      { label: "ชาย", value: "male" },
                      { label: "หญิง", value: "female" },
                      { label: "ไม่ระบุ", value: "not_specified" },
                    ])
                  : "-"
              }
            />
            <InfoRow
              label="วันเกิด"
              value={profile.birthDate}
              format={(v) => (v ? dayjs(v).format("DD MMMM YYYY") : "-")}
            />
            <InfoRow label="เบอร์โทรศัพท์" value={profile.phone} />
            {/* ______________________________ */}
            <InfoRow
              label="อายุ"
              value={
                typeof profile.age === "number" && profile.age > 0
                  ? String(profile.age)
                  : "-"
              }
            />
            <InfoRow label="เลขประจำตัวผู้เสียภาษี" value={profile.taxId} />
            <InfoRow label="สัญชาติ" value={profile.nationality} />
            <InfoRow label="ศาสนา" value={profile.religion} />
            <InfoRow label="น้ำหนัก" value={profile.weight} />
            <InfoRow label="ส่วนสูง" value={profile.height} />
            <InfoRow
              label="วันที่เริ่มงาน"
              value={profile.startWorkDate ?? null}
              format={(v) => (v ? dayjs(v).format("DD MMMM YYYY") : "-")}
            />
            <InfoRow
              label="วันที่สิ้นสุดงาน"
              value={profile.endWorkDate ?? null}
              format={(v) => (v ? dayjs(v).format("DD MMMM YYYY") : "-")}
            />
          </div>
        </CardContent>
      )}
    </>
  );
};
