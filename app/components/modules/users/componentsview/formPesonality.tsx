import React from "react";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Heart, Pencil, Sparkles } from "lucide-react";
import type { UsersFormValues } from "~/schemas/users/user";
import { Button } from "~/components/ui/button";
import { useGetUsersPersonalSummary } from "~/api/client/user";
import LoadingAnimation from "../../message/loading-animation";

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
  const [enabled, setEnabled] = React.useState(false);

  const userId = data?.id;

  const {
    data: personalityData,
    isFetching,
    refetch,
  } = useGetUsersPersonalSummary(userId ?? "", enabled);

  const personality = personalityData?.summary ?? "";

  return (
    <div className="h-full px-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Heart className="h-5 w-5" />
          ภาพรวมบุคลิก
        </h3>
        <Button
          variant="outline"
          size="sm"
          disabled={!userId || isFetching}
          onClick={() => {
            if (!userId) return;
            setEnabled(true);
            refetch();
          }}
        >
          วิเคราะห์ข้อมูล
        </Button>
      </div>

      {isFetching ? (
        <div className="flex flex-col items-center justify-center h-48 w-full border rounded-lg bg-background/50">
          <LoadingAnimation />
        </div>
      ) : (
        <div className="text-base leading-relaxed whitespace-pre-line">
          {personality ? (
            <div className="animate-in fade-in duration-300">{personality}</div>
          ) : (
            <div className="text-sm text-muted-foreground py-4 text-center border border-dashed rounded-md">
              - กด “วิเคราะห์ข้อมูล” เพื่อดูภาพรวมบุคลิก -
            </div>
          )}
        </div>
      )}
    </div>
  );
};
