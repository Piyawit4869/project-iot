import type React from "react";
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

interface ChatbotSideBarSettingsProps {
  form: UseFormReturn<ConnectAiValues>;
  id: string;
}

export const ChatbotSideBarSettings: React.FC<ChatbotSideBarSettingsProps> = (
  props
) => {
  const { form, id } = props;
  return (
    <div className="w-full">
      <div className="space-y-4 pr-6 pt-4">
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>การใช้งาน เปิด/ปิด</FormLabel>
              <FormControl>
                <Switch
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
              <FormLabel>คำแนะนำระบบ</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Style, tone, context, etc."
                  className="min-h-[200px] bg-white dark:bg-background"
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
