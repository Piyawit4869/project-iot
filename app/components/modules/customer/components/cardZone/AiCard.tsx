import { Settings } from "lucide-react";

import React from "react";

import { toast } from "sonner";
import { useAiReplySettings } from "~/api/client/customer/useCustomer";
import GlobalButton from "~/components/shared/global-button";
import { GlobalModal } from "~/components/shared/modal/modal";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { cn } from "~/lib/utils";
export const AICard = ({
  customers,
  refetchCustomer,
  className,
  isEdit,
  loading,
}: {
  refetchCustomer: () => void;
  customers?: any;
  className: string;
  isEdit: boolean;
  loading: boolean;
}) => {
  const customerData = customers;
  const { mutate: update } = useAiReplySettings(customerData?.id);
  const customerAI = customers?.aiReplySettings?.[0];

  const [openAiSetting, setOpenAiSetting] = React.useState(false);
  const [aiEnabled, setAiEnabled] = React.useState<boolean>(
    customers?.isAiReply
  );
  const [aiEnabledWithCondition, setAiEnabledWithCondition] =
    React.useState(false);
  const [aiStartTime, setAiStartTime] = React.useState(
    customerAI?.startTime || "09:00"
  );
  const [aiEndTime, setAiEndTime] = React.useState(
    customerAI?.endTime || "18:00"
  );

  const [hours, setHours] = React.useState("");
  const [minutes, setMinutes] = React.useState("");

  const h = Math.min(24, Math.max(0, Number(hours) || 0));
  const m = Math.min(59, Math.max(0, Number(minutes) || 0));
  const totalMinutes = h * 60 + m;

  const handleChangeAIConfig = () => {
    const data = {
      isAiReply: true,
      settings: [
        {
          enabled: aiEnabled ? false : true,
          allDay: aiEnabled ? true : false,
          startTime: aiEnabled ? "09:00" : aiStartTime || "",
          endTime: aiEnabled ? "18:00" : aiEndTime || "",
          aiReplyResponseDuration: aiEnabledWithCondition
            ? totalMinutes || ""
            : "",
        },
      ],
    };

    GlobalModal.info({
      title: "ปรับการตั้งค่า AI",
      description: "คุณต้องการปรับการตั้งค่า AI ใช้หรือไม่ ?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังปรับข้อมูล AI...");

        toast.success("แก้ไขการตั้งค่าเรียบร้อยแล้ว!", {
          id: toastId,
        });

        update(data, {
          onSuccess: () => {
            toast.success("แก้ไขการตั้งค่าเรียบร้อยแล้ว!", { id: toastId });
            setOpenAiSetting(false);
            refetchCustomer();
          },
          onError: () => {
            toast.error(
              "ไม่สามารถปรับการตั้งค่าได้ กรุณาลองใหม่อีกครั้งภายหลัง",
              { id: toastId }
            );
          },
        });
      },
    });
  };

  React.useEffect(() => {
    if (customerAI) {
      setAiEnabled(customerAI?.allDay);

      const enabledCondition = customerAI?.aiReplyResponseDuration;
      setAiEnabledWithCondition(enabledCondition ? true : false);

      if (enabledCondition) {
        const h = Math.floor(enabledCondition / 60);
        const m = enabledCondition % 60;

        setHours(h.toString());
        setMinutes(m.toString());
      }
    }
  }, [customerAI]);

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-base font-bold flex justify-between">
            การใช้ AI
            {isEdit ? (
              <Button
                type="button"
                size={"sm"}
                className="px-3 py-1  bg-gray-100 hover:bg-gray-200 text-sm text-black"
                onClick={() => {
                  setOpenAiSetting(true);
                }}
              >
                <Settings />
              </Button>
            ) : (
              <div className="space-y-1.5 p-3" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <>
              <div className="flex flex-col gap-4">
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-2 ">
              <div className="flex items-center justify-between ">
                <Label htmlFor="ai-enabled" className="text-sm">
                  เปิดใช้งานตลอดเวลา
                </Label>
                <Switch id="for-show" disabled checked={customerAI?.allDay} />
              </div>

              <div className="flex items-center justify-between mt-4 mb-3">
                <Label htmlFor="ai-enabled-condition" className="text-sm">
                  ใช้งาน AI ตามเงื่อนไข
                </Label>
                <Switch disabled checked={customerAI?.enabled} />
              </div>

              <div className="mt-4 space-y-4 transition-all ">
                <div className="flex flex-row justify-between ">
                  <Label className="text-sm">ช่วงเวลาที่ให้ AI ตอบ</Label>
                  <div className="text-sm flex gap-3">
                    <span> {customerAI?.startTime || "00.00"} น.</span>
                    <span>ถึง</span>
                    <span>{customerAI?.endTime || "00.00"} น.</span>
                  </div>
                </div>

                <div className="flex flex-row justify-between gap-2">
                  <Label className="text-sm mt-2">
                    หากไม่มีการตอบกลับจากเซลภายใน (นาที)
                  </Label>
                  <div className="flex items-center gap-2 text-sm">
                    {customerAI?.aiReplyResponseDuration || 0} นาที
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={openAiSetting} onOpenChange={setOpenAiSetting}>
        <DialogContent className="sm:max-w-lg w-full max-h-[70vh] overflow-auto p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle>การตั้งค่า AI</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col space-y-2 mt-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between mt-4 mb-3">
              <Label htmlFor="ai-enabled" className="text-sm">
                เปิดใช้งานตลอดเวลา
              </Label>
              <Switch
                id="ai-enabled"
                checked={aiEnabled}
                onCheckedChange={(state) => {
                  setAiEnabled(state);
                  if (state) {
                    setAiEnabledWithCondition(false);
                  }
                }}
              />
            </div>

            <div className="flex items-center justify-between mt-4 mb-3">
              <Label htmlFor="ai-enabled-condition" className="text-sm">
                ใช้งาน AI ตามเงื่อนไข
              </Label>
              <Switch
                id="ai-enabled-condition"
                checked={aiEnabledWithCondition}
                onCheckedChange={(state) => {
                  setAiEnabledWithCondition(state);
                  if (state) {
                    setAiEnabled(false);
                  }
                }}
              />
            </div>

            <div
              className={cn(
                "mt-4 space-y-4 transition-all",
                !aiEnabledWithCondition && "opacity-50 pointer-events-none"
              )}
            >
              <div className="flex flex-col gap-2">
                <Label className="text-sm">ช่วงเวลาที่ให้ AI ตอบ</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={aiStartTime || ""}
                    onChange={(e) => setAiStartTime(e.target.value)}
                    className="w-[120px]"
                    disabled={!aiEnabledWithCondition}
                  />
                  <span className="text-sm">ถึง</span>
                  <Input
                    type="time"
                    value={aiEndTime || ""}
                    onChange={(e) => setAiEndTime(e.target.value)}
                    className="w-[120px]"
                    disabled={!aiEnabledWithCondition}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm">
                  หากไม่มีการตอบกลับจากเซลภายใน (ชั่วโมง:นาที)
                </Label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="HH"
                    min={0}
                    max={24}
                    value={hours}
                    onChange={(e) => {
                      const v = e.target.value.slice(0, 2);
                      if (Number(v) <= 24) setHours(v);
                    }}
                    className="border p-1 rounded w-[70px] text-center"
                  />
                  :
                  <input
                    type="number"
                    placeholder="MM"
                    min={0}
                    max={59}
                    value={minutes}
                    onChange={(e) => {
                      const v = e.target.value.slice(0, 2);
                      if (Number(v) <= 59) setMinutes(v);
                    }}
                    className="border p-1 rounded w-[70px] text-center"
                  />
                </div>
              </div>
            </div>

            <GlobalButton
              label="บันทึกการตั้งค่า AI"
              className="mt-8 mb-8"
              onClick={handleChangeAIConfig}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
