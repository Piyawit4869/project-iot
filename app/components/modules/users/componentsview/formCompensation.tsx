import React from "react";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";

import { Wallet } from "lucide-react";
import dayjs from "dayjs";
import type { UsersFormValues } from "~/schemas/users/user";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { InfoRow } from "~/components/shared/InfoRow";
import { contactTypeMap, currencyMap } from "~/initData/user-initData";
import {
  formatDateFull,
  formatNumber,
} from "~/components/shared/global-format";

type CompensationConfig =
  UsersFormValues["profile"]["compensationConfigs"][number];

export interface UserCompensationViewProps {
  data?: Partial<UsersFormValues>;
  loading?: boolean;

  onAddClick?: () => void;
  onRemoveClick?: (index: number) => void;
  showActions?: boolean;
}

export const UserCompensation: React.FC<UserCompensationViewProps> = ({
  data,
  loading = false,
  onAddClick,
  onRemoveClick,
  showActions = false,
}) => {
  const configs: ReadonlyArray<Partial<CompensationConfig>> =
    data?.profile?.compensationConfigs ?? [];

  return (
    <>
      <div className="flex gap-2 items-center px-4">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          ค่าตอบแทน
        </CardTitle>
      </div>
      {loading ? (
        <CardContent className="space-y-4">
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

            {configs.length === 0 ? (
              <div className="rounded-xl text-sm text-muted-foreground">
                ยังไม่มีค่าตอบแทน
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {configs.map((row, index) => (
                  <div key={index} className="rounded-xl space-y-4">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold mb-3">
                          ค่าตอบแทน {index + 1}
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoRow
                          label="เงินเดือนพื้นฐาน"
                          value={formatNumber(row.baseSalary || "0")}
                        />
                        <InfoRow
                          label="สกุลเงิน"
                          value={
                            currencyMap[row.currency as any] ??
                            row.currency ??
                            "-"
                          }
                        />

                        <InfoRow
                          label="มีสิทธิ์โบนัสหรือไม่"
                          value={row.bonusEligible ? "มี" : "ไม่มี"}
                        />
                        <InfoRow
                          label="อัตราโบนัส"
                          value={`${row.bonusRate} %`}
                        />

                        <InfoRow
                          label="เบี้ยเลี้ยง"
                          value={formatNumber(row.allowance || "0")}
                        />
                        <InfoRow
                          label="ประกันที่ได้รับ"
                          value={row.insurance}
                        />

                        <InfoRow
                          label="มีกองทุนสำรองเลี้ยงชีพหรือไม่"
                          value={row.providentFund ? "มี" : "ไม่มี"}
                        />
                        <InfoRow
                          label="ประเภทสัญญาจ้าง"
                          value={
                            contactTypeMap[row.contractType as any] ??
                            row.contractType ??
                            "-"
                          }
                        />

                        <InfoRow
                          label="วันที่เริ่มมีผล"
                          value={row.effectiveDate}
                          format={(v) => (v ? formatDateFull(v) : "-")}
                        />
                        <InfoRow
                          label="วันที่สิ้นสุด"
                          value={row.expireDate}
                          format={(v) => (v ? formatDateFull(v) : "-")}
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
