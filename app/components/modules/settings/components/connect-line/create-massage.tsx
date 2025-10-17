"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { ReplySchema, type ReplyValues } from "~/schemas/settings";
import { toast } from "sonner";
import { GlobalModal } from "~/components/shared/modal/modal";

type Props = {
  mode: "create" | "edit";
  replyId?: string;
  onSaved?: () => void;
  onCancel?: () => void;
};

export default function ReplyMessageForm({
  mode,
  replyId,
  onSaved,
  onCancel,
}: Props) {
  const form = useForm<ReplyValues>({
    resolver: zodResolver(ReplySchema),
    defaultValues: {
      name: "",
      description: "",
      text: "",
    },
  });

  // โหลดข้อมูลเดิมเมื่อแก้ไข
  // React.useEffect(() => {
  //   if (mode === "edit" && replyId) {
  // TODO: ดึงข้อมูลด้วย replyId แล้ว form.reset(...)
  // ตัวอย่าง: form.reset({ title: data.title, message: data.message });
  //   }
  // }, [mode, replyId, form]);

  const name = form.watch("name")?.length ?? 0;
  const description = form.watch("description")?.length ?? 0;
  const text = form.watch("text")?.length ?? 0;

  const onSubmit = (values: ReplyValues) => {
    GlobalModal.info({
      title:
        mode === "create"
          ? "ยืนยันการสร้างข้อความตอบกลับ"
          : "ยืนยันการบันทึกข้อความตอบกลับ",
      description: "คุณต้องการบันทึกข้อความตอบกลับนี้ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังบันทึก...");
        try {
          // TODO: เรียก API create/update ตาม mode
          // await saveReply(values)

          toast.success(
            mode === "create"
              ? "สร้างข้อความตอบกลับสำเร็จ !"
              : "บันทึกข้อความตอบกลับสำเร็จ !",
            { id: toastId, duration: 2000, position: "bottom-right" }
          );
          onSaved?.();
        } catch {
          toast.error("เกิดข้อผิดพลาดขณะบันทึก", { id: toastId });
        }
      },
    });
  };

  return (
    <div className="w-full">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">
          {mode === "create" ? "สร้างข้อความตอบกลับ" : "แก้ไขข้อความตอบกลับ"}
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-end justify-between">
                    <FormLabel>ชื่อ</FormLabel>
                    <span className="text-xs text-muted-foreground">
                      {name}/30
                    </span>
                  </div>
                  <FormControl>
                    <Input placeholder="ใส่ชื่อ" {...field} />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    ชื่อจะไม่แสดงแก่ผู้ใช้ LINE
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-end justify-between">
                    <FormLabel>รายละเอียด</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="ใส่รายละเอียด" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-end justify-between">
                    <FormLabel>ข้อความ</FormLabel>
                    <span className="text-xs text-muted-foreground">
                      {text}/1000
                    </span>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="ใส่ข้อความ"
                      className="min-h-[140px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={onCancel}>
                ยกเลิก
              </Button>
              <Button type="submit">บันทึก</Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
