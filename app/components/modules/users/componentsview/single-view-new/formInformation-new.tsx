"use client";

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

export const UserProfileViewNew: React.FC<UserFormProfileProps> = ({
  data,
  loading = false,
}) => {
  const profile: Partial<UsersFormValues["profile"]> = data?.profile ?? {};
  const userDepartments = data?.userDepartments;
  const Departments = userDepartments?.filter((s: any) => !s.isMain);

  return (
    <>
      {loading ? (
        <CardContent className="space-y-4">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <CardContent className="flex gap-8">
          {profile.imageUrl ? (
            // <InfoRow
            //   label="สถานะพนักงาน"
            //   value={getLabel(data?.status, statusOptions)}
            // />
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
          <div className="gap-5">
            <InfoRow value={data?.userName ?? "-"} />
            <InfoRow
              value={
                typeof profile === "number" && profile > 0
                  ? String(profile)
                  : "-"
              }
            />

            <div className="grid grid-cols-2 gap-4 space-x-50 mt-3">
              <InfoRow value={data?.email ?? "-"} />
              <InfoRow value={profile.phone} />
              <InfoRow
                value={profile.birthDate}
                format={(v) => (v ? dayjs(v).format("DD MMMM YYYY") : "-")}
              />
              <InfoRow
                value={
                  typeof profile === "number" && profile > 0
                    ? String(profile)
                    : "-"
                }
              />
            </div>
          </div>
        </CardContent>
      )}
    </>
  );
};
