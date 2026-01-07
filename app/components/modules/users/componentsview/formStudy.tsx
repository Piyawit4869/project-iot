import React from "react";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";

import { GraduationCap } from "lucide-react";
import dayjs from "dayjs";
import type { UsersFormValues } from "~/schemas/users/user";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { InfoRow } from "~/components/shared/InfoRow";
import {
  formatDateFull,
  formatNumber,
} from "~/components/shared/global-format";

type EduItem = UsersFormValues["profile"]["educationInformations"][number];

export interface UserStudyViewProps {
  data?: Partial<UsersFormValues>;
  loading?: boolean;
  showActions?: boolean;
  onAddClick?: () => void;
  onRemoveClick?: (index: number) => void;
}

export const UserStudy: React.FC<UserStudyViewProps> = ({
  data,
  loading = false,
  showActions = false,
  onAddClick,
  onRemoveClick,
}) => {
  const edus: ReadonlyArray<Partial<EduItem>> =
    data?.profile?.educationInformations ?? [];

  return (
    <>
      <div className="flex gap-2 items-center px-4">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          การศึกษา
        </CardTitle>
      </div>

      {loading ? (
        <CardContent className="space-y-4 ">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <CardContent className="p-0 space-y-4">
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex items-center justify-between">
              {showActions && (
                <Button
                  type="button"
                  onClick={onAddClick}
                  aria-label="เพิ่มประวัติการศึกษา"
                >
                  +
                </Button>
              )}
            </div>

            {edus.length === 0 ? (
              <div className="rounded-xl text-sm text-muted-foreground">
                ยังไม่มีประวัติการศึกษา
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {edus.map((row, index) => (
                  <div key={index} className="rounded-xl space-y-2">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold mb-3">
                          ประวัติการศึกษา {index + 1}
                        </h4>
                        {showActions && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => onRemoveClick?.(index)}
                          >
                            ลบรายการนี้
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-4 gap-5">
                        <InfoRow
                          label="สถาบันการศึกษา"
                          value={row.institution}
                        />
                        <InfoRow label="ระดับปริญญา" value={row.degree} />
                        <InfoRow
                          label="คณะ"
                          value={<span>{row.faculty ?? "-"}</span>}
                        />
                        <InfoRow label="สาขา" value={row.major} />
                        <InfoRow
                          label="เกรดเฉลี่ย"
                          value={formatNumber(row.gpa ?? "")}
                        />

                        <InfoRow
                          label="เข้าเรียนเมื่อ"
                          value={row.startDate ?? null}
                          format={(v) => (v ? formatDateFull(v) : "-")}
                        />
                        <InfoRow
                          label="จบการศึกษาเมื่อ"
                          value={row.endDate ?? null}
                          format={(v) => (v ? formatDateFull(v) : "-")}
                        />

                        <InfoRow
                          label="สถานะการศึกษา"
                          value={
                            row.isGraduated ? "จบการศึกษา" : "ยังไม่จบการศึกษา"
                          }
                        />
                        <InfoRow
                          className="md:col-span-2"
                          label="รายละเอียดเพิ่มเติม"
                          value={
                            row.description && row.description.trim()
                              ? row.description
                              : "-"
                          }
                        />
                      </div>

                      {/* <div className="h-px w-full bg-gray-200 mt-5"></div> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      )}
    </>
  );
};
