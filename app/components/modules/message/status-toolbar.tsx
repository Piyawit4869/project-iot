import * as React from "react";

import { CheckCircle, MessagesSquare, Search, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import { startTransition } from "react";
import {
  useMarkAsDone,
  useMarkAsProcess,
} from "~/api/client/message/useMessage";

type Status = "todo" | "done";

type Props = {
  chatRoomDetail: any;
  value: Status;
  onChange?: (next: Status) => void;
  className?: string;
};

export default function StatusToolbar({ chatRoomDetail, className }: Props) {
  const { mutate: markAsProcess } = useMarkAsProcess(chatRoomDetail?.id);
  const { mutate: markAsDone } = useMarkAsDone(chatRoomDetail?.id);

  const [isDone, setIsDone] = React.useState(chatRoomDetail?.done);
  const [isProcess, setIsProcess] = React.useState(chatRoomDetail?.isProcess);

  const setTodo = async () => {
    // onChange?.("todo");
    markAsProcess(true);
    markAsDone(false);
    startTransition(() => {
      setIsProcess(true);
      setIsDone(false);
    });
  };
  const setDone = () => {
    // onChange?.("done");
    markAsProcess(false);
    markAsDone(true);

    startTransition(() => {
      setIsDone(true);
      setIsProcess(false);
    });
  };

  const setClear = () => {
    // onChange?.("clear");
    markAsProcess(false);
    markAsDone(false);

    startTransition(() => {
      setIsDone(false);
      setIsProcess(false);
    });
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div
        className={cn(
          "flex items-center gap-3 bg-background/60 p-2",
          className
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-9 px-3 rounded-md border-muted-foreground/30",
                isProcess && "border-primary text-primary"
              )}
              onClick={setTodo}
            >
              <MessagesSquare className="mr-2 h-[18px] w-[18px]" />
              ต้องดำเนินการ
            </Button>
          </TooltipTrigger>
          <TooltipContent>กำหนดเป็น "ต้องดำเนินการ"</TooltipContent>
        </Tooltip>

        {/* <Popover open={open} onOpenChange={setOpen}> */}

        <Tooltip>
          <TooltipTrigger asChild>
            {/* <PopoverTrigger asChild> */}
            <Button
              variant="outline"
              className={cn(
                "h-9 px-3 rounded-md border-muted-foreground/30",
                isDone && "border-primary text-primary"
              )}
              onClick={setDone}
            >
              <CheckCircle className="mr-2 h-[18px] w-[18px]" />
              ดำเนินการแล้ว
            </Button>
            {/* </PopoverTrigger> */}
          </TooltipTrigger>
          <TooltipContent>กำหนดเป็น "ดำเนินการแล้ว"</TooltipContent>
        </Tooltip>
        {(isProcess || isDone) && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={cn("h-9 px-3 rounded-md border-muted-foreground/30")}
                onClick={setClear}
              >
                <X className="mr-2 h-[18px] w-[18px]" />
                เคลียร์
              </Button>
            </TooltipTrigger>
            <TooltipContent>ล้างค่าแท็ก</TooltipContent>
          </Tooltip>
        )}
        {/* <PopoverContent
            align="start"
            sideOffset={6}
            className="w-[260px] text-sm"
          >
            <div className="space-y-2">
              <div className="font-medium">กำหนดสถานะเป็น “ดำเนินการแล้ว”</div>
              <p className="text-muted-foreground">
                บันทึกสถานะเรียบร้อย คุณต้องการแจ้งลูกค้าหรือไม่
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Button size="sm" onClick={() => setOpen(false)}>
                  ปิด
                </Button>
                <a
                  href="#send-email"
                  className="text-primary underline underline-offset-4"
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: ใส่ลอจิกส่งอีเมลของคุณที่นี่
                    setOpen(false);
                  }}
                >
                  ส่งอีเมล
                </a>
              </div>
            </div>
          </PopoverContent>
        </Popover> */}

        {/* ช่องค้นหา (ตามสไตล์ภาพ) */}
        <div className="ml-1 flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="ค้นหา..." className="h-9 w-[220px] pl-8" />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
