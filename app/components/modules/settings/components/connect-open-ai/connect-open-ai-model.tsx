import React from "react";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import {
  useGetConnectionAi,
  useUpdateConnectionAi,
} from "~/api/client/settings";
import { ConnectAiSchema, type ConnectAiValues } from "~/schemas/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { GlobalModal } from "~/components/shared/modal/modal";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ConnectStepDot } from "../connect-step-dot";
import { ConnectOpenAiStep1 } from "./connect-open-ai-step-1";
import { ConnectOpenAiStep2 } from "./connect-open-ai-step-2";
import { ConnectOpenAiStep3 } from "./connect-open-ai-step-3";
import { ConnectOpenAiStep4 } from "./connect-open-ai-step-4";
import { ConnectOpenAiStep5 } from "./connect-open-ai-step-5";

const stepOrder = [
  "ConnectAi1",
  "ConnectAi2",
  "ConnectAi3",
  "ConnectAi4",
  "ConnectAi5",
] as const;

type StepKey = (typeof stepOrder)[number];

interface ConnectAiWizardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelId?: string;
}

export const ConnectAiWizardModal: React.FC<ConnectAiWizardModalProps> = (
  props
) => {
  const { open, onOpenChange, channelId } = props;

  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState<StepKey>("ConnectAi1");

  const id = React.useMemo(() => stepOrder.indexOf(activeStep), [activeStep]);
  const isFirst = id === 0;
  const isLast = id === stepOrder.length - 1;

  const { mutate: UpdateConnectionAi } = useUpdateConnectionAi(
    `${channelId ?? ""}`
  );

  const { data } = useGetConnectionAi(channelId ?? "");

  const form = useForm<ConnectAiValues>({
    resolver: zodResolver(ConnectAiSchema) as Resolver<ConnectAiValues>,
  });

  React.useEffect(() => {
    if (data) {
      form.reset({
        id: data?.id ?? "",
        active: data?.active ?? true,
        name: data?.name ?? "",
        aiKey: data?.aiKey ?? "",
        openAssistantId: data?.openAssistantId ?? "",
        note: data?.note ?? "",
        remark: data?.remark ?? "",
        defaultIsAiReply: data?.defaultIsAiReply ?? true,
        branchId: data?.branchId ?? "",
      });
    }
  }, [data, form]);

  const goPrev = React.useCallback(() => {
    if (!isFirst) setActiveStep(stepOrder[id - 1] as StepKey);
  }, [isFirst, id]);

  React.useEffect(() => {
    if (open) setActiveStep("ConnectAi1");
  }, [open]);

  const goNext = React.useCallback(async () => {
    if (stepOrder[id] === "ConnectAi3") {
      const ok = await form.trigger();

      if (!ok) {
        toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }
    }

    if (isLast) {
      handleFinish();
      return;
    }

    setActiveStep(stepOrder[id + 1] as StepKey);
  }, [form, id, isLast]);

  const handleFinish = React.useCallback(() => {
    form.handleSubmit((values) => {
      GlobalModal.info({
        title: "ยืนยันการบันทึกการเชื่อมต่อ AI Assistant",
        description:
          "คุณต้องการบันทึกค่าการเชื่อมต่อ AI Assistant นี้ใช่หรือไม่",
        confirmText: "ยืนยัน",
        cancelText: "ยกเลิก",
        onConfirm: async () => {
          const toastId = toast.loading("กำลังบันทึกการเชื่อมต่อ...");
          try {
            UpdateConnectionAi(values);
            toast.success("บันทึกการเชื่อมต่อสำเร็จ", { id: toastId });
            onOpenChange(false);
            navigate(`third-party/ai/${data.refId}`);
          } catch (error) {
            toast.error("เกิดข้อผิดพลาดขณะบันทึกการเชื่อมต่อ", { id: toastId });
          }
        },
      });
    })();
  }, [form, onOpenChange, navigate]);

  const renderStep = () => {
    switch (activeStep) {
      case "ConnectAi1":
        return <ConnectOpenAiStep1 />;
      case "ConnectAi2":
        return <ConnectOpenAiStep2 />;
      case "ConnectAi3":
        return <ConnectOpenAiStep3 form={form} />;
      case "ConnectAi4":
        return <ConnectOpenAiStep4 />;
      case "ConnectAi5":
        return <ConnectOpenAiStep5 form={form} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden w-[768px] min-w-[768px] max-w-[768px] data-[state=open]:animate-none data-[state=closed]:animate-none">
        <div className="flex flex-col max-h-[85vh]">
          <div className="px-4 sm:px-6 py-3 "></div>
          <DialogHeader className="sr-only">
            <DialogTitle>การเชื่อมต่อ AI Assistant</DialogTitle>
          </DialogHeader>
          <FormProvider {...form}>
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
              {renderStep()}
            </div>
          </FormProvider>
          <DialogFooter className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={goPrev}
                disabled={isFirst}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                ย้อนกลับ
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <ConnectStepDot stepOrder={stepOrder} id={id} />
              <Button
                onClick={isLast ? handleFinish : goNext}
                className="gap-2"
              >
                {isLast ? "เสร็จสิ้น" : "ถัดไป"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
