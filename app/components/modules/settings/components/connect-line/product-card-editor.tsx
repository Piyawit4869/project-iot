import type { CSSProperties, ReactNode } from "react";
import { type Path, type UseFormReturn, useWatch } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import ImageUpload from "~/components/shared/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";

import {
  type MessageCardFormValues,
  type ProductCardFormValues,
  PRODUCT_CARD_DEFAULT_VALUES,
} from "./card-types";

const TAG_COLOR_OPTIONS = [
  "#4B5D73",
  "#5E5C6C",
  "#DA3B3B",
  "#F79009",
  "#2D9D78",
  "#2563EB",
] as const;

type ProductCardEditorProps = {
  form: UseFormReturn<MessageCardFormValues>;
};

export function ProductCardEditor({ form }: ProductCardEditorProps) {
  const productValues =
    useWatch({
      control: form.control,
      name: "product",
    }) ?? PRODUCT_CARD_DEFAULT_VALUES;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(260px,320px)_1fr]">
      <div className="lg:sticky lg:top-24">
        <ProductCardPreview values={productValues} />
      </div>

      <div className="space-y-8">
        <CardFieldBlock
          title="แท็ก"
          description="เปิด/ปิดข้อความด้านบนและเลือกสีที่ต้องการ"
          control={
            <FormField
              control={form.control}
              name="product.tagEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer">แสดงแท็ก</FormLabel>
                </FormItem>
              )}
            />
          }
        >
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="product.tagText"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="ใส่ข้อความแท็ก"
                      maxLength={12}
                      disabled={!productValues.tagEnabled}
                      {...field}
                    />
                  </FormControl>
                  <p className="text-muted-foreground text-xs text-right">
                    {field.value?.length ?? 0}/12
                  </p>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product.tagColor"
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {TAG_COLOR_OPTIONS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      aria-label={`เลือกสี ${color}`}
                      disabled={!productValues.tagEnabled}
                      onClick={() => field.onChange(color)}
                      className={cn(
                        "border rounded-full p-[2px] transition disabled:opacity-50",
                        field.value === color
                          ? "border-primary"
                          : "border-transparent"
                      )}
                    >
                      <span
                        className="block size-6 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    </button>
                  ))}
                </div>
              )}
            />
          </div>
        </CardFieldBlock>

        <CardFieldBlock
          title="รูปภาพหลัก"
          description="อัปโหลดรูปสำหรับแสดงผลในการ์ด (แนะนำ 4:3)"
        >
          <FormField
            control={form.control}
            name="product.imageUrl"
            render={({ field }) => (
              <FormItem className="max-w-sm">
                <FormLabel className="sr-only">รูปภาพหลัก</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    width={180}
                    height={140}
                  />
                </FormControl>
                <p className="text-muted-foreground text-xs">
                  รองรับไฟล์ JPG, PNG ไม่เกิน 5MB
                </p>
              </FormItem>
            )}
          />
        </CardFieldBlock>

        <CardFieldBlock title="รายละเอียดการ์ด">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="product.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อการ์ด</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ใส่ชื่อการ์ด"
                      maxLength={20}
                      {...field}
                    />
                  </FormControl>
                  <p className="text-muted-foreground text-xs text-right">
                    {field.value?.length ?? 0}/20
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>คำอธิบาย</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="ใส่คำอธิบาย"
                      maxLength={120}
                      {...field}
                    />
                  </FormControl>
                  <p className="text-muted-foreground text-xs text-right">
                    {field.value?.length ?? 0}/120
                  </p>
                </FormItem>
              )}
            />
          </div>
        </CardFieldBlock>

        <CardFieldBlock
          title="ราคา"
          description="เลือกสกุลเงินและกำหนดจำนวน"
          control={
            <FormField
              control={form.control}
              name="product.priceEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer">แสดงราคา</FormLabel>
                </FormItem>
              )}
            />
          }
        >
          <div className="flex flex-wrap gap-3">
            <FormField
              control={form.control}
              name="product.currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">สกุลเงิน</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!productValues.priceEnabled}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="THB">THB (฿)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product.price"
              render={({ field }) => (
                <FormItem className="min-w-[160px] flex-1">
                  <FormLabel className="sr-only">จำนวน</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      placeholder="00,000"
                      disabled={!productValues.priceEnabled}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </CardFieldBlock>

        <CardFieldBlock
          title="ปุ่มแอ็กชัน"
          description="เพิ่มปุ่มเพื่อเชื่อมไปยังหน้าหรือการทำงานที่ต้องการ"
        >
          <div className="space-y-4">
            <ActionField
              form={form}
              enabledName="product.ctaPrimaryEnabled"
              textName="product.ctaPrimaryText"
              label="แอ็กชันหลัก"
            />
            <ActionField
              form={form}
              enabledName="product.ctaSecondaryEnabled"
              textName="product.ctaSecondaryText"
              label="แอ็กชันรอง"
            />
          </div>
        </CardFieldBlock>
      </div>
    </div>
  );
}

