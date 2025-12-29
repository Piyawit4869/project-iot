import React from "react";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";

import { Star } from "lucide-react";
import type { UsersFormValues } from "~/schemas/users/user";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { InfoRow } from "~/components/shared/InfoRow";

type SkillItem = UsersFormValues["profile"]["skills"][number];

export interface UserSkillsViewProps {
  data?: Partial<UsersFormValues>;
  loading?: boolean;
  showActions?: boolean;
  onAddClick?: () => void;
  onRemoveClick?: (index: number) => void;
}

export const UserSkills: React.FC<UserSkillsViewProps> = ({
  data,
  loading = false,
  showActions = false,
  onRemoveClick,
}) => {
  const skills: ReadonlyArray<Partial<SkillItem>> = data?.profile?.skills ?? [];

  return (
    <>
      <CardHeader>
        <div className="flex gap-2 items-center">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Star className="h-5 w-5" />
            ทักษะ
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
        <CardContent className="space-y-4">
          <div className="lg:col-span-2 flex flex-col gap-3">
            {skills.length === 0 ? (
              <div className="rounded-xl text-sm text-muted-foreground">
                ยังไม่มีประวัติทักษะ
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {skills.map((row, index) => (
                  <div key={index} className="rounded-xl space-y-4">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">
                          ประวัติทักษะ {index + 1}
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <InfoRow label="ชื่อทักษะ" value={row.name} />
                        <InfoRow label="ระดับความชำนาญ" value={row.level} />

                        <InfoRow
                          label="ประสบการณ์ (ปี)"
                          value={row.yearsOfExperience}
                        />
                        <InfoRow
                          label="เป็นทักษะหลักหรือไม่"
                          value={row.isPrimary ? "ใช่" : "ไม่ใช่"}
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
