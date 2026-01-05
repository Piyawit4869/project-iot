import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
import { QuickReplySchema, type QuickReplyValues } from "~/schemas/settings";
import { toast } from "sonner";
import { GlobalModal } from "~/components/shared/modal/modal";
import {
  useCreateQuickReplyMessage,
  useLineQuickReplyMessage,
  useLineUpdateQuickReplyMessage,
} from "~/api/client/settings";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import ImageUpload from "~/components/shared/image-upload";

type Props = {
  mode: "create" | "edit";
  replyId?: string;
  onSaved?: (id?: string) => void;
  onCancel?: () => void;
};

export default function EditQuickReplayForm({ mode, replyId, onSaved }: Props) {
  const { mutate } = useCreateQuickReplyMessage();

  const { mutate: update } = useLineUpdateQuickReplyMessage(replyId ?? "");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data } = useLineQuickReplyMessage(replyId ?? "");
  const form = useForm<QuickReplyValues>({
    resolver: zodResolver(QuickReplySchema),
    defaultValues: {
      name: "",
      description: "",
      items: [
        {
          imageUrl: "",
          label: "",
          text: "",
        },
      ],
    },
  });

  React.useEffect(() => {
    if (mode === "edit" && replyId && data) {
      form.reset({
        name: data?.name,
        description: data?.description,
        // content: data?.content?.messages?.[0]?.text,
        items:
          data?.content?.items && data?.content?.items?.length
            ? data?.content?.items.map((i: any) => {
                return {
                  imageUrl: i.imageUrl,
                  label: i.action.label,
                  text: i.action.text,
                };
              })
            : [],
      });
    }
  }, [mode, replyId, form, data]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const handleNaviagateBack = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("view");

    navigate(`/setting-organization/third-party/line?${params.toString()}`);
  };

  const onSubmit = (values: QuickReplyValues) => {
    GlobalModal.info({
      title:
        mode === "create"
          ? "ยืนยันการสร้างข้อความอัตโนมัติ"
          : "ยืนยันการบันทึกข้อความอัตโนมัติ",
      description: "คุณต้องการบันทึกข้อความอัตโนมัตินี้ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังบันทึก...");
        try {
          toast.success(
            mode === "create"
              ? "สร้างข้อความอัตโนมัติสำเร็จ !"
              : "บันทึกข้อความอัตโนมัติสำเร็จ !",
            { id: toastId, duration: 2000, position: "bottom-right" }
          );

          const payload = {
            name: values.name,
            description: values.description,
            active: true,
            content: {
              items: values.items.map((i) => ({
                type: "action",
                imageUrl: i.imageUrl,
                action: {
                  type: "message",
                  label: i.label,
                  text: i.text,
                },
              })),
            },
          };

          if (mode === "create") {
            mutate(payload, {
              onSuccess: (data: any) => {
                toast.success("สร้างข้อความอัตโนมัติเรียบร้อยแล้ว", {
                  id: toastId,
                });

                onSaved?.(data?.id);
              },

              onError: () => {
                toast.error(
                  "สร้างข้อความอัตโนมัติไม่สำเร็จ กรุณาลองใหม่อีกครั้งภายหลัง",
                  {
                    id: toastId,
                  }
                );
              },
            });
          } else {
            update(payload, {
              onSuccess: () => {
                toast.success("แก้ไขข้อความอัตโนมัติเรียบร้อยแล้ว", {
                  id: toastId,
                });

                onSaved?.();
              },

              onError: () => {
                toast.error(
                  "แก้่ไขข้อความอัตโนมัติไม่สำเร็จ กรุณาลองใหม่อีกครั้งภายหลัง",
                  {
                    id: toastId,
                  }
                );
              },
            });
          }
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
            {mode === "create"
              ? "สร้างข้อความอัตโนมัติ"
              : "แก้ไขข้อความอัตโนมัติ"}
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อ</FormLabel>
                  <FormControl>
                    <Input placeholder="Food Category Selection" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รายละเอียด</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Quick reply สำหรับเลือกประเภทอาหาร"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Quick Reply Items</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ imageUrl: "", label: "", text: "" })}
                >
                  เพิ่มปุ่ม
                </Button>
              </div>

              {fields.map((f, index) => (
                <div key={f.id} className="border rounded-lg p-4 space-y-3">
                  <FormField
                    control={form.control}
                    name={`items.${index}.imageUrl`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value || ""}
                            onChange={field.onChange}
                            className="w-full h-full object-cover rounded-md object-center"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.label`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ป้ายปุ่ม (Label)</FormLabel>
                        <FormControl>
                          <Input placeholder="Sushi" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ข้อความที่ส่ง</FormLabel>
                        <FormControl>
                          <Input placeholder="I want sushi" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => remove(index)}
                    >
                      ลบปุ่มนี้
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <Button type="submit">บันทึก</Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
