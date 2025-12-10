import { GlobalImage } from "~/components/shared/global-image";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { StarRating } from "~/components/shared/StarRating";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FormField, FormItem, FormMessage } from "~/components/ui/form";
import type { CustomerFormCreateProps } from "~/schemas/customer/customer";

import { GlobalTagsBadge } from "~/components/shared/global-tags";
import { PenLine, Save, X } from "lucide-react";
import React from "react";
import { GlobalFormField } from "~/components/shared/global-formField";
import { RequiredLabel } from "~/components/shared/required-design";
import { TagsSelectorModal } from "~/components/shared/tags-selector-modal";

import { useWatch } from "react-hook-form";
import { CustomerSupportSelector } from "../select-support";
import { EditActionButtons } from "../edit-action-buttons";

export const ContactCustomer: React.FC<CustomerFormCreateProps> = ({
  customer,
  form,
  loading = false,
  onClick,
  mode = "view",
  onEditForm,
  onCancel,
}) => {
  const contact = useWatch({ name: "contacts.0" });
  const mainSupport = customer?.supports?.find((s: any) => s.isMain);
  const secondarySupports = customer?.supports?.filter((s: any) => !s.isMain);
  const isEdit = mode === "view" ? false : true;
  const phoneContactState = form.watch("contacts.0.phone");
  const nameContactState = form.watch("contacts.0.name");

  //disable btn
  let isAnyFilled = false;
  if (phoneContactState && !nameContactState) {
    isAnyFilled = true;
  }
  if (!phoneContactState && nameContactState) {
    isAnyFilled = true;
  }

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
    <Card className="py-4">
      <CardHeader className=" gap-0">
        <div className="flex gap-2">
          <div className="flex  flex-col">
            {" "}
            <GlobalStatusBadge value={customer?.active} />
            <CardTitle className="text-base font-bold mt-2">
              ชื่อผู้ติดต่อ
            </CardTitle>
          </div>

          <EditActionButtons
            isEdit={isEdit}
            isAnyFilled={isAnyFilled}
            onSave={onClick}
            onEdit={() => {
              onEditForm?.("contact_detail");
            }}
            onCancel={() => {
              onCancel?.("contact_detail");
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-5">
          <GlobalFormField
            control={form.control}
            name="contacts.0.name"
            label=""
            type="input"
            view={isEdit ? "edit" : "view"}
            placeholder="กรอกชื่อผู้ติดต่อ เช่น หญิงฟ้า สุขสมบรูณ์"
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <RequiredLabel>ความสำคัญ</RequiredLabel>
                {isEdit ? (
                  <StarRating
                    rating={field.value}
                    onRate={(val) => field.onChange(val)}
                  />
                ) : (
                  <div className="flex flex-col w-full ">
                    <StarRating
                      rating={field.value}
                      interactive={false}
                      size={20}
                    />
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <span className="text-base font-bold leading-none  ">แท๊กลูกค้า</span>

          <div className="flex flex-wrap text-muted-foreground gap-2">
            {isEdit ? (
              <TagsSelectorModal form={form} />
            ) : customer && customer.tags && customer.tags.length > 0 ? (
              customer.tags.map((tag: any, index: number) => (
                <GlobalTagsBadge key={index} value={tag.name ?? "new"} />
              ))
            ) : (
              "ลูกค้าคนนี้ยังไม่มีแท๊ก"
            )}
          </div>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 mt-5 gap-7">
          <GlobalFormField
            control={form.control}
            name="contacts.0.email"
            label="อีเมลผู้ติดต่อ"
            type="input"
            view={isEdit ? "edit" : "view"}
            placeholder="กรอกอีเมลผู้ติดต่อ เช่น contact@gmail.com"
          />
          <GlobalFormField
            control={form.control}
            name="contacts.0.phone"
            label="เบอร์โทรศัพท์ผู้ติดต่อ (ตัวเลขเท่านั้น)"
            type="number"
            view={isEdit ? "edit" : "view"}
            placeholder="กรอกเบอร์โทรศัพท์ผู้ติดต่อ เช่น 0612345678"
          />

          <GlobalFormField
            control={form.control}
            name="contacts.0.position"
            label="แผนกผู้ติดต่อ"
            type="input"
            view={isEdit ? "edit" : "view"}
            placeholder="กรอกแผนกของผู้ติดต่อ เช่น ฝ่ายการตลาด"
          />

          <GlobalFormField
            control={form.control}
            name="contacts.0.department"
            label="ตำแหน่งผู้ติดต่อ"
            type="number"
            view={isEdit ? "edit" : "view"}
            placeholder="กรอกตำแหน่งของผู้ติดต่อ เช่น ที่ปรึกษาด้านการตลาด"
          />
        </div>

        {isEdit ? (
          <CustomerSupportSelector form={form} />
        ) : (
          <div className="grid grid-cols-1  md:grid-cols-2 gap-7">
            <div className="flex flex-col w-full">
              <span>ผู้รับผิดชอบหลัก</span>
              <span className="mt-2 text-sm text-[#71717A]">
                {mainSupport ? (
                  <div className="flex items-center gap-2 text-[#71717A]  dark:text-[#b4b4c5]">
                    <GlobalImage
                      src={
                        mainSupport.imageUrl ||
                        `https://api.dicebear.com/9.x/initials/svg?seed=${mainSupport.fullName}`
                      }
                      alt={mainSupport.fullName}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{mainSupport.fullName}</span>
                  </div>
                ) : (
                  <span>ยังไม่ได้เลือกผู้รับผิดชอบ</span>
                )}
              </span>
            </div>

            <div className="flex flex-col w-full">
              <span>ผู้รับผิดชอบรอง</span>
              <span className=" mt-2 text-sm text-[#71717A]  dark:text-[#b4b4c5]">
                {secondarySupports && secondarySupports.length > 0 ? (
                  secondarySupports.map((s: any) => (
                    <div key={s.id} className="flex items-center mt-2 gap-2">
                      <GlobalImage
                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${s.fullName}`}
                        fallbackSrc={`https://api.dicebear.com/9.x/initials/svg?seed=${s.fullName}`}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{s.fullName}</span>
                    </div>
                  ))
                ) : (
                  <span>ยังไม่ได้เลือกผู้รับผิดชอบ</span>
                )}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
