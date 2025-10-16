import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useLocation, useNavigate } from "react-router";

export default function ReplyMessageForm() {
  const form = useForm<ReplyValues>({
    resolver: zodResolver(ReplySchema),
    defaultValues: { title: "", message: "" },
  });

  const titleLen = form.watch("title")?.length ?? 0;
  const msgLen = form.watch("message")?.length ?? 0;

  const onSubmit = (values: ReplyValues) => {
    GlobalModal.info({
      title: "ยืนยันการบันทึกการตั้งค่า Line Official",
      description: "คุณต้องการบันทึกค่าการเชื่อมต่อ Line Official ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังบันทึกการเชื่อมต่อ...");
        // try {
        //   UpdateConnectionLine(values, {
        //     onSuccess: () => {
        //       toast.success("บันทึกการเชื่อมต่อสำเร็จ !", {
        //         id: toastId,
        //         duration: 2500,
        //         position: "bottom-right",
        //       });
        //       backToList();
        //     },
        //     onError: (error) => {
        //       console.error("Update connection error:", error);
        //       toast.error("เกิดข้อผิดพลาดขณะบันทึกการเชื่อมต่อ", {
        //         id: toastId,
        //       });
        //     },
        //   });
        // } catch (error) {
        //   toast.error("เกิดข้อผิดพลาดที่ไม่คาดคิด", { id: toastId });
        // }

        // เดโม: แจ้งสำเร็จแล้วกลับหน้ารายการ
        toast.success("บันทึกข้อความตอบกลับสำเร็จ !", {
          id: toastId,
          duration: 2000,
          position: "bottom-right",
        });
      },
    });
  };

  return (
    <div className="w-full">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">สร้างข้อความตอบกลับ</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-end justify-between">
                    <FormLabel>ชื่อ</FormLabel>
                    <span className="text-xs text-muted-foreground">
                      {titleLen}/30
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
              name="message"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-end justify-between">
                    <FormLabel>ข้อความ</FormLabel>
                    <span className="text-xs text-muted-foreground">
                      {msgLen}/1000
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

            {/* <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm">
                อิโมจิ
              </Button>
              <Button type="button" variant="outline" size="sm">
                ชื่อผู้ใช้
              </Button>
              <Button type="button" variant="outline" size="sm">
                ชื่อบัญชี
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              ชื่อจากตัวแทรกจะยึดข้อมูลผู้ใช้งานในบัญชีที่คุณอนุญาตให้ติดต่อ
              ไม่เก็บไว้ถาวร
            </p> */}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => {}}>
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
