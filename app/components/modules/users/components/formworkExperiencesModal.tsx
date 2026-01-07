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

import { DatePicker } from "~/components/shared/date-picker";
import { RequiredLabel } from "~/components/shared/required-design";
import type { UseFormReturn } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { GlobalFormField } from "~/components/shared/global-formField";
import { cn } from "~/lib/utils";
import type { RangeDate } from "./formInformationCreate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { contractType } from "~/types/user/init-data";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  form: UseFormReturn<any>;
  indexPath: number;
};

export const WorkExperienceModal: React.FC<Props> = ({
  open,
  title,
  onClose,
  onSubmit,
  form,
  indexPath,
}) => {
  const index = `profile.workExperiences.${indexPath}` as const;
  const isCurrent = form.watch(`${index}.isCurrent`);
  const [rangeDate, setRangeDate] = React.useState<RangeDate>({});

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-[90vw] sm:max-w-xl md:w-[80vw] md:max-w-3xl lg:w-[70vw] lg:max-w-5xl max-h-[85vh] overflow-y-auto  dark:bg-popover">
        <DialogHeader className="flex items-center justify-center gap-2">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="workexp-form"
            onSubmit={async (e) => {
              e.preventDefault();
              const ok = await form.trigger(
                `profile.workExperiences.${indexPath}`,
                {
                  shouldFocus: true,
                }
              );
              if (!ok) return;
              onSubmit();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name={`${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel required>ชื่อบริษัท</RequiredLabel>
                    <FormControl>
                      <Input {...field} placeholder="เช่น ACME Co., Ltd." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.position`}
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel required>ตำแหน่งงาน</RequiredLabel>
                    <FormControl>
                      <Input {...field} placeholder="เช่น Software Engineer" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.employmentType`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ประเภทการจ้างงาน</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full shadow-none">
                            <SelectValue
                              placeholder="เช่น Full-time, Contract"
                              defaultValue="THB"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {contractType.map((item) => {
                            return (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name={`${index}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>วันที่เริ่มงาน</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value ?? ""}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name={`${index}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel required>วันที่เริ่มงาน</RequiredLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value ?? ""}
                        onChange={(val?: string) => {
                          field.onChange(val);
                          setRangeDate((prev) => ({
                            ...prev,
                            from: val ? new Date(val) : undefined,
                          }));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.endDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>วันที่สิ้นสุดงาน</FormLabel>
                    <FormControl>
                      <div
                        className={cn(
                          "relative",
                          isCurrent && "pointer-events-none opacity-50"
                        )}
                      >
                        <DatePicker
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          disabled={(d: string) => {
                            if (!rangeDate.from) return false;
                            const dd = new Date(d);
                            dd.setHours(0, 0, 0, 0);
                            return dd < rangeDate.from;
                          }}
                        />

                        {isCurrent && (
                          <div className="absolute inset-0 cursor-not-allowed" />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.location`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ที่ตั้งงาน</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="เช่น กรุงเทพฯ / Remote"
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`${index}.isCurrent`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ปัจจุบันทำงานที่นี่หรือไม่</FormLabel>
                    <FormControl>
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={(val) => {
                          field.onChange(val);
                          if (val) {
                            form.setValue(`${index}.endDate` as any, "");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.description`}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>รายละเอียดงาน</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="สรุปหน้าที่ ความรับผิดชอบ หรือผลงานเด่น"
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <DialogFooter className="flex justify-center gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-[222px]"
          >
            ยกเลิก
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            form="workexp-form"
            className="w-[222px]"
          >
            บันทึก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
