import {
  ContentSchema,
  type ContentValues,
  type TopicContentProps,
} from "~/schemas/on-boarding/onboard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Card, CardContent } from "~/components/ui/card";
import { GlobalFormField } from "~/components/shared/global-formField";
import ImageUpload from "~/components/shared/image-upload";
import type { ReactNode } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "react-day-picker";
import { Trash } from "lucide-react";
import { GlobalModal } from "~/components/shared/modal/modal";

export const Topic: React.FC<TopicContentProps> = ({ onDelete }) => {
  const formContent = useForm<ContentValues>({
    resolver: zodResolver(ContentSchema) as Resolver<ContentValues>,
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      department: "",
      description: "",
      thumbnailUrl: "",
    },
  });
  // const { mutate } = useCreateContent();
  const onSubmit = (values: ContentValues) => {
    GlobalModal.info({
      title: "สร้างบทเรียน",
      description: "คุณต้องการสร้างบทเรียนนี้ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      // onConfirm: () => {
      //   const toastId = toast.loading("กำลังสร้างบทเรียน...");
      //   mutate(values, {
      //     onSuccess: (data) => {
      //       toast.success("สร้างบทเรียนเรียบร้อยแล้ว!", { id: toastId });
      //       navigate(`/roles/${data?.id}`);
      //     },
      //     onError: () => {
      //       toast.error("เกิดข้อผิดพลาดขณะสร้างบทเรียน", { id: toastId });
      //     },
      //   });
      // },
    });
  };
  const { isSubmitting } = formContent.formState;

  type CardFieldBlockProps = {
    title: string;
    description?: string;
    control?: ReactNode;
    children: ReactNode;
  };

  function CardFieldBlock({
    title,
    description,
    control,
    children,
  }: CardFieldBlockProps) {
    return (
      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold">{title}</p>
            {description ? (
              <p className="text-muted-foreground text-sm">{description}</p>
            ) : null}
          </div>
          {control}
        </div>
        {children}
      </section>
    );
  }

  return (
    <Form {...formContent}>
      <form
        id="Test"
        onSubmit={formContent.handleSubmit(onSubmit, (errors) => {
          const count = Object.keys(errors).length;
          if (count > 0) {
            toast.error(`กรอกข้อมูลไม่ครบหรือไม่ถูกต้อง (${count} จุด)`);
          }
        })}
      >
        <div className="mt-2 flex flex-col md:flex-row gap-5">
          <div className="w-full">
            <Card className="p-4 h-full">
              <CardContent className="space-y-4">
                <div className=" w-full">
                  <div className="lg:col-span-1 flex flex-col gap-3">
                    <div className=" grid grid-cols-1 md:grid-cols-1 gap-5">
                      <GlobalFormField
                        control={formContent.control}
                        name="name"
                        label="หัวข้อ *"
                        type="input"
                        placeholder="เช่น เรียนรู้วิธีการทำงาน"
                      />
                      <GlobalFormField
                        control={formContent.control}
                        name="description"
                        label="อธิบาย *"
                        type="textArea"
                        placeholder="เช่น เรียนรู้เกี่ยวกับองค์กร, ขั้นตอนการทำงาน"
                      />
                      <CardFieldBlock
                        title="แนบรูปภาพปก"
                        description="อัปโหลดรูปสำหรับแสดงผลบนหน้าปกเนื้อหา (แนะนำ 4:3)"
                      >
                        <FormField
                          control={formContent.control}
                          name="thumbnailUrl"
                          render={({ field }) => (
                            <FormItem className="max-w-sm">
                              <FormLabel className="sr-only">
                                รูปภาพปก
                              </FormLabel>
                              <FormControl>
                                <ImageUpload
                                  value={field.value}
                                  onChange={field.onChange}
                                  width={180}
                                  height={140}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </CardFieldBlock>
                    </div>
                  </div>
                </div>
                <div className="relative p-4">
                  {onDelete && (
                    <div
                      className="inline-flex absolute top-2 right-2 text-red-700 cursor-pointer"
                      onClick={onDelete}
                    >
                      <Trash className="h-5 w-5" />
                      &nbsp;ลบ
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};
