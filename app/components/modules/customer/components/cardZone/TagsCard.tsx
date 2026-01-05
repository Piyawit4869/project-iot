import type { UseFormReturn } from "react-hook-form";
import { GlobalTagsBadge } from "~/components/shared/global-tags";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { TagsSelectorModal } from "~/components/shared/tags-selector-modal";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FormControl } from "~/components/ui/form";
import type { CustomerValues } from "~/schemas/customer/customer-form";

export const TagsCard = ({
  loading,
  tags,
  isEdit,
  form,
  className,
}: {
  loading: boolean;
  isEdit?: boolean;
  tags: any;
  className: string;
  form: UseFormReturn<CustomerValues>;
}) => (
  <Card className={className}>
    <CardHeader>
      <CardTitle className="text-base font-bold">Tags</CardTitle>
    </CardHeader>
    <CardContent>
      <FormControl>
        {loading ? (
          <div className="flex flex-row gap-4">
            <SkeletonLoading className="w-20" />
            <SkeletonLoading className="w-20" />
            <SkeletonLoading className="w-20" />
            <SkeletonLoading className="w-20" />
            <SkeletonLoading className="w-20" />
            <SkeletonLoading className="w-20" />
            <SkeletonLoading className="w-20" />
            <SkeletonLoading className="w-20" />
          </div>
        ) : tags && tags.length > 0 ? (
          !isEdit ? (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: any, index: number) => (
                <GlobalTagsBadge key={index} value={tag.name ?? ""} />
              ))}
            </div>
          ) : (
            <TagsSelectorModal form={form} />
          )
        ) : isEdit ? (
          <TagsSelectorModal form={form} />
        ) : (
          <span className="text-[#71717A]">
            ลูกค้ารายนี้ยังไม่มี Tags หากต้องการเพิ่ม Tags กรุณากดที่ปุ่มแก้ไข
          </span>
        )}
      </FormControl>
    </CardContent>
  </Card>
);
