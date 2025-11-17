import { useMemo, useState } from "react";
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

export default function MessageCardForm() {
  const form = useForm<MessageCardFormValues>({
    defaultValues: MESSAGE_CARD_DEFAULT_VALUES,
    mode: "onChange",
  });
  const [isCategoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const selectedCategoryId = form.watch("category");
  const nameValue = form.watch("name");
  const productValues = form.watch("product");
  const placeValues = form.watch("place");
  const personValues = form.watch("person");
  const imageValues = form.watch("image");
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
      const payload = {
        name: values.name.trim(),
        category: values.category,
        ...categoryPayload,
      };

      // await ApiConfig.post("/thirdparty/line/content-reply", payload);

      toast.success("บันทึกการ์ดสำเร็จ", {
        id: toastId,
        duration: 2000,
        position: "bottom-right",
      });
      form.reset(MESSAGE_CARD_DEFAULT_VALUES);
      setCategoryDialogOpen(false);
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

  const isFieldFilled = (value?: string) =>
    Boolean(value && value.toString().trim().length > 0);

  const isProductCardValid = useMemo(() => {
    if (selectedCategoryId !== "product") return false;
    if (!productValues) return false;
    if (!productValues.imageUrl) return false;
    if (!isFieldFilled(productValues.title)) return false;
    if (!isFieldFilled(productValues.subtitle)) return false;
    if (!isFieldFilled(productValues.description)) return false;

    if (productValues.tagEnabled && !isFieldFilled(productValues.tagText)) {
      return false;
    }

    if (productValues.priceEnabled && !isFieldFilled(productValues.price)) {
      return false;
    }

    if (
      productValues.ctaPrimaryEnabled &&
      !isFieldFilled(productValues.ctaPrimaryText)
    ) {
      return false;
    }

    if (
      productValues.ctaSecondaryEnabled &&
      !isFieldFilled(productValues.ctaSecondaryText)
    ) {
      return false;
    }

    return true;
  }, [productValues, selectedCategoryId]);

  const isPlaceCardValid = useMemo(() => {
    if (selectedCategoryId !== "place") return false;
    if (!placeValues) return false;
    if (!placeValues.imageUrl) return false;
    if (!isFieldFilled(placeValues.title)) return false;

    if (placeValues.tagEnabled && !isFieldFilled(placeValues.tagText)) {
      return false;
    }

    if (placeValues.addressEnabled && !isFieldFilled(placeValues.addressText)) {
      return false;
    }

    if (
      placeValues.extraInfoEnabled &&
      !isFieldFilled(placeValues.extraInfoValue)
    ) {
      return false;
    }

    if (
      placeValues.ctaPrimaryEnabled &&
      (!isFieldFilled(placeValues.ctaPrimaryText) ||
        !isFieldFilled(placeValues.ctaPrimaryType))
    ) {
      return false;
    }

    if (
      placeValues.ctaSecondaryEnabled &&
      (!isFieldFilled(placeValues.ctaSecondaryText) ||
        !isFieldFilled(placeValues.ctaSecondaryType))
    ) {
      return false;
    }

    return true;
  }, [placeValues, selectedCategoryId]);

  const isPersonCardValid = useMemo(() => {
    if (selectedCategoryId !== "person") return false;
    if (!personValues) return false;
    if (!personValues.imageUrl) return false;
    if (!isFieldFilled(personValues.name)) return false;

    const invalidTag =
      personValues.tags?.some(
        (tag) => tag.enabled && !isFieldFilled(tag.text)
      ) ?? false;

    if (invalidTag) return false;

    if (
      personValues.descriptionEnabled &&
      !isFieldFilled(personValues.description)
    ) {
      return false;
    }

    const invalidAction =
      personValues.actions?.some(
        (action) =>
          action.enabled &&
          (!isFieldFilled(action.text) || !isFieldFilled(action.type))
      ) ?? false;

    if (invalidAction) return false;

    return true;
  }, [personValues, selectedCategoryId]);

  const isImageCardValid = useMemo(() => {
    if (selectedCategoryId !== "image") return false;
    if (!imageValues) return false;
    if (!imageValues.imageUrl) return false;

    if (imageValues.tagEnabled && !isFieldFilled(imageValues.tagText)) {
      return false;
    }

    if (
      imageValues.actionEnabled &&
      (!isFieldFilled(imageValues.actionText) ||
        !isFieldFilled(imageValues.actionType))
    ) {
      return false;
    }

    return true;
  }, [imageValues, selectedCategoryId]);

  const categoryIsReady = useMemo(() => {
    if (!selectedCategoryId) return false;
    switch (selectedCategoryId) {
      case "product":
        return isProductCardValid;
      case "place":
        return isPlaceCardValid;
      case "person":
        return isPersonCardValid;
      case "image":
        return isImageCardValid;
      default:
        return false;
    }
  }, [
    isImageCardValid,
    isPersonCardValid,
    isPlaceCardValid,
    isProductCardValid,
    selectedCategoryId,
  ]);

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex w-full flex-col  space-y-6">
          <h1 className="text-2xl font-bold">การ์ดเมสเสจ</h1>
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
                          onClick={() => setCategoryDialogOpen(true)}
                        >
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
