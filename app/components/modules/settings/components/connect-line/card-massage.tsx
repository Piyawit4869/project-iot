import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";

interface MessageCardFormValues {
  name: string;
  category: string;
}

export default function MessageCardForm() {
  const form = useForm<MessageCardFormValues>({
    defaultValues: { name: "", category: "" },
  });

  const onSubmit = (values: MessageCardFormValues) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex w-full flex-col  space-y-6">
          <h1 className="text-2xl font-bold">การ์ดเมสเสจ</h1>
          <p className="text-muted-foreground text-sm mt-1">
            ข้อความในรูปแบบการ์ดที่รวมเนื้อหาต่างๆ เอาไว้ในที่เดียว
            โดยระบบจะแสดงผลแบบภาพสไลด์ที่ผู้คนสามารถเปิดการ์ดไปด้านข้างเพื่อดูเนื้อหาการ์ดอื่นได้
          </p>
          <Card>
            <CardHeader>
              <CardTitle>รายละเอียดการ์ด</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>
                  ID{" "}
                  <p className="text-sm text-muted-foreground">
                    ระบบจะออก ID หลังสร้าง
                  </p>
                </Label>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อไอเทม</FormLabel>
                    <FormControl>
                      <Input placeholder="ใส่ชื่อไอเทม" {...field} />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      ชื่อจะถูกแสดงในรายการเมสเสจแบบสรุปหรือเมสเสจเต็ม
                    </p>
                  </FormItem>
                )}
              />
            </CardContent>

            <CardHeader>
              <CardTitle>ตั้งค่าการ์ด</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ประเภทการ์ด</FormLabel>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => field.onChange("เลือกประเภท")}
                      >
                        เลือก
                      </Button>
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <div className="flex justify-end p-5">
              <Button type="submit">บันทึก</Button>
            </div>
          </Card>
        </div>
      </form>
    </Form>
  );
}
