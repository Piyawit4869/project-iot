import { EditIcon } from "lucide-react";
import React from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizeble";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import type { ConnectAiValues } from "~/schemas/settings";
import { InstructionEditModal } from "../config/instruction-edit-modal";

interface ChatbotSideBarSettingsProps {
  form: UseFormReturn<ConnectAiValues>;
  id: string;
}

export const ChatbotSideBarSettings: React.FC<ChatbotSideBarSettingsProps> = (
  props
) => {
  const { form, id } = props;

  const [open, setOpen] = React.useState(false);

  const handleOpenEditInstructions = () => {
    setOpen(true);
  };

  const onConfirmEditInstructions = (value: string) => {
    form.setValue("systemInstructions", value);

    setOpen(false);
  };

  return (
    <div className="w-full">
      {open && (
        <InstructionEditModal
          form={form}
          open={open}
          onOpenChange={setOpen}
          onConfirm={(value) => onConfirmEditInstructions(value)}
          onClose={() => setOpen(false)}
        />
      )}
      <div className="space-y-4 pr-6 pt-4">
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>การใช้งาน เปิด/ปิด</FormLabel>
              <FormControl>
                <Switch
                  defaultChecked
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อ</FormLabel>
              <FormControl>
                <Input
                  placeholder="Assistant name"
                  {...field}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="systemInstructions"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row justify-between gap-3">
                <FormLabel>คำแนะนำระบบ</FormLabel>

                <EditIcon
                  size={18}
                  className="cursor-pointer"
                  onClick={handleOpenEditInstructions}
                />
              </div>
              <FormControl>
                <Textarea
                  placeholder="Style, tone, context, etc."
                  className="min-h-[100px] bg-white dark:bg-background"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>โน้ต</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Style, tone, context, etc."
                  className="min-h-[100px] bg-white dark:bg-background"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>หมายเหตุ</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Style, tone, context, etc."
                  className="min-h-[100px] bg-white dark:bg-background"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="defaultIsAiReply"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel className="mb-0">File Search</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="useStock"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>ดึงข้อมูลสินค้าจริง</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consentPii"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>เก็บข้อมูลส่วนบุคคล</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="temperature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                ระดับควบคุมความคิดสร้างสรรค์ของ AI :{" "}
                {Number(field.value ?? 0).toFixed(2)}
              </FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={2}
                  step={0.01}
                  value={[Number(field.value ?? 0)]}
                  onValueChange={(val) => field.onChange(val[0])}
                  className="[&>span:first-child]:bg-gray-400"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topP"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                ระดับการควบคุมมั่นใจของ AI :{" "}
                {Number(field.value ?? 0).toFixed(2)}
              </FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={[Number(field.value ?? 0)]}
                  onValueChange={(val) => field.onChange(val[0])}
                  className="[&>span:first-child]:bg-gray-400"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
