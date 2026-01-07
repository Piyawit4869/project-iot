import React from "react";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Briefcase } from "lucide-react";
import dayjs from "dayjs";
import type { UsersFormValues } from "~/schemas/users/user";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { InfoRow } from "~/components/shared/InfoRow";
import { contactTypeMap } from "~/initData/user-initData";
import { formatDateFull } from "~/components/shared/global-format";

type WorkItem = UsersFormValues["profile"]["workExperiences"][number];

export interface UserWorkExperienceViewProps {
  data?: Partial<UsersFormValues>;
  loading?: boolean;
  showActions?: boolean;
  onAddClick?: () => void;
  onRemoveClick?: (index: number) => void;
}

export const UserWorkExperience: React.FC<UserWorkExperienceViewProps> = ({
  data,
  loading = false,
  showActions = false,
  onAddClick,
  onRemoveClick,
}) => {
  const works: ReadonlyArray<Partial<WorkItem>> =
    data?.profile?.workExperiences ?? [];

  return (
    <>
      <div className="flex gap-2 items-center px-4">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          ประสบการณ์ทำงาน
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
                <Button type="button" onClick={onAddClick}>
                  +
                </Button>
              )}
            </div>

            {works.length === 0 ? (
              <div className="rounded-xl text-sm text-muted-foreground">
                ยังไม่มีประวัติประสบการณ์ทำงาน
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {works.map((row, index) => (
                  <div key={index} className="rounded-xl space-y-4">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold mb-3">
                          ประสบการณ์ทำงาน {index + 1}
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

                      <div className="grid gitd-cols-1 sm:grid-cols-2 gap-5">
                        <InfoRow label="ชื่อบริษัท" value={row.company} />
                        <InfoRow label="ตำแหน่งงาน" value={row.position} />
                        <InfoRow
                          label="ประเภทการจ้างงาน"
                          value={
                            contactTypeMap[row.employmentType as any] ??
                            row.employmentType ??
                            "-"
                          }
                        />
                        {/* <InfoRow
                        label=""
                        value={`${row.startDate || ""}|${row.endDate || ""}`}
                        format={(v) => {
                          const [start, end] = v.split("|");
                          const startStr = start
                            ? dayjs(start).format("DD MMMM YYYY")
                            : "-";
                          const endStr = end
                            ? dayjs(end).format("DD MMMM YYYY")
                            : "ปัจจุบัน";

                          return (
                            <span className="text-sm text-muted-foreground">
                              {`${startStr} - ${endStr}`}
                            </span>
                          );
                        }}
                      /> */}
                        <InfoRow label="ที่ตั้งงาน" value={row.location} />

                        <InfoRow
                          label="วันที่เริ่มงาน"
                          value={row.startDate}
                          format={(v) => (v ? formatDateFull(v) : "-")}
                        />
                        <InfoRow
                          label="วันที่สิ้นสุดงาน"
                          value={row.endDate}
                          format={(v) => (v ? formatDateFull(v) : "-")}
                        />

                        <InfoRow
                          label="สถานะ"
                          value={
                            row.isCurrent ? "กำลังทำงานอยู่" : "สิ้นสุดแล้ว"
                          }
                        />
                        <InfoRow
                          label="รายละเอียดงาน"
                          value={
                            <span className=" text-sm text-muted-foreground">
                              {row.description && row.description.trim()
                                ? row.description
                                : "-"}
                            </span>
                          }
                        />
                      </div>
                      {/* <div className="h-px w-full bg-gray-200"></div> */}
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
