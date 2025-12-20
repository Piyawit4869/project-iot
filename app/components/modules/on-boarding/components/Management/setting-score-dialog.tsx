import * as React from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

type Props = {
  openSetting: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type SwitchProps = {
  label: string;
  description?: string;
};

function SwitchItem({
  label,
  description,
  checked,
  onChange,
}: SwitchProps & {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-200
          ${checked ? "bg-black" : "bg-gray-300"}
        `}
      >
        <span
          className={`
            inline-block h-5 w-5 transform rounded-full bg-white
            transition-transform duration-200
            ${checked ? "translate-x-5" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
}

export default function SettingScoreDialog({ openSetting, setOpen }: Props) {
  const navigate = useNavigate();
  const [openSub, setOpenSub] = React.useState(false);
  const [value, setValue] = useState<"immediately" | "never">("immediately");
  const [showCorrect, setShowCorrect] = useState(true);
  const [showScore, setShowScore] = useState(true);

  return (
    <>
      <Dialog open={openSetting} onOpenChange={setOpen}>
        <DialogContent className="max-h-[96vh] overflow-auto rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">การตั้งค่า</DialogTitle>
            <DialogDescription>
              การตั้งค่าจะสามารถกำหนดคะแนนเต็ม และให้ระบบตรวจคำตอบได้
            </DialogDescription>
          </DialogHeader>
          <div>
            <DialogTitle className="pb-5">เผยแพร่คะแนน</DialogTitle>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="afterSubmit"
                  value="immediately"
                  checked={value === "immediately"}
                  onChange={() => setValue("immediately")}
                  className="accent-black"
                />
                ทันทีหลังจากส่งคำตอบ
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="afterSubmit"
                  value="never"
                  checked={value === "never"}
                  onChange={() => setValue("never")}
                  className="accent-black"
                />
                ไม่เฉลย
              </label>
            </div>
          </div>
          <div>
            <DialogTitle className="pb-5">การตั้งค่าสำหรับผู้ตอบ</DialogTitle>
            <div className="space-y-2">
              <div className="space-y-6">
                <SwitchItem
                  label="คำตอบที่ถูกต้อง"
                  description="ผู้ตอบจะเห็นคำตอบที่ถูกต้องหลังจากได้รับคะแนนแล้ว"
                  checked={showCorrect}
                  onChange={setShowCorrect}
                />

                <SwitchItem
                  label="ค่าคะแนน"
                  description="ผู้ตอบจะเห็นคะแนนสำหรับคำถามแต่ละข้อ"
                  checked={showScore}
                  onChange={setShowScore}
                />
              </div>
            </div>
          </div>
          <Button
            key="create-button"
            className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="hidden sm:inline">&nbsp;บันทึก</span>
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
