import type { UseFormReturn } from "react-hook-form";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import type { CustomerValues } from "~/schemas/customer/customer-form";

export const RemarkCard = ({
  loading,
  remark,
  isEdit,
  form,
  className,
}: {
  loading: boolean;
  remark?: string;
  isEdit: boolean;
  form: UseFormReturn<CustomerValues>;
  className: string;
}) => (
  <Card className={className}>
    <CardHeader>
      <CardTitle className="text-base font-bold">หมายเหตุ</CardTitle>
    </CardHeader>
    <CardContent>
      {loading ? (
        <SkeletonLoading className="h-20" />
      ) : isEdit ? (
        <FormField
          control={form.control}
          name="remark"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  value={field.value || ""}
                  rows={4}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  placeholder="กรอกหมายเหตุ เช่น  Important customer"
                ></Textarea>
              </FormControl>
            </FormItem>
          )}
        />
      ) : remark ? (
        <span>{remark}</span>
      ) : (
        <span className="text-sm text-[#71717A]  dark:text-[#b4b4c5]">
          ไม่มีหมายเหตุ
        </span>
      )}
    </CardContent>
  </Card>
);
