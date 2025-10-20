import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { Textarea } from "~/components/ui/textarea";
import { type UseFormReturn } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { RequiredLabel } from "~/components/shared/required-design";
import { Switch } from "~/components/ui/switch";
import { Separator } from "~/components/ui/separator";
import type { InventoryCreateDTO } from "~/schemas/product/detail/InventorySchema";

interface FormInventoryProps {
  form: UseFormReturn<InventoryCreateDTO>;
  onSubmit: (values: InventoryCreateDTO) => void;
}

export const FormInventory: React.FC<FormInventoryProps> = (
  props: FormInventoryProps
) => {
  const { form, onSubmit } = props;

  return (
    <Form {...form}>
      <form id="inventory" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-8 mt-4  w-[60%]">
          <div className="flex flex-3 flex-col gap-6">
            <h1 className=" font-bold">ข้อมูลคลังสินค้า</h1>

            <div className="flex flex-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-2">
                    <RequiredLabel required>ชื่อ</RequiredLabel>
                    <FormControl className="w-full">
                      <Input placeholder="ชื่อ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem className="flex-2 mt-1">
                    <FormLabel>ความจุของสินค้า</FormLabel>
                    <FormControl className="w-full">
                      <Input placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รายละเอียด</FormLabel>
                  <FormControl>
                    <Textarea placeholder="รายละเอียด" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-col mb-5">
                  <FormLabel>สถานะการใช้งาน</FormLabel>
                  <FormControl className="items-center">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
