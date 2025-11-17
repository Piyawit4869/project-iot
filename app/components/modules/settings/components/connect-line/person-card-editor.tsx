import { UserRound } from "lucide-react";
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
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { GlobalImage } from "~/components/shared/global-image";

import {
  type MessageCardFormValues,
  type PersonCardFormValues,
  PERSON_CARD_DEFAULT_VALUES,
  type PersonActionType,
} from "./card-types";

const TAG_COLOR_OPTIONS = [
  "#4B5D73",
  "#5E5C6C",
  "#DA3B3B",
  "#F79009",
  "#2D9D78",
  "#2563EB",
] as const;

const PERSON_ACTION_OPTIONS: { value: PersonActionType; label: string }[] = [
  { value: "link", label: "ลิงก์" },
  { value: "call", label: "โทร" },
  { value: "chat", label: "แชท" },
];

type PersonCardEditorProps = {
  form: UseFormReturn<MessageCardFormValues>;
};

export function PersonCardEditor({ form }: PersonCardEditorProps) {
  const personValues =
    useWatch({
      control: form.control,
      name: "person",
    }) ?? PERSON_CARD_DEFAULT_VALUES;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(260px,320px)_1fr]">
      <div className="lg:sticky lg:top-24">
        <PersonCardPreview values={personValues} />
      </div>

      <div className="space-y-8">
        <SectionBlock title="รูป">
          <FormField
            control={form.control}
            name="person.imageUrl"
            render={({ field }) => (
              <FormItem className="max-w-sm">
                <FormLabel className="sr-only">รูปโปรไฟล์</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    width={180}
                    height={180}
                  />
                </FormControl>
                <p className="text-muted-foreground text-xs">
                  แนะนำรูปอัตราส่วน 1:1 ขนาดไม่เกิน 5MB
                </p>
              </FormItem>
            )}
          />
        </SectionBlock>

        <SectionBlock title="ชื่อ">
          <FormField
            control={form.control}
            name="person.name"
            render={({ field }) => (
              <FormItem className="max-w-md">
                <FormLabel className="sr-only">ชื่อ</FormLabel>
                <FormControl>
                  <Input placeholder="ใส่ชื่อ" maxLength={20} {...field} />
                </FormControl>
                <p className="text-muted-foreground text-xs text-right">
                  {field.value?.length ?? 0}/20
                </p>
              </FormItem>
            )}
          />
        </SectionBlock>

        <SectionBlock
          title="แท็ก"
          description="เปิด/ปิดและเลือกสีสำหรับแต่ละแท็ก"
        >
          <div className="grid gap-4">
            {["แท็ก 1", "แท็ก 2", "แท็ก 3"].map((label, index) => (
              <PersonTagField
                key={label}
                form={form}
                index={index}
                label={label}
              />
            ))}
          </div>
        </SectionBlock>

        <SectionBlock
          title="คำอธิบาย"
          control={
            <FormField
              control={form.control}
              name="person.descriptionEnabled"
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
                  <FormLabel className="cursor-pointer">แสดงคำอธิบาย</FormLabel>
                </FormItem>
              )}
            />
          }
        >
          <FormField
            control={form.control}
            name="person.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">คำอธิบาย</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder="ใส่คำอธิบาย"
                    maxLength={60}
                    disabled={!personValues.descriptionEnabled}
                    {...field}
                  />
                </FormControl>
                <p className="text-muted-foreground text-xs text-right">
                  {field.value?.length ?? 0}/60
                </p>
              </FormItem>
            )}
          />
        </SectionBlock>

        <SectionBlock title="ปุ่มแอ็กชัน">
          <div className="space-y-4">
            <PersonActionField form={form} index={0} label="แอ็กชัน 1" />
            <PersonActionField form={form} index={1} label="แอ็กชัน 2" />
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

type PersonTagFieldProps = {
  form: UseFormReturn<MessageCardFormValues>;
  index: number;
  label: string;
};

function tagFieldName<T extends "enabled" | "text" | "color">(
  index: number,
  key: T
) {
  return `person.tags.${index}.${key}` as Path<MessageCardFormValues>;
}

