import {
  type VideoValues,
  type VideoProps,
  VideoSchema,
} from "~/schemas/on-boarding/onboard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Card, CardContent } from "~/components/ui/card";
import { GlobalFormField } from "~/components/shared/global-formField";
import type { ReactNode } from "react";
import { GlobalModal } from "~/components/shared/modal/modal";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { QuestionBuilder } from "./question-builder";

export const Video: React.FC<VideoProps> = ({ onDelete }) => {
  const formVideo = useForm<VideoValues>({
    resolver: zodResolver(VideoSchema) as Resolver<VideoValues>,
    // mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      videoUrl: "",
    },
  });

  type CardFieldBlockProps = {
    title: string;
    description?: string;
    control?: ReactNode;
    children: ReactNode;
  };

  function CardFieldBlock({ title, description }: CardFieldBlockProps) {
    return (
      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold">{title}</p>
            {description ? (
              <p className="text-muted-foreground text-sm">{description}</p>
            ) : null}
          </div>
        </div>
      </section>
    );
  }
  return (
    <Form {...formVideo}>
      <form
        id="Video"
        // onSubmit={formExam.handleSubmit(onSubmit, (errors) => {
        //   const count = Object.keys(errors).length;
        //   if (count > 0) {
        //     toast.error(`กรอกข้อมูลไม่ครบหรือไม่ถูกต้อง (${count} จุด)`);
        //   }
        // })}
      >
        <div className="mt-2 flex flex-col md:flex-row gap-5">
          <div className="w-full">
            <Card className="p-4 h-full">
              <CardContent className="space-y-4">
                <div className=" w-full">
                  <div className="lg:col-span-1 flex flex-col gap-3">
                    <div className=" grid grid-cols-2 md:grid-cols-2 gap-5">
                      <GlobalFormField
                        control={formVideo.control}
                        name="name"
                        label="ชื่อวิดีโอ"
                        type="input"
                        placeholder="เช่น สอนเรียนรู้วิธีการทำงาน"
                      />
                      <GlobalFormField
                        control={formVideo.control}
                        name="description"
                        label="คำอธิบาย"
                        type="input"
                        placeholder="เช่น ดูวิดีโอเพื่อให้เห็นภาพที่ชัดขึ้น และจดจำได้ง่ายขึ้น"
                      />
                      <FormField
                        control={formVideo.control}
                        name="videoUrl"
                        render={({ field }) => (
                          <FormItem className="max-w-sm">
                            <FormLabel className="sr-only">วิดีโอปก</FormLabel>
                            <FormControl>
                              <div className="flex flex-col gap-2">
                                {field.value && (
                                  <video
                                    src={field.value}
                                    className="w-[500px] h-[240px] rounded-md object-cover border"
                                    controls
                                  />
                                )}
                                <input
                                  type="file"
                                  accept="video/*"
                                  className="block w-full text-sm
                       file:mr-4 file:rounded-md file:border-0
                       file:bg-primary file:px-4 file:py-2
                       file:text-white hover:file:bg-primary/90"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      field.onChange(URL.createObjectURL(file));
                                    }
                                  }}
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};