type CardFieldBlockProps = {
  title: string;
  description?: string;
  control?: ReactNode;
  children: ReactNode;
};

function CardFieldBlock({
  title,
  description,
  control,
  children,
}: CardFieldBlockProps) {
  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-semibold">{title}</p>
          {description ? (
            <p className="text-muted-foreground text-sm">{description}</p>
          ) : null}
        </div>
        {control}
      </div>
      {children}
    </section>
  );
}

type ActionFieldProps = {
  form: UseFormReturn<MessageCardFormValues>;
  enabledName: Path<MessageCardFormValues>;
  textName: any;
  label: string;
};

function ActionField({ form, enabledName, textName, label }: ActionFieldProps) {
  const enabled = form.watch(enabledName);

  return (
    <div className="grid gap-3 sm:grid-cols-[160px_1fr] items-start">
      <FormField
        control={form.control}
        name={enabledName}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-2 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value as any}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            </FormControl>
            <FormLabel className="cursor-pointer">{label}</FormLabel>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={textName}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="ใส่ข้อความสำหรับป้ายแอ็กชัน"
                disabled={!enabled}
                maxLength={15}
                {...field}
              />
            </FormControl>
            <p className="text-muted-foreground text-xs text-right">
              {field.value?.length ?? 0}/15
            </p>
          </FormItem>
        )}
      />
    </div>
  );
}

function ProductCardPreview({ values }: { values: ProductCardFormValues }) {
  const tagColor = values.tagColor || PRODUCT_CARD_DEFAULT_VALUES.tagColor;
  const showPrice = values.priceEnabled;
  const currencySymbol = values.currency === "USD" ? "$" : "฿";
  const title = values.title || "ใส่ชื่อการ์ด";
  const description = values.description || "ใส่คำอธิบาย";
  const priceText = values.price || "00,000";
  const tagLabel = values.tagText || "ใส่ข้อความแท็ก";
  const headerBackgroundStyle: CSSProperties = values.imageUrl
    ? {
        backgroundImage: `url(${values.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  return (
    <div className="rounded-2xl bg-muted/40 p-6">
      <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-[28px] bg-white text-card-foreground shadow-lg">
        <div
          className="rounded-t-[28px] px-5 pt-5 pb-10 text-white"
          style={{
            backgroundColor: "#6F96AE",
            minHeight: 200,
            ...headerBackgroundStyle,
          }}
        >
          {values.tagEnabled && (
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-tight"
              style={{ backgroundColor: tagColor }}
            >
              {tagLabel}
            </span>
          )}
        </div>
        <div className="space-y-3 px-5 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-base font-semibold">{title}</p>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>
          </div>
          {/* <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p> */}
          {showPrice && (
            <p className="text-right text-lg font-semibold">
              {currencySymbol}
              {priceText}
            </p>
          )}
          <div className="pt-2 text-center">
            {values.ctaPrimaryEnabled && (
              <p className="px-0 text-blue-500">
                {values.ctaPrimaryText || "ใส่ข้อความสำหรับป้ายแอ็กชัน"}
              </p>
            )}
            {values.ctaSecondaryEnabled && (
              <p className="mt-2 w-full text-sm text-blue-500">
                {values.ctaSecondaryText || "ป้ายแอ็กชันรอง"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
