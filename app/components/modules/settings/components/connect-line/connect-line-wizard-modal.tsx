import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useGetConnectionLine,
  useUpdateConnectionLine,
} from "~/api/client/settings";
import { GlobalModal } from "~/components/shared/modal/modal";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { ConnectLineSchema, type ConnectLineValues } from "~/schemas/settings";
import { ConnectStepDot } from "../connect-step-dot";
import { ConnectLineStep1 } from "./connect-line-step-1";
import { ConnectLineStep2 } from "./connect-line-step-2";
import { ConnectLineStep4 } from "./connect-line-step-4";
import { ConnectLineStep5 } from "./connect-line-step-5";
import { useNavigate } from "react-router";

const stepOrder = [
  "ConnectLine1",
  "ConnectLine2",
  "ConnectLine4",
  "ConnectLine5",
] as const;
type StepKey = (typeof stepOrder)[number];

interface ConnectLineWizardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: (values: ConnectLineValues) => void;
  channelId?: string;
}

export const ConnectLineWizardModal: React.FC<ConnectLineWizardModalProps> = (
  props
) => {
  const { open, onOpenChange, onSaved, channelId } = props;

  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState<StepKey>("ConnectLine1");
  const id = React.useMemo(() => stepOrder.indexOf(activeStep), [activeStep]);
  const isFirst = id === 0;
  const isLast = id === stepOrder.length - 1;

  const { mutate: UpdateConnectionLine } = useUpdateConnectionLine(
    `${channelId ?? ""}`
  );

  const { data } = useGetConnectionLine(channelId ?? "");

  const form = useForm<ConnectLineValues>({
    resolver: zodResolver(ConnectLineSchema),
  });

  const goPrev = React.useCallback(() => {
    if (!isFirst) setActiveStep(stepOrder[id - 1] as StepKey);
  }, [isFirst, id]);

  const goNext = React.useCallback(async () => {
    if (stepOrder[id] === "ConnectLine2") {
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
        title: "ยืนยันการบันทึกการเชื่อมต่อ LINE OA",
        description: "คุณต้องการบันทึกค่าการเชื่อมต่อ LINE OA นี้ใช่หรือไม่",
        confirmText: "ยืนยัน",
        cancelText: "ยกเลิก",
        onConfirm: async () => {
          const toastId = toast.loading("กำลังบันทึกการเชื่อมต่อ...");
          try {
            UpdateConnectionLine(values);
            toast.success("บันทึกการเชื่อมต่อสำเร็จ", { id: toastId });
            onSaved?.(values);
            onOpenChange(false);
            navigate(`third-party/line/${data.refId}`);
          } catch (error) {
            toast.error("เกิดข้อผิดพลาดขณะบันทึกการเชื่อมต่อ", {
              id: toastId,
            });
          }
        },
      });
    })();
  }, [form, onOpenChange, onSaved]);

  const renderStep = () => {
    switch (activeStep) {
      case "ConnectLine1":
        return <ConnectLineStep1 />;
      case "ConnectLine2":
        return <ConnectLineStep2 form={form} />;
      case "ConnectLine4":
        return <ConnectLineStep4 />;
      case "ConnectLine5":
        return <ConnectLineStep5 />;
      default:
        return null;
    }
  };

  React.useEffect(() => {
    if (data) {
      form.reset({
        id: data?.id ?? "",
        name: data?.name ?? "",
        channelId: data?.channelId ?? "",
        channelSecret: data?.channelSecret ?? "",
        channelAccessToken: data?.channelAccessToken ?? "",
      });
    }
  }, [data, form]);

  React.useEffect(() => {
    if (open) setActiveStep("ConnectLine1");
  }, [open, channelId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* h-[820px] min-h-[820px] max-h-[820px] */}
      <DialogContent className="p-0 overflow-hidden w-[768px] min-w-[768px] max-w-[768px]  data-[state=open]:animate-none data-[state=closed]:animate-none">
        <div className="flex flex-col max-h-[85vh]">
          <div className="px-4 sm:px-6 py-3 "></div>
          <DialogHeader className="sr-only">
            <DialogTitle>การเชื่อมต่อ LINE OA</DialogTitle>
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
