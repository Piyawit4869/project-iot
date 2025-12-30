import React, { useRef, useLayoutEffect, useState } from "react";
import { ArrowBigLeftDash, ArrowBigRightDash, Check, Save } from "lucide-react";
import { cn } from "~/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Card } from "../ui/card";
import { CircularProgress } from "./circular-progress";
import GlobalButton from "./global-button";
import { Button } from "../ui/button";

export function StepsVertical({
  steps,
  current,
  onChange,
  classNameContent,
  buttonBottom,
  card,
  prev,
  next,
  formName,
  stepProgressMap,
  disableBtn,
  isDisabled,
  isCreating,
  finalButtonText,
  totalSteps = 4,
}: {
  prev?: any;
  next?: any;
  formName?: string;
  stepProgressMap?: any;
  isDisabled?: boolean;
  isCreating?: boolean;
  disableBtn?: any;
  finalButtonText?: string;
  totalSteps?: number;
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
  card?: any;
}) {
  const safeIndex = Math.min(current, steps.length - 1);
  const [prevIndex, setPrevIndex] = useState(0);

  const direction = safeIndex > prevIndex ? 1 : -1;

  const activeStep = steps[safeIndex];

  React.useEffect(() => {
    setPrevIndex(safeIndex);
  }, [safeIndex]);

  return (
    <div
      className={cn(
        " ", // base
        card &&
          "bg-card text-card-foreground gap-6 rounded-xl border pt-6 pr-5 shadow-sm"
      )}
    >
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
                  onClick={() => {
                    if (disableBtn) return;
                    onChange?.(index);
                  }}
                  className={cn(
                    "flex items-start gap-3",
                    disableBtn ? "" : "cursor-pointer  "
                  )}
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
                      ) : s.progress == null ? (
                        isActive ? (
                          <span className="">กำลังดำเนินการ...</span>
                        ) : (
                          <span className="text-muted-foreground"></span>
                        )
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
              <span className=" text-lg font-bold ">
                {activeStep?.title || ""}
              </span>

              {activeStep?.descriptions && (
                <span className="text-sm mt-1 text-muted-foreground">
                  {activeStep.descriptions}
                </span>
              )}
            </span>

            {activeStep?.progress && (
              <span>
                <CircularProgress
                  value={activeStep.progress}
                  size={100}
                  strokeWidth={10}
                  showLabel
                  labelClassName="text-lg font-bold"
                  renderLabel={(progress) => `${progress}%`}
                  className="stroke-teal-800/25  "
                  progressClassName="stroke-teal-600"
                />
              </span>
            )}
          </div>

          <AnimatePresence mode="sync">
            <SlideContent key={safeIndex} direction={direction}>
              {activeStep?.content}
            </SlideContent>
          </AnimatePresence>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex gap-3 justify-end w-full py-5 ">
        <div className="flex  gap-4 flex-row">
          <GlobalButton
            width="100px"
            className="  bg-white border border-gray-300 text-black hover:bg-gray-100
    group transition-all duration-200 hover:shadow-md"
            onClick={prev}
            type="button"
            label="ย้อนกลับ"
            disabled={current === 0}
            icon={
              <ArrowBigLeftDash className="transition-all duration-200 group-hover:-translate-x-1" />
            }
          />
          {current < totalSteps - 1 && (
            <GlobalButton
              width="100px"
              className="  group transition-all duration-200 hover:shadow-md"
              type="button"
              onClick={next}
              disabled={disableBtn}
              label="ถัดไป"
              icon={
                <ArrowBigRightDash className=" transition-all duration-200 group-hover:translate-x-1" />
              }
            />
          )}

          {current === totalSteps - 1 && (
            <GlobalButton
              type="submit"
              width="125px"
              disabled={isDisabled || isCreating}
              form={formName}
              className="  transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm"
              label={finalButtonText}
              icon={<Save />}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------
   Slide Animation Component
   (ดึงมาจาก Stepper)
-------------------------------- */
function SlideContent({ children, direction }: any) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      custom={direction}
      initial="enter"
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
const slideVariants = {
  // enter: (dir: number) => ({
  //   x: dir > 0 ? "60%" : "-60%",
  //   position: "absolute",
  //   opacity: 0,
  // }),
  // center: {
  //   x: 0,
  //   position: "relative",
  //   opacity: 1,
  // },
  // exit: (dir: number) => ({
  //   x: dir > 0 ? "-60%" : "60%",
  //   position: "absolute",
  //   opacity: 0,
  // }),
  enter: {
    scale: 0.92,
    opacity: 0,
    position: "absolute",
  },
  center: {
    scale: 1,
    opacity: 1,
    position: "relative",
  },
  exit: {
    scale: 0.85,
    opacity: 0,
    position: "absolute",
  },
};
