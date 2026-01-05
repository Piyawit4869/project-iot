import * as React from "react";

import SectionWithImage from "~/components/modules/auth/SectionWithImage";
import LogoImage from "/assets/images/rome.svg";
import PolicyImage1 from "/assets/images/pana.png";
import PolicyImage2 from "/assets/images/Illustration.png";
import PolicyImage3 from "/assets/images/Art.png";
import PolicyImage4 from "/assets/images/rafiki.png";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { ConnectAiSchema, type ConnectAiValues } from "~/schemas/settings";
import { ChatbotSideBarSettings } from "./chat-bot-side-bar-settings";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import {
  useCreateConfigAi,
  useUpdateConnectionAi,
} from "~/api/client/settings";
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";
import { useRouteLoaderData } from "react-router";

type Props = {
  openWeb: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFinish?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalCreateConfig({
  openWeb,
  setOpen,
  setIsFinish,
}: Props) {
  const { me } = useRouteLoaderData("root") as any;
  const branchId = (me?.branchId ?? "") as string;
  const { mutate: createConfigAi } = useCreateConfigAi();

  const form = useForm<ConnectAiValues>({
    resolver: zodResolver(ConnectAiSchema) as Resolver<ConnectAiValues>,
    defaultValues: {},
  });

  const onSubmit = (formData: ConnectAiValues) => {
    const payload = {
      ...formData,
      branchId: branchId,
    };

    GlobalModal.info({
      title: "ยืนยันการบันทึกการตั้งค่า AI Assistant",
      description: "คุณต้องการบันทึกค่าการเชื่อมต่อ AI Assistant ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังบันทึกการเชื่อมต่อ...");
        createConfigAi(payload, {
          onSuccess: () => {
            toast.success("บันทึกการเชื่อมต่อสำเร็จ !", {
              id: toastId,
              duration: 2500,
              position: "bottom-right",
            });
            setOpen(false);
            form.reset();
            setIsFinish?.(true);
          },
          onError: (error) => {
            console.error("Update connection ai error:", error);
            toast.error("เกิดข้อผิดพลาดขณะบันทึกการเชื่อมต่อ", {
              id: toastId,
            });
          },
        });
      },
    });
  };
  return (
    <>
      <Dialog open={openWeb} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl w-full max-h-[85vh] overflow-auto rounded-lg p-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center">
              เพิ่มการ Config AI
            </DialogTitle>
          </DialogHeader>

          <FormProvider {...form}>
            <form id="create-config-ai" className="h-full">
              <ChatbotSideBarSettings form={form} id={""} />
            </form>
          </FormProvider>

          <DialogFooter className="mt-6">
            <Button
              size={"sm"}
              className="w-[140px] py-5 bg-white border border-[#E4E4E7] text-black hover:bg-white"
              type="button"
              onClick={() => setOpen(false)}
            >
              <X className="mr-1" />
              ยกเลิก
            </Button>
            <Button
              size="sm"
              className="w-[140px] py-5"
              type="button"
              onClick={form.handleSubmit(onSubmit)}
            >
              ยืนยัน
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
