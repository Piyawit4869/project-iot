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
    <div>
      <h2 className="text-lg font-semibold">การตั้งค่าผู้ช่วย</h2>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100vh-500px)]"
      >
        <ResizablePanel minSize={28}>
          <div className="h-full border-r space-y-4 bg-muted/40 overflow-y-auto pr-6 pt-4">
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
                      className=" bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="openAssistantId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assistants ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Assistants ID"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* <div className="space-y-2 mt-6 ">
              <FormField
                control={form.control}
                name="aiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secret Key</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="sk-proj-s8HCHzANAscl9PbRwozAYuL"
                        className="bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}

            {/* System Instructions */}

            {/* Model Select */}
            {/* <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>โมเดล</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full shadow-none bg-white">
                        <SelectValue placeholder="เลือกโมเดล" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {aiModel.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            /> */}

            {/* Feature Toggles */}
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

            {/* Temperature Slider */}
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

            {/* Top P Slider */}
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
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={35}>
          <div className="p-4 h-full">
            <FormField
              control={form.control}
              name="systemInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>คำแนะนำระบบ</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Style, tone, context, etc."
                      className=" flex w-full min-h-[500px] bg-white dark:bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
