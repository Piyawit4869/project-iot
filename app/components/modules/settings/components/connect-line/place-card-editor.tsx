import { type ReactNode } from "react";
import { type Path, type UseFormReturn, useWatch } from "react-hook-form";
import { Clock, Info, MapPin, PhoneCall } from "lucide-react";

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
  type PlaceCardFormValues,
  PLACE_CARD_DEFAULT_VALUES,
} from "./card-types";

const TAG_COLOR_OPTIONS = [
  "#4B5D73",
  "#5E5C6C",
  "#DA3B3B",
  "#F79009",
  "#2D9D78",
  "#2563EB",
] as const;

const EXTRA_INFO_TYPE_OPTIONS = [
  { value: "time", label: "เวลา" },
  { value: "phone", label: "เบอร์ติดต่อ" },
  { value: "custom", label: "กำหนดเอง" },
] as const;

const ACTION_TYPE_OPTIONS = [
  { value: "link", label: "ลิงก์" },
  { value: "map", label: "แผนที่" },
  { value: "call", label: "โทร" },
] as const;

type PlaceCardEditorProps = {
  form: UseFormReturn<MessageCardFormValues>;
};

export function PlaceCardEditor({ form }: PlaceCardEditorProps) {
  const placeValues =
    useWatch({
      control: form.control,
      name: "place",
    }) ?? PLACE_CARD_DEFAULT_VALUES;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(260px,320px)_1fr]">
      <div className="lg:sticky lg:top-24">
        <PlaceCardPreview values={placeValues} />
      </div>

      <div className="space-y-8">
        <CardFieldBlock
          title="แท็ก"
          description="เปิด/ปิดข้อความด้านบนและเลือกสีที่ต้องการ"
          control={
            <FormField
              control={form.control}
              name="place.tagEnabled"
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
              name="place.tagText"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="ใส่ข้อความแท็ก"
                      maxLength={12}
                      disabled={!placeValues.tagEnabled}
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
              name="place.tagColor"
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {TAG_COLOR_OPTIONS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      aria-label={`เลือกสี ${color}`}
                      disabled={!placeValues.tagEnabled}
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
            name="place.imageUrl"
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
          <FormField
            control={form.control}
            name="place.title"
            render={({ field }) => (
              <FormItem className="max-w-xl">
                <FormLabel>ชื่อการ์ด</FormLabel>
                <FormControl>
                  <Input placeholder="ใส่ชื่อการ์ด" maxLength={20} {...field} />
                </FormControl>
                <p className="text-muted-foreground text-xs text-right">
                  {field.value?.length ?? 0}/20
                </p>
              </FormItem>
            )}
          />
        </CardFieldBlock>

        <CardFieldBlock
          title="ที่อยู่"
          description="เพิ่มรายละเอียดและปุ่มเพื่อพาผู้ใช้ไปยังตำแหน่ง"
          control={
            <FormField
              control={form.control}
              name="place.addressEnabled"
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
                  <FormLabel className="cursor-pointer">แสดงที่อยู่</FormLabel>
                </FormItem>
              )}
            />
          }
        >
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="place.addressText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รายละเอียดที่อยู่</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="ใส่ที่อยู่"
                      maxLength={60}
                      disabled={!placeValues.addressEnabled}
                      {...field}
                    />
                  </FormControl>
                  <p className="text-muted-foreground text-xs text-right">
                    {field.value?.length ?? 0}/60
                  </p>
                </FormItem>
              )}
            />
          </div>
        </CardFieldBlock>

        <CardFieldBlock
          title="ข้อมูลเพิ่มเติม"
          description="ใช้แจ้งเวลาเปิดทำการ หรือข้อมูลสำคัญอื่นๆ"
          control={
            <FormField
              control={form.control}
              name="place.extraInfoEnabled"
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
                  <FormLabel className="cursor-pointer">แสดงข้อมูล</FormLabel>
                </FormItem>
              )}
            />
          }
        >
          <div className="flex flex-wrap gap-3">
            <FormField
              control={form.control}
              name="place.extraInfoType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">ประเภท</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!placeValues.extraInfoEnabled}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="เลือก" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXTRA_INFO_TYPE_OPTIONS.map((option) => (
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
              name="place.extraInfoValue"
              render={({ field }) => (
                <FormItem className="min-w-[200px] flex-1">
                  <FormLabel className="sr-only">ข้อมูลเพิ่มเติม</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ใส่ข้อมูลเพิ่มเติม"
                      maxLength={30}
                      disabled={!placeValues.extraInfoEnabled}
                      {...field}
                    />
                  </FormControl>
                  <p className="text-muted-foreground text-xs text-right">
                    {field.value?.length ?? 0}/30
                  </p>
                </FormItem>
              )}
            />
          </div>
        </CardFieldBlock>

        <CardFieldBlock
          title="ปุ่มแอ็กชัน"
          description="เพิ่มปุ่มเพื่อนำผู้ใช้ไปยังกิจกรรมที่คุณต้องการ"
        >
          <div className="space-y-4">
            <PlaceActionField
              form={form}
              enabledName="place.ctaPrimaryEnabled"
              typeName="place.ctaPrimaryType"
              textName="place.ctaPrimaryText"
              label="แอ็กชัน 1"
            />
            <PlaceActionField
              form={form}
              enabledName="place.ctaSecondaryEnabled"
              typeName="place.ctaSecondaryType"
              textName="place.ctaSecondaryText"
              label="แอ็กชัน 2"
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

type PlaceActionFieldProps = {
  form: UseFormReturn<MessageCardFormValues>;
  enabledName: Path<MessageCardFormValues>;
  typeName: Path<MessageCardFormValues>;
  textName: Path<MessageCardFormValues>;
  label: string;
};

function PlaceActionField({
  form,
  enabledName,
  typeName,
  textName,
  label,
}: PlaceActionFieldProps) {
  const enabled = form.watch(enabledName);

  return (
    <div className="grid gap-3 md:grid-cols-[200px_minmax(120px,160px)_1fr] items-start">
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

function PlaceCardPreview({ values }: { values: PlaceCardFormValues }) {
  const tagColor = values.tagColor || PLACE_CARD_DEFAULT_VALUES.tagColor;
  const tagLabel = values.tagText || "ใส่ข้อความแท็ก";
  const title = values.title || "ใส่ชื่อการ์ด";
  const address = values.addressText || "ใส่ที่อยู่";
  const extraInfo = values.extraInfoValue || "ใส่ข้อมูลเพิ่มเติม";

  const ExtraIcon =
    values.extraInfoType === "time"
      ? Clock
      : values.extraInfoType === "phone"
        ? PhoneCall
        : Info;

  return (
    <div className="rounded-2xl bg-muted/40 p-6">
      <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-[28px] bg-white text-card-foreground shadow-lg">
        <div
          className="rounded-t-[28px] px-5 pt-5 pb-10 text-white"
          style={{
            backgroundColor: "#6F96AE",
            minHeight: 200,
            ...(values.imageUrl
              ? {
                  backgroundImage: `url(${values.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}),
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
          <p className="text-base font-semibold">{title}</p>
          {values.addressEnabled && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4" />
              <div>
                <p>{address}</p>
              </div>
            </div>
          )}
          {values.extraInfoEnabled && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <ExtraIcon className="mt-0.5 size-4" />
              <p>{extraInfo}</p>
            </div>
          )}
          <div className="pt-2 text-center">
            {values.ctaPrimaryEnabled && (
              <p className="px-0 text-blue-500">
                {values.ctaPrimaryText || "ใส่ข้อความสำหรับป้ายแอ็กชัน"}
              </p>
            )}
            {values.ctaSecondaryEnabled && (
              <p className="mt-2 text-sm text-blue-500">
                {values.ctaSecondaryText || "ป้ายแอ็กชันรอง"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
