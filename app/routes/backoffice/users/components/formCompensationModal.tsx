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

import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "~/components/shared/date-picker";
import { RequiredLabel } from "~/components/shared/required-design";
import type { UseFormReturn } from "react-hook-form";
import type { UsersFormValues } from "../user-schema/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  form: UseFormReturn<UsersFormValues>;
  indexPath: number;
  updateCf: any;
};

const unitOptions = [
  { value: "THB", label: "THB" },
  { value: "USD", label: "USD" },
];

export const CompensationModal: React.FC<Props> = ({
  open,
  title,
  onClose,
  onSubmit,
  form,
  indexPath,
}) => {
  const index = `profile.compensationConfigs.${indexPath}` as const;
  const defaultCurrencyValue = form.getValues(`${index}.currency` as const);

  React.useEffect(() => {
    if (!defaultCurrencyValue) {
      form.setValue(`profile.compensationConfigs.${indexPath}.currency`, "THB");
    }
  }, [defaultCurrencyValue]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-[95vw] sm:w-[90vw] sm:max-w-xl md:w-[80vw] md:max-w-3xl lg:w-[70vw] lg:max-w-5xl max-h-[85vh] overflow-y-auto dark:bg-popover"
      >
        <DialogHeader className="flex items-center justify-center gap-2">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="compensation-form"
            onSubmit={async (e) => {
              e.preventDefault();
              const ok = await form.trigger(
                `profile.compensationConfigs.${indexPath}`,
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
                name={`${index}.baseSalary`}
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel required>เงินเดือนพื้นฐาน</RequiredLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={
                          field.value && field.value === 0
                            ? undefined
                            : field.value
                        }
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder="เช่น 50000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.currency`}
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel required>สกุลเงิน</RequiredLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full shadow-none">
                          <SelectValue
                            placeholder="สกุลเงิน"
                            defaultValue="THB"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {unitOptions.map((item) => {
                          return (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.bonusEligible`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 md:col-span-2">
                    <FormLabel className="mb-0">มีสิทธิ์โบนัสหรือไม่</FormLabel>
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
                name={`${index}.bonusRate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>อัตราโบนัส (%)</FormLabel>
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
                        step="0.1"
                        placeholder="เช่น 10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.allowance`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เบี้ยเลี้ยง</FormLabel>
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
                        placeholder="เช่น 3000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.insurance`}
                render={({ field }) => (
                  <FormItem className="mt-1.5">
                    <FormLabel>ประกันที่ได้รับ</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="เช่น ประกันสุขภาพ A"
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.contractType`}
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel required>ประเภทสัญญาจ้าง</RequiredLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="เช่น Permanent, Contract"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${index}.effectiveDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>วันที่เริ่มมีผล</FormLabel>
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
                name={`${index}.expireDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>วันที่สิ้นสุด</FormLabel>
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
                name={`${index}.providentFund`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormLabel className="mb-0">กองทุนสำรองเลี้ยงชีพ</FormLabel>
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
                        placeholder="หมายเหตุ หรือเงื่อนไขเพิ่มเติม"
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
          <Button type="submit" form="compensation-form" className="w-[222px]">
            บันทึก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
