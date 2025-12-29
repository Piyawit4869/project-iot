import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import React from "react";
import { User } from "lucide-react";
import dayjs from "dayjs";
import { GlobalImage } from "~/components/shared/global-image";
import type { UsersFormValues } from "~/schemas/users/user";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { InfoRow } from "~/components/shared/InfoRow";
import {
  nationalityMap,
  religionMap,
  statusOptions,
} from "~/initData/user-initData";

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
          <GlobalImage
            src={profile.imageUrl ?? ""}
            alt="profile"
            className="h-28 w-28 object-cover rounded-md border"
          />

          <div className="grid gird-col-1 lg:grid-cols-2 gap-5">
            <InfoRow label="ชื่อ" value={data?.userName ?? "-"} />
            <InfoRow label="อีเมล" value={data?.email ?? "-"} />
            <InfoRow
              label="สถานะพนักงาน"
              value={getLabel(data?.status, statusOptions)}
            />

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
            {/* <InfoRow label="สัญชาติ" value={profile.nationality} />
            <InfoRow label="ศาสนา" value={profile.religion} /> */}
            <InfoRow
              label="สัญชาติ"
              value={
                nationalityMap[profile.nationality as any] ??
                profile.nationality ??
                "-"
              }
            />
            <InfoRow
              label="ศาสนา"
              value={
                religionMap[profile.religion as any] ?? profile.religion ?? "-"
              }
            />
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
