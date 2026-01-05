import {
  ExamSchema,
  type ExamValues,
  type ExamProps,
} from "~/schemas/on-boarding/onboard";
import { Form } from "~/components/ui/form";
import { Card, CardContent } from "~/components/ui/card";
import { GlobalFormField } from "~/components/shared/global-formField";
import type { ReactNode } from "react";
import { GlobalModal } from "~/components/shared/modal/modal";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { QuestionBuilder } from "./question-builder";

export const Exam: React.FC<ExamProps> = ({ onDelete }) => {
  const formExam = useForm<ExamValues>({
    resolver: zodResolver(ExamSchema) as Resolver<ExamValues>,
    // mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
    },
  });

  // const { mutate } = useCreateContent();
  const onSubmit = (values: ExamValues) => {
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
  // const { isSubmitting } = formExam.formState;

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
    <Form {...formExam}>
      <form
        id="exam"
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
                    <div className=" grid grid-cols-1 md:grid-cols-1 gap-5">
                      <GlobalFormField
                        control={formExam.control}
                        name="name"
                        label="หัวข้อ *"
                        type="input"
                        placeholder="เช่น คำถามท้ายบท"
                      />
                      <GlobalFormField
                        control={formExam.control}
                        name="description"
                        label="อธิบาย *"
                        type="textArea"
                        placeholder="เช่น เพื่อวัดความรู้หลังจากได้เรียนรู้ข้อมูล"
                      />
                      <QuestionBuilder></QuestionBuilder>
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};
