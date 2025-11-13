import type { ReactNode } from "react";
import { type Path, type UseFormReturn, useWatch } from "react-hook-form";

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
import { cn } from "~/lib/utils";
import { GlobalImage } from "~/components/shared/global-image";

import {
  type ImageCardFormValues,
  IMAGE_CARD_DEFAULT_VALUES,
  type MessageCardFormValues,
} from "./card-types";

const TAG_COLOR_OPTIONS = [
  "#4B5D73",
  "#5E5C6C",
  "#DA3B3B",
  "#F79009",
  "#2D9D78",
  "#2563EB",
] as const;

const ACTION_TYPE_OPTIONS = [
  { value: "link", label: "ลิงก์" },
  { value: "map", label: "แผนที่" },
  { value: "call", label: "โทร" },
] as const;

type ImageCardEditorProps = {
  form: UseFormReturn<MessageCardFormValues>;
};

export function ImageCardEditor({ form }: ImageCardEditorProps) {
  const imageValues =
    useWatch({
      control: form.control,
      name: "image",
    }) ?? IMAGE_CARD_DEFAULT_VALUES;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(260px,320px)_1fr]">
      <div className="lg:sticky lg:top-24">
        <ImageCardPreview values={imageValues} />
      </div>

      <div className="space-y-8">
        <SectionBlock
          title="แท็ก"
          description="เปิด/ปิดข้อความด้านบนและเลือกสีที่ต้องการ"
          control={
            <FormField
              control={form.control}
              name="image.tagEnabled"
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
              name="image.tagText"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="ใส่ข้อความแท็ก"
                      maxLength={12}
                      disabled={!imageValues.tagEnabled}
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
              name="image.tagColor"
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {TAG_COLOR_OPTIONS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      aria-label={`เลือกสี ${color}`}
                      disabled={!imageValues.tagEnabled}
                      onClick={() => field.onChange(color)}
                      className={cn(
                        "rounded-full border p-[2px] transition disabled:opacity-50",
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
        </SectionBlock>

        <SectionBlock title="รูป">
          <FormField
            control={form.control}
            name="image.imageUrl"
            render={({ field }) => (
              <FormItem className="max-w-sm">
                <FormLabel className="sr-only">รูปภาพ</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    width={240}
                    height={180}
                  />
                </FormControl>
                <p className="text-muted-foreground text-xs">
                  รองรับ JPG, PNG สูงสุด 5MB (แนะนำ 4:3)
                </p>
              </FormItem>
            )}
          />
        </SectionBlock>

        <SectionBlock
          title="ป้ายแอ็กชัน"
          control={
            <FormField
              control={form.control}
              name="image.actionEnabled"
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
                  <FormLabel className="cursor-pointer">
                    แสดงป้ายแอ็กชัน
                  </FormLabel>
                </FormItem>
              )}
            />
          }
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <FormField
              control={form.control}
              name="image.actionText"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="sr-only">ข้อความป้าย</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ใส่ข้อความสำหรับป้ายแอ็กชัน"
                      maxLength={15}
                      disabled={!imageValues.actionEnabled}
                      {...field}
                    />
                  </FormControl>
                  <p className="text-muted-foreground text-xs text-right">
                    {field.value?.length ?? 0}/15
                  </p>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image.actionType"
              render={({ field }) => (
                <FormItem className="w-full sm:w-44">
                  <FormLabel className="sr-only">ประเภท</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!imageValues.actionEnabled}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือก" />
                      </SelectTrigger>
                      <SelectContent>
                        {ACTION_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </SectionBlock>
      </div>
    </div>
  );
}

type SectionBlockProps = {
  title: string;
  description?: string;
  control?: ReactNode;
  children: ReactNode;
};

function SectionBlock({
  title,
  description,
  control,
  children,
}: SectionBlockProps) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
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

function ImageCardPreview({ values }: { values: ImageCardFormValues }) {
  const tagLabel = values.tagText || "ใส่ข้อความแท็ก";
  const actionLabel =
    values.actionEnabled && values.actionText
      ? values.actionText
      : "ใส่ข้อความสำหรับป้ายแอ็กชัน";

  return (
    <div className="rounded-2xl bg-muted/40 p-6">
      <div className="mx-auto w-full max-w-[240px] rounded-[24px] bg-white p-4 shadow-lg">
        <div className="relative overflow-hidden rounded-2xl bg-muted">
          {values.imageUrl ? (
            <GlobalImage
              src={values.imageUrl}
              alt="ภาพตัวอย่างการ์ด"
              width={220}
              height={220}
              className="h-full w-full object-cover"
              notShowPreview
            />
          ) : (
            <div className="flex h-44 items-center justify-center text-muted-foreground">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                role="img"
                aria-label="placeholder"
                className="h-12 w-12"
              >
                <path
                  d="M8 12a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0 8 8 6-4 8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {values.tagEnabled && (
            <span
              className="absolute left-3 top-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-tight text-white"
              style={{ backgroundColor: values.tagColor || "#4B5D73" }}
            >
              {tagLabel}
            </span>
          )}

          {values.actionEnabled && (
            <div className="absolute bottom-3 left-1/2 w-[85%] -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-center text-[12px] text-white">
              {actionLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