function PersonTagField({ form, index, label }: PersonTagFieldProps) {
  const enabledName = tagFieldName(index, "enabled");
  const textName = tagFieldName(index, "text");
  const colorName = tagFieldName(index, "color");
  const enabled = form.watch(enabledName);

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <FormField
        control={form.control}
        name={enabledName}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-2 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
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
                placeholder="ใส่ข้อความแท็ก"
                maxLength={12}
                disabled={!enabled}
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
        name={colorName}
        render={({ field }) => (
          <div className="flex flex-wrap gap-2">
            {TAG_COLOR_OPTIONS.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`เลือกสี ${color}`}
                disabled={!enabled}
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
  );
}

type PersonActionFieldProps = {
  form: UseFormReturn<MessageCardFormValues>;
  index: number;
  label: string;
};

function actionFieldName<T extends "enabled" | "type" | "text">(
  index: number,
  key: T
) {
  return `person.actions.${index}.${key}` as Path<MessageCardFormValues>;
}

function PersonActionField({ form, index, label }: PersonActionFieldProps) {
  const enabledName = actionFieldName(index, "enabled");
  const typeName = actionFieldName(index, "type");
  const textName = actionFieldName(index, "text");
  const enabled = form.watch(enabledName);

  return (
    <div className="grid gap-3 md:grid-cols-[160px_160px_1fr] items-start">
      <FormField
        control={form.control}
        name={enabledName}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-2 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            </FormControl>
            <FormLabel className="cursor-pointer whitespace-nowrap">
              {label}
            </FormLabel>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={typeName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">ประเภท</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={!enabled}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="เลือก" />
                </SelectTrigger>
                <SelectContent>
                  {PERSON_ACTION_OPTIONS.map((option) => (
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
      <FormField
        control={form.control}
        name={textName}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="ใส่ข้อความสำหรับป้ายแอ็กชัน"
                maxLength={15}
                disabled={!enabled}
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

function PersonCardPreview({ values }: { values: PersonCardFormValues }) {
  const name = values.name?.trim() || "ใส่ชื่อ";
  const description =
    values.descriptionEnabled && values.description
      ? values.description
      : values.descriptionEnabled
        ? "ใส่คำอธิบาย"
        : "";
  const enabledTags = values.tags?.filter((tag) => tag.enabled) ?? [];
  const [actionPrimary, actionSecondary] = values.actions ?? [];

  return (
    <div className="rounded-2xl bg-muted/40 p-6">
      <div className="mx-auto w-full max-w-[260px] rounded-[24px] bg-white p-6 text-center shadow-lg">
        <div className="mx-auto mb-4 size-24 overflow-hidden rounded-full bg-muted flex items-center justify-center">
          {values.imageUrl ? (
            <GlobalImage
              src={values.imageUrl}
              alt="รูปโปรไฟล์"
              width={96}
              height={96}
              className="h-full w-full object-cover"
              notShowPreview
            />
          ) : (
            <UserRound className="size-10 text-muted-foreground" />
          )}
        </div>
        <p className="text-base font-semibold">{name}</p>
        {enabledTags.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {enabledTags.map((tag, idx) => (
              <span
                key={`${tag.text}-${idx}`}
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-tight text-white"
                style={{ backgroundColor: tag.color || "#4B5D73" }}
              >
                {tag.text?.trim() || "ใส่ข้อความแท็ก"}
              </span>
            ))}
          </div>
        )}
        {values.descriptionEnabled && (
          <p className="mt-3 text-sm text-muted-foreground">{description}</p>
        )}
        {(actionPrimary?.enabled || actionSecondary?.enabled) && (
          <div className="pt-2 text-center">
            {actionPrimary?.enabled && (
              <p className="px-0 text-blue-500">
                {actionPrimary.text?.trim() || "ใส่ข้อความสำหรับป้ายแอ็กชัน"}
              </p>
            )}
            {actionSecondary?.enabled && (
              <p className="mt-2 text-sm text-blue-500">
                {actionSecondary.text?.trim() || "ป้ายแอ็กชันรอง"}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
