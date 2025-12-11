import React from "react";
import { Check } from "lucide-react";
import { cn } from "~/lib/utils";

export function StepsVertical({
  steps,
  current,
  onChange,
  classNameContent,
  buttonBottom,
}: {
  steps: {
    title: string;
    content: React.ReactNode;
    descriptions?: string;
    progress?: number;
  }[];

  current: number;
  onChange?: (index: number) => void;
  classNameContent?: string;
  buttonBottom?: React.ReactNode;
}) {
  // ป้องกัน current เกิน index
  const safeIndex = Math.min(current, steps.length - 1);
  const activeStep = steps[safeIndex];

  return (
    <>
      <div className="flex flex-row mt-2">
        {/* LEFT STEPS */}
        <div className="flex flex-col relative">
          {steps.map((s, index) => {
            const isActive = index === safeIndex;
            const isDone = index < safeIndex;
            const isLast = index === steps.length - 1;

            return (
              <div key={index} className="relative pl-6 pb-10">
                {!isLast && (
                  <div className="absolute left-[39px] top-8 h-full w-px bg-gray-300" />
                )}

                <div
                  onClick={() => onChange?.(index)}
                  className="flex items-start gap-3 cursor-pointer"
                >
                  {/* Circle */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border text-sm transition-all bg-white",
                      isActive && "bg-black text-white border-black",
                      isDone && "bg-black text-white border-black"
                    )}
                  >
                    {isDone ? <Check size={16} /> : index + 1}
                  </div>

                  <div className="mt-[6px] text-sm font-medium">
                    {s.title}

                    <div className="text-xs mt-2">
                      {s.progress === 100 ? (
                        <span className="text-green-500">เสร็จสิ้น</span>
                      ) : isActive ? (
                        <span className="">กำลังดำเนินการ...</span>
                      ) : (
                        <span className="text-muted-foreground">
                          ยังไม่สมบูรณ์
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT CONTENT */}
        <div className={cn("flex-1 min-h-[120px] ml-8", classNameContent)}>
          <div className="bg-white border p-5 mb-2 rounded-xl flex justify-between items-center">
            <span className="flex flex-col">
              {activeStep?.title || ""}

              {activeStep?.descriptions && (
                <span className="text-xs mt-1 text-muted-foreground">
                  {activeStep.descriptions}
                </span>
              )}
            </span>

            {activeStep?.progress && <span>{activeStep.progress}%</span>}
          </div>

          <div>{activeStep?.content}</div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex py-5 w-full">{buttonBottom}</div>
    </>
  );
}
