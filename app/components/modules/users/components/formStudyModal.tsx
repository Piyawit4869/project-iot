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
import type { UsersFormValues } from "~/schemas/users/user";
import type { UseFormReturn } from "react-hook-form";
import { RequiredLabel } from "~/components/shared/required-design";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { InputNumberBox } from "~/components/shared/input-number-box";
import type { RangeDate } from "./formInformationCreate";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  form: UseFormReturn<UsersFormValues>;
  indexPath: number;
};

export const UserStudyModal: React.FC<Props> = ({
  open,
  title,
  onClose,
  onSubmit,
  form,
  indexPath,
}) => {
  const index = `profile.educationInformations.${indexPath}` as const;
  const [rangeDate, setRangeDate] = React.useState<RangeDate>({});

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-[90vw] sm:max-w-xl md:w-[80vw] md:max-w-3xl lg:w-[70vw] lg:max-w-5xl max-h-[85vh] overflow-y-auto  dark:bg-popover">
        <DialogHeader className="flex items-center justify-center gap-2">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="education-form"
            onSubmit={async (e) => {
              e.preventDefault();
              const ok = await form.trigger(
                `profile.educationInformations.${indexPath}`,
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
                name={`${index}.institution`}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <RequiredLabel required>สถาบันการศึกษา</RequiredLabel>
                    <FormControl>
                      <Input {...field} placeholder="เช่น มหาวิทยาลัยขอนแก่น" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.degree`}
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel required>ระดับการศึกษา</RequiredLabel>
                    <FormControl>
                      <Input {...field} placeholder="เช่น ปริญญาตรี" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.major`}
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel required>สาขา</RequiredLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="เช่น วิทยาการคอมพิวเตอร์"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.faculty`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>คณะ</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? undefined}
                        placeholder="เช่น คณะมนุษยศาสตร์และสังคมศาสตร์"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.gpa`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เกรดเฉลี่ย</FormLabel>
                    <FormControl>
                      {/* <InputNumberBox
                        value={
                          field.value !== undefined ? String(field.value) : ""
                        }
                        onChange={field.onChange}
                        groups={[1, 2]}
                        format="."
                      /> */}
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
                        onBlur={() => {
                          if (field.value === undefined) return;

                          let num = Number(field.value);

                          if (isNaN(num)) {
                            field.onChange(undefined);
                            return;
                          }

                          num = Math.min(Math.max(num, 0), 4);

                          field.onChange(num.toFixed(2));
                        }}
                        placeholder="เช่น 3.25"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>วันที่เริ่ม</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value ?? ""}
                        placeholder="เลือกวันที่เริ่มศึกษา"
                        onChange={(val?: string) => {
                          field.onChange(val);
                          setRangeDate((prev: any) => ({
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
                    <FormLabel>วันที่สำเร็จการศึกษา</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value ?? ""}
                        placeholder="เลือกวันที่สำเร็จการศึกษา"
                        onChange={field.onChange}
                        disabled={(d: string) => {
                          if (!rangeDate.from) return false;
                          const dd = new Date(d);
                          dd.setHours(0, 0, 0, 0);
                          return dd < rangeDate.from;
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.isGraduated`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 md:col-span-2">
                    <FormLabel className="mb-0">จบการศึกษาหรือไม่</FormLabel>
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
                name={`${index}.description`}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>รายละเอียดเพิ่มเติม</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? undefined}
                        placeholder="เช่น เกียรตินิยม / หลักสูตรนานาชาติ"
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
            form="education-form"
            onClick={onSubmit}
            className="w-[222px]"
          >
            บันทึก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
