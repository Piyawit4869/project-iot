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

type Props = {
  mode: "create" | "edit";
  onSaved?: () => void;
};

export default function EditQuickReplyItemsForm({ mode, onSaved }: Props) {
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (values: QuickReplyValues) => {
    GlobalModal.info({
      title:
        mode === "create"
          ? "ยืนยันการสร้าง Quick Reply"
          : "ยืนยันการแก้ไข Quick Reply",
      description: "คุณต้องการบันทึกข้อมูลนี้ใช่หรือไม่",
      onConfirm: () => {
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

        console.log("SUBMIT PAYLOAD", payload);

        toast.success("บันทึก Quick Reply สำเร็จ");
        onSaved?.();
      },
    });
  };

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-lg font-semibold">
        {mode === "create" ? "สร้าง Quick Reply" : "แก้ไข Quick Reply"}
      </h2>

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
                        <Input
                          placeholder="https://example.com/sushi.png"
                          {...field}
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
  );
}
