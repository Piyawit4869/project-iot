import React from "react";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Heart, Pencil } from "lucide-react";
import type { UsersFormValues } from "~/schemas/users/user";
import { Button } from "~/components/ui/button";

export interface UserPersonalityViewProps {
  data?: Partial<UsersFormValues>;
  loading?: boolean;
}

const MOCK_PERSONALITY = `ตรงไปตรงมา ชัดเจน ใช้ประโยคสั้น กระชับ จริงจัง
แต่ยังมีความเป็นกันเอง ทำหน้าที่ประสานงาน /
กระตุ้นให้ทีม อัปเดตงาน (เหมือนเป็น lead หรือคนดูแล task)
มีความรับผิดชอบสูง ติดตามงานเป็นระบบ
รู้จักมอบหมายงานชัดเจน`;

export const UserPersonality: React.FC<UserPersonalityViewProps> = ({
  data,
  loading = false,
}) => {
  const personality = MOCK_PERSONALITY;

  return (
    <div className="h-full px-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Heart className="h-5 w-5" />
          ภาพรวมบุคลิก
        </h3>
      </div>

      {loading ? (
        <div className="space-y-2">
          <SkeletonLoading className="h-4 w-full" />
          <SkeletonLoading className="h-4 w-full" />
          <SkeletonLoading className="h-4 w-3/4" />
        </div>
      ) : (
        <div className="text-base text-foreground leading-relaxed whitespace-pre-line">
          {personality ? (
            <div>{personality}</div>
          ) : (
            <div className="text-sm text-muted-foreground">
              - ไม่มีข้อมูลภาพรวมบุคลิก -
            </div>
          )}
        </div>
      )}
    </div>
  );
};
