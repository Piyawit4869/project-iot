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
import { useLineCreateReplyMessage } from "~/api/client/settings";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";

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
  const { mutate } = useLineCreateReplyMessage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const form = useForm<ReplyValues>({
    resolver: zodResolver(ReplySchema),
    defaultValues: {
      name: "",
      description: "",
      content: "",
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
  const text = form.watch("content")?.length ?? 0;

  const handleNaviagateBack = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("view");

    navigate(`/setting-organization/third-party/line?${params.toString()}`);
  };

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
          toast.success(
            mode === "create"
              ? "สร้างข้อความตอบกลับสำเร็จ !"
              : "บันทึกข้อความตอบกลับสำเร็จ !",
            { id: toastId, duration: 2000, position: "bottom-right" }
          );

          mutate(
            {
              active: true,
              name: values.name,
              description: values.description,
              isFavorite: false,
              type: "reply",
              content: {
                messages: [
                  {
                    type: "text",
                    text: values.content,
                  },
                ],
              } as any,
            },
            {
              onSuccess: () => {
                toast.success("สร้างข้อความตอบกลับเรียบร้อยแล้ว", {
                  id: toastId,
                });

                onSaved?.();
              },

              onError: () => {
                toast.error(
                  "สร้างข้อความตอบกลับไม่สำเร็จ กรุณาลองใหม่อีกครั้งภายหลัง",
                  {
                    id: toastId,
                  }
                );
              },
            }
          );
        } catch {
          toast.error("เกิดข้อผิดพลาดขณะบันทึก", { id: toastId });
        }
      },
    });
  };

  return (
    <div className="w-full">
      <Card className="p-6">
        <div className="flex flex-row gap-2 items-center">
          <ChevronLeft
            className="cursor-pointer"
            onClick={handleNaviagateBack}
          />
          <h2 className="text-lg font-semibold">
            {mode === "create" ? "สร้างข้อความตอบกลับ" : "แก้ไขข้อความตอบกลับ"}
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="create-form"
            className="space-y-6"
          >
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
              name="content"
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
              <Button type="submit" form="create-form">
                บันทึก
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
