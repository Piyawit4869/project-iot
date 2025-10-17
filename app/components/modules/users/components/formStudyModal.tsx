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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} value={field.value ?? undefined} />
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
                        step="0.01"
                        min="0"
                        max="4"
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
                        onChange={field.onChange}
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
                        onChange={field.onChange}
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
                      <Input {...field} value={field.value ?? undefined} />
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
          <Button type="submit" form="education-form" className="w-[222px]">
            บันทึก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
