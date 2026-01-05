import React from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "~/components/ui/form";
import { Switch } from "~/components/ui/switch";
// import ImageUpload from "@/components/shared/image-upload";
import { DatePicker } from "~/components/shared/date-picker";
import { RequiredLabel } from "~/components/shared/required-design";
import FileUpload from "~/components/shared/file-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import type { UseFormReturn } from "react-hook-form";
import { Input } from "~/components/ui/input";
import type { UsersFormValues } from "~/schemas/users/user";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  form: UseFormReturn<UsersFormValues>;
  indexPath: number;
};

export const documentTypeLabels = [
  { label: "เรซูเม่", value: "resume" },
  { label: "CV", value: "cv" },
  { label: "ใบรับรอง", value: "not_specified" },
  { label: "ใบแสดงผลการศึกษา", value: "transcript" },
  { label: "บัตรประชาชน", value: "id_card" },
  { label: "สัญญา", value: "contract" },
  { label: "อื่น ๆ", value: "other" },
];

export const DocumentModal: React.FC<Props> = ({
  open,
  title,
  onClose,
  onSubmit,
  form,
  indexPath,
}) => {
  const index = `profile.documents.${indexPath}` as const;
  const document = form.getValues(index);

  const [file, setFile] = React.useState(
    document && {
      url: document?.url,
      fileName: document.fileName,
      size: document.size,
      mimeType: document.mimeType,
    }
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95%] h-[80%] sm:w-[70%] sm:h-[75%] md:w-[60%] md:h-[70%] lg:w-[40%] lg:h-[80%] sm:max-w-xl md:max-w-3xl lg:max-w-5xl overflow-y-auto dark:bg-popover">
        <DialogHeader className="flex items-center justify-center gap-2">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="document-form"
            onSubmit={async (e) => {
              e.preventDefault();
              const ok = await form.trigger(`profile.documents.${indexPath}`, {
                shouldFocus: true,
              });
              if (!ok) return;
              onSubmit();
            }}
          >
            <div className="flex flex-col gap-5">
              {/* <FormField
                control={form.control}
                name={`${index}.url`}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>ไฟล์แนบ / URL</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value || ""}
                        onChange={field.onChange}
                        className="object-contain"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name={`${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel required>เอกสารแนบ</RequiredLabel>
                    <FormControl>
                      <FileUpload
                        value={file}
                        onChange={(value: any) => {
                          field.onChange(value?.url);

                          form.setValue(index, {
                            ...document,
                            url: value?.url,
                            mimeType: value?.mimeType,
                            size: value?.size,
                            checksum: "sha-26",
                            storageProvider: "gcs",
                          });

                          setFile(value);
                        }}
                        multiple={false}
                        // accept ปล่อย default ก็ได้ หรือกำหนดเอง
                        // accept={"image/*,application/pdf"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`${index}.type`}
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel required>ประเภทเอกสาร</RequiredLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกประเภทเอกสาร" />
                        </SelectTrigger>
                        <SelectContent>
                          {documentTypeLabels.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`${index}.fileName`}
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel required>ชื่อไฟล์</RequiredLabel>
                    <FormControl>
                      <Input {...field} placeholder="เช่น id_card.pdf" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* resume, cv, certificate, transcript, id_card, contract, other" */}
              {/* <FormField
                control={form.control}
                name={`${index}.mimeType`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ประเภทไฟล์</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="เช่น application/pdf" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              {/* <FormField
                control={form.control}
                name={`${index}.size`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ขนาดไฟล์ (ไบต์)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                          )
                        }
                        min="0"
                        step="1"
                        placeholder="เช่น 204800"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              {/* <FormField
                control={form.control}
                name={`${index}.storageProvider`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ผู้ให้บริการจัดเก็บ</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="เช่น S3, GCS" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              {/* <FormField
                control={form.control}
                name={`${index}.checksum`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รหัสตรวจสอบไฟล์ (Checksum)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="เช่น SHA-256" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name={`${index}.tags`}
                render={({ field }) => {
                  const display = Array.isArray(field.value)
                    ? field.value.join(", ")
                    : (field.value ?? "");
                  return (
                    <FormItem>
                      <FormLabel>แท็กกำกับไฟล์ (คั่นด้วย ,)</FormLabel>
                      <FormControl>
                        <Input
                          value={display}
                          onChange={(e) => {
                            const arr = e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean);
                            field.onChange(arr);
                          }}
                          placeholder="เช่น identity, confidential"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name={`${index}.isPrimary`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormLabel className="mb-0">
                      เป็นเอกสารหลักหรือไม่
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`${index}.version`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เวอร์ชันไฟล์</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                          )
                        }
                        min="0"
                        step="1"
                        placeholder="เช่น 1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`${index}.expiresAt`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>วันหมดอายุ</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value ?? ""}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`${index}.verified`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormLabel className="mb-0">
                      ผ่านการตรวจสอบหรือไม่
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name={`${index}.remark`}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>หมายเหตุ</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        {...field}
                        value={field.value ?? ""}
                        placeholder="รายละเอียดเพิ่มเติม"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
          </form>
        </Form>

        <DialogFooter className="flex justify-center gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-1/2"
          >
            ยกเลิก
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            form="document-form"
            className="w-1/2"
          >
            บันทึก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
