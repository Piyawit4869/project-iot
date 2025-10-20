import React from "react";

import { useWatch } from "react-hook-form";
import { onlyNumber } from "~/components/shared/global-format";
import { RequiredLabel } from "~/components/shared/required-design";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { StarRating } from "~/components/shared/StarRating";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import type { CustomerFormCreateProps } from "~/schemas/customer/customer";
import { CustomerSupportSelector } from "../select-support";

export const FormCustomerDetailCard: React.FC<CustomerFormCreateProps> = ({
  form,
  loading = false,
}) => {
  const contact = useWatch({ name: "contacts.0" });

  React.useEffect(() => {
    if (!contact) return;

    const { name, phone, position, email, department } = contact;
    const hasOther = position || email || department;
    form.clearErrors(["contacts.0.name", "contacts.0.phone"]);

    // have name no phone
    if (name && !phone && !hasOther) {
      form.setError("contacts.0.phone", {
        type: "manual",
        message: "กรุณากรอกเบอร์โทร",
      });
      return;
    }

    // have phone no name
    if (phone && !name && !hasOther) {
      form.setError("contacts.0.name", {
        type: "manual",
        message: "กรุณากรอกชื่อผู้ติดต่อ",
      });
      return;
    }

    //other field but no enter name and phone
    if (hasOther && (!name || !phone)) {
      if (!name) {
        form.setError("contacts.0.name", {
          type: "manual",
          message: "กรุณากรอกชื่อผู้ติดต่อ",
        });
      }
      if (!phone) {
        form.setError("contacts.0.phone", {
          type: "manual",
          message: "กรุณากรอกเบอร์โทร",
        });
      }
    }
  }, [contact, form]);

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2">
          <CardTitle className="text-base font-bold">รายละเอียด</CardTitle>
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
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <FormField
              control={form.control}
              name={`contacts.0.name`}
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>
                    ผู้ติดต่อ <FormMessage />
                  </RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกชื่อผู้ติดต่อ เช่น หญิงฟ้า สุขสมบรูณ์"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="py-2 w-25 items-center flex flex-col">
                  <RequiredLabel>เปิดใช้งาน</RequiredLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      defaultChecked
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-4 my-7">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>ความสำคัญ</RequiredLabel>
                  <StarRating
                    rating={field.value}
                    onRate={(val) => field.onChange(val)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`contacts.0.email`}
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>อีเมลผู้ติดต่อ</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกอีเมลผู้ติดต่อ เช่น contact@gmail.com"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`contacts.0.phone`}
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>
                    เบอร์โทรศัพท์ผู้ติดต่อ (ตัวเลขเท่านั้น) <FormMessage />
                  </RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกเบอร์โทรศัพท์ผู้ติดต่อ เช่น 0612345678"
                      onChange={onlyNumber(field)}
                      maxLength={10}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`contacts.0.position`}
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>แผนกผู้ติดต่อ</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกแผนกของผู้ติดต่อ เช่น ฝ่ายการตลาด"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`contacts.0.department`}
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>ตำแหน่งผู้ติดต่อ</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกตำแหน่งของผู้ติดต่อ เช่น ที่ปรึกษาด้านการตลาด"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <CustomerSupportSelector form={form} />
        </CardContent>
      )}
    </Card>
  );
};
