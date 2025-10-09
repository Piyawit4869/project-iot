"use client";

import React from "react";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";

import { GraduationCap } from "lucide-react";
import dayjs from "dayjs";
import type { UsersFormValues } from "~/schemas/users/user";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { InfoRow } from "~/components/shared/InfoRow";

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
      <CardHeader>
        <div className="flex gap-2 items-center">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            การศึกษา
          </CardTitle>
        </div>
      </CardHeader>
      {loading ? (
        <CardContent className="space-y-4 ">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <CardContent>
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
              <div className="grid grid-cols-1 ">
                {edus.map((row, index) => (
                  <div key={index} className="rounded-xl space-y-2">
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">
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
                        <InfoRow
                          label="คณะ"
                          value={<span>{row.faculty ?? "-"}</span>}
                        />

                        <InfoRow
                          label="วันที่เริ่มงาน"
                          value={row.startDate ?? null}
                          format={(v) =>
                            v ? dayjs(v).format("DD MMMM YYYY") : "-"
                          }
                        />
                        <InfoRow
                          label="วันที่สิ้นสุดงาน"
                          value={row.endDate ?? null}
                          format={(v) =>
                            v ? dayjs(v).format("DD MMMM YYYY") : "ปัจจุบัน"
                          }
                        />
                        <InfoRow label="ระดับปริญญา" value={row.degree} />
                        <InfoRow label="สาขา" value={row.major} />
                        <InfoRow label="เกรดเฉลี่ย" value={row.gpa ?? ""} />
                        <InfoRow
                          label="จบการศึกษาหรือไม่"
                          value={row.isGraduated ? "จบ" : "ยังไม่จบ"}
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
                    </Card>
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
