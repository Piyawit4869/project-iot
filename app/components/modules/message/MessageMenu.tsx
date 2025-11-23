import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { MoreHorizontal, Check } from "lucide-react";
import React from "react";

export function MessageMenu({
  msg,
  onReply,
  onCopy,
  onPin,
}: {
  msg: any;
  onReply: () => void;
  onCopy: () => void;
  onPin?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleClick = (action: () => void) => {
    action();
    setOpen(false);
  };

  const handleCopy = () => {
    onCopy();
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="bottom"
        className="p-0 w-44 rounded-md border bg-white shadow-md"
      >
        <div className="flex flex-col py-1">
          {/* ตอบกลับ */}
          <button
            className="text-left px-3 py-2 text-sm hover:bg-gray-100 transition"
            onClick={() => handleClick(onReply)}
          >
            ตอบกลับ
          </button>

          {/* คัดลอกข้อความ */}
          <button
            className="text-left px-3 py-2 text-sm hover:bg-gray-100 transition flex items-center gap-2"
            onClick={() => handleCopy()}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600 animate-scale" />
                คัดลอกข้อความแล้ว
              </>
            ) : (
              "คัดลอกข้อความ"
            )}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
