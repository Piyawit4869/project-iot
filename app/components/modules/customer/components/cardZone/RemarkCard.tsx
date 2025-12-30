import type { UseFormReturn } from "react-hook-form";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import type { CustomerValues } from "~/schemas/customer/customer-form";
import { EditActionButtons } from "../edit-action-buttons";
import React from "react";

export const RemarkCard = ({
  loading,
  remark,
  onClick,
  form,
  className,
  isEdit,
  setIsEdit,
}: {
  loading: boolean;
  remark?: string;
  onClick?: any;
  form: UseFormReturn<CustomerValues>;
  className: string;
  isEdit?: boolean;
  setIsEdit: any;
}) => {
  return (
    <Card className={className}>
      <CardHeader className=" gap-0">
        <div className="flex gap-2">
          <div className="flex gap-2">
            <CardTitle className="text-base font-bold">หมายเหตุ</CardTitle>
          </div>

          <EditActionButtons
            isEdit={isEdit}
            form={form}
            onSave={onClick}
            onEdit={() => {
              setIsEdit(true);
            }}
            onCancel={() => {
              setIsEdit(false);
            }}
          />
        </div>
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
          <span className="text-base ">{remark}</span>
        ) : (
          <span className="  text-[#71717A]  dark:text-[#b4b4c5]">
            ไม่มีหมายเหตุ
          </span>
        )}
      </CardContent>
    </Card>
  );
};
