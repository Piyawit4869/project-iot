import React from "react";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { TagsSelectorModal } from "~/components/shared/tags-selector-modal";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import type { CustomerFormCreateProps } from "~/schemas/customer/customer";

export const CustomerTagAndAI: React.FC<CustomerFormCreateProps> = ({
  form,
  loading = false,
}) => {
  return (
    <>
      <Card>
        <CardContent>
          <div className="flex gap-2">
            <CardTitle className="text-base font-bold">หมายเหตุ</CardTitle>
          </div>

          <div className="md:grid-cols-2 mt-5">
            <FormField
              control={form.control}
              name="remark"
              render={({ field }) => (
                <FormItem className="flex mt-3">
                  <FormControl>
                    <Textarea
                      value={field.value || ""}
                      placeholder="กรอกหมายเหตุ เช่น  Important customer"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    ></Textarea>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <div className="flex gap-2">
            <CardTitle className="text-base font-bold">Tags</CardTitle>
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
          <>
            <CardContent className="space-y-4">
              <TagsSelectorModal form={form} />
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
};
