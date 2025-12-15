"use client";

import { TabControl } from "~/components/shared/tab-control";
import {
  Save,
  MessageCirclePlus,
  Heading,
  TextAlignStart,
  ImagePlus,
  SquarePlay,
  BotMessageSquare,
} from "lucide-react";
import { usePaginate } from "~/api/client/user";
import { useOnboardColumns } from "../on-boarding/components/columns";
import GlobalButton from "~/components/shared/global-button";
import {
  ContentSchema,
  type ContentValues,
} from "~/schemas/on-boarding/onboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { GlobalModal } from "~/components/shared/modal/modal";
import type { ReactNode } from "react";
import { Topic } from "./components/topic-content";
import { Textarea } from "~/components/ui/textarea";
import Content from "./components/content";
import { Test } from "./components/Test";

export default function OnboardIndex() {
  const paginate = usePaginate;
  const columns = useOnboardColumns();

  const formContent = useForm<ContentValues>({
    resolver: zodResolver(ContentSchema) as Resolver<ContentValues>,
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      department: "",
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

  return (
    <div className="flex flex-col space-y-3 p-8">
      <TabControl
        title="สร้างเนื้อหา"
        backpath="/on-boarding/create"
        buttons={[
          <GlobalButton
            label={
              <>
                <Save /> บันทึก
              </>
            }
            key="create-button"
            type="submit"
            loading={isSubmitting}
            form="content"
          />,
        ]}
      />
      <Topic></Topic>
      <Content></Content>
      <Test></Test>
      <div className="inline-flex items-center gap-3 w-fit px-2 py-1.5 border-2 border-dashed border-gray-400 rounded-lg">
        <MessageCirclePlus className="w-5 h-5" />
        <Heading className="w-5 h-5" />
        <TextAlignStart className="w-5 h-5" />
        <ImagePlus className="w-5 h-5" />
        <SquarePlay className="w-5 h-5" />
        <BotMessageSquare className="w-5 h-5" />
      </div>
    </div>
  );
}
