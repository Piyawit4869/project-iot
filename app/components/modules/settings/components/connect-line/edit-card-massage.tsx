import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ApiConfig } from "~/api/config";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  CardCategoryDialog,
  CARD_CATEGORY_OPTIONS,
} from "./card-category-dialog";
import {
  MESSAGE_CARD_DEFAULT_VALUES,
  type MessageCardFormValues,
} from "./card-types";
import { ProductCardEditor } from "./product-card-editor";
import { PlaceCardEditor } from "./place-card-editor";
import { PersonCardEditor } from "./person-card-editor";
import { ImageCardEditor } from "./image-card-editor";
import { buildProductCardBody, buildPlaceCardBody } from "./utils";
import { buildPersonCardBody } from "./utils/person-card-content";
import { useLineGetCardContent } from "~/api/client/settings";

type Props = {
  id: string;
  onSaved?: () => void;
  onCancel?: () => void;
};

export default function EditMessageCardForm({ id, onSaved, onCancel }: Props) {
  const { data } = useLineGetCardContent(id);
  const form = useForm<MessageCardFormValues>({
    defaultValues: MESSAGE_CARD_DEFAULT_VALUES,
    mode: "onChange",
  });
  const [isCategoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const selectedCategoryId = form.watch("category");

  const selectedCategory = CARD_CATEGORY_OPTIONS.find(
    (option) => option.id === selectedCategoryId
  );

  const buildCategoryPayload = (values: MessageCardFormValues) => {
    switch (values.category) {
      case "product":
        return { product: { ...values.product } };
      case "place":
        return { place: { ...values.place } };
      case "person":
        return { person: { ...values.person } };
      case "image":
        return { image: { ...values.image } };
      default:
        return null;
    }
  };

  const handleSubmit = async (values: MessageCardFormValues) => {
    const toastId = toast.loading("กำลังบันทึกการ์ด...");
    const categoryPayload = buildCategoryPayload(values);

    if (!values.category || !categoryPayload) {
      toast.error("กรุณาเลือกประเภทการ์ด", { id: toastId });
      return;
    }

    try {
      let payload = {
        name: values.name.trim(),
        category: values.category,
        ...categoryPayload,
      };

      switch (values.category) {
        case "product":
          payload = buildProductCardBody(payload);
          break;
        case "place":
          payload = buildPlaceCardBody(payload);
          break;
        case "person":
          payload = buildPersonCardBody(payload);
          break;
        default:
          break;
      }

      const finalPayload = {
        ...payload,
        meta: {
          name: values.name.trim(),
          category: values.category,
          ...categoryPayload,
        },
      };

      const { data } = await ApiConfig.put(
        `/thirdparty/line/contents/${id}/edit`,
        finalPayload
      );
      toast.success("บันทึกการ์ดสำเร็จ", {
        id: toastId,
        duration: 2000,
        position: "bottom-right",
      });
      form.reset(MESSAGE_CARD_DEFAULT_VALUES);
      setCategoryDialogOpen(false);
      onSaved?.();
    } catch (error) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "เกิดข้อผิดพลาดขณะบันทึกการ์ด";
      toast.error(message, {
        id: toastId,
        duration: 2500,
        position: "bottom-right",
      });
    }
  };

  const handleSetDefaultFormValue = () => {
    const formValue = {
      name: data?.name,
      category: data?.meta?.category,
      product: {},
      place: {},
      person: {},
      image: {},
    };

    switch (data?.meta?.category) {
      case "product":
        formValue.product = data?.meta?.product;
        break;
      case "place":
        formValue.place = data?.meta?.place;
        break;
      case "person":
        formValue.person = data?.meta?.person;
        break;
      case "image":
        formValue.image = data?.meta?.image;
        break;
      default:
        break;
    }
    form.reset(formValue);
  };

  useEffect(() => {
    if (data) {
      handleSetDefaultFormValue();
    }
  }, [data]);

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex w-full flex-col  space-y-6">
          <h1 className="text-2xl font-bold">แก้ไขการ์ดเมสเสจ</h1>
          <p className="text-muted-foreground text-sm mt-1">
            ข้อความในรูปแบบการ์ดที่รวมเนื้อหาต่างๆ เอาไว้ในที่เดียว
            โดยระบบจะแสดงผลแบบภาพสไลด์ที่ผู้คนสามารถเปิดการ์ดไปด้านข้างเพื่อดูเนื้อหาการ์ดอื่นได้
          </p>
          <Card>
            <CardHeader>
              <CardTitle>รายละเอียดการ์ด</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>
                  ID{" "}
                  <p className="text-sm text-muted-foreground">
                    ระบบจะออก ID หลังสร้าง
                  </p>
                </Label>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อไอเทม</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="ใส่ชื่อไอเทม"
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      ชื่อจะถูกแสดงในรายการเมสเสจแบบสรุปหรือเมสเสจเต็ม
                    </p>
                  </FormItem>
                )}
              />
            </CardContent>

            <CardHeader>
              <CardTitle>ตั้งค่าการ์ด</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ประเภทการ์ด</FormLabel>
                    <FormControl>
                      <>
                        <input type="hidden" {...field} />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCategoryDialogOpen(true)}>
                          {selectedCategory?.label || "เลือก"}
                        </Button>
                      </>
                    </FormControl>
                    <CardCategoryDialog
                      open={isCategoryDialogOpen}
                      onOpenChange={setCategoryDialogOpen}
                      value={field.value || undefined}
                      onConfirm={(value) => field.onChange(value)}
                    />
                  </FormItem>
                )}
              />
              <div className="border-t pt-6">
                {!selectedCategoryId && (
                  <p className="text-muted-foreground text-sm">
                    เลือกประเภทการ์ดเพื่อเริ่มตั้งค่าส่วนแสดงผล
                  </p>
                )}

                {selectedCategoryId === "product" && (
                  <ProductCardEditor form={form} />
                )}

                {selectedCategoryId === "place" && (
                  <PlaceCardEditor form={form} />
                )}

                {selectedCategoryId === "person" && (
                  <PersonCardEditor form={form} />
                )}

                {selectedCategoryId === "image" && (
                  <ImageCardEditor form={form} />
                )}

                {selectedCategoryId &&
                  !["product", "place", "person", "image"].includes(
                    selectedCategoryId
                  ) &&
                  selectedCategory?.label && (
                    <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
                      แบบฟอร์มสำหรับ "{selectedCategory.label}"
                      กำลังจะพร้อมใช้งานเร็วๆ นี้
                    </div>
                  )}
              </div>
            </CardContent>
            <div className="flex justify-end p-5">
              <Button type="button" variant="ghost" onClick={onCancel}>
                ยกเลิก
              </Button>
              <Button type="button" onClick={form.handleSubmit(handleSubmit)}>
                บันทึก
              </Button>
            </div>
          </Card>
        </div>
      </form>
    </Form>
  );
}
