"use client";

import React from "react";

import GlobalButton from "~/components/shared/global-button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";

import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Check,
  ChevronRight,
  Hourglass,
  MailCheck,
} from "lucide-react";
import { useParams, useRouteLoaderData } from "react-router";

interface Step {
  label: string;
}

interface ArrowProgressProps {
  activeStep?: string;
  data?: any;
  offIcon?: boolean;
}

export default function ArrowProgress({
  activeStep,
  data,
  offIcon,
}: ArrowProgressProps) {
  const steps: Step[] = [
    { label: "Quatation \n ใบเสนอราคา - completed" },
    { label: "PO Deposit 30% \n เมื่อรับเงินแล้ว 30%" },
    { label: "Production \n เริ่มผลิตสินค้า - pending" },
    { label: "70%/100% Balance \n ชำระยอดคงเหลือ 70%/100% - pending" },
    { label: "Done \n ปิดงาน - pending" },
  ];
  //phase

  return (
    <div
      style={{
        display: "flex",
        listStyle: "none",
        padding: 0,
        margin: 0,
      }}
    >
      {steps.map((step, index) => {
        const isFirst = index === 0;
        const isLast = index === steps.length - 1;

        const convert = Number(Number(data?.phase ?? "1")) - 1;

        const activeIndex = steps.findIndex(
          (s) => s.label === (activeStep ?? steps[convert]?.label)
        );
        const isActive = step.label === (activeStep ?? steps[convert]?.label);

        const isNext = index === activeIndex + 1; // สเตปถัดไป

        // สีพื้นหลัง
        const bgColor = isActive ? "#34C759" : isNext ? "#8FB8FA" : "#e6e6e6";

        const textColor = isActive ? "#fff" : isNext ? "" : "#000";

        const arrowSize = 10;

        const clipPath = isFirst
          ? `polygon(0% 0%, calc(100% - ${arrowSize}px) 0%, 100% 50%, calc(100% - ${arrowSize}px) 100%, 0% 100%)`
          : isLast
            ? `polygon(${arrowSize}px 50%, 0% 0%, 100% 0%, 100% 100%, 0% 100%)`
            : `polygon(${arrowSize}px 50%, 0% 0%, calc(100% - ${arrowSize}px) 0%, 100% 50%, calc(100% - ${arrowSize}px) 100%, 0% 100%)`;

        return (
          <div
            key={index}
            style={{
              flex: 1,
              position: "relative",
              padding: "10px 10px 10px 10px",
              maxWidth: 270,
              textAlign: "center",
              color: textColor,

              background: bgColor,
              clipPath: clipPath,
              borderRadius: "6px",
              boxShadow: isActive
                ? "0 3px 8px rgba(0,0,0,0.25)"
                : "0 2px 5px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              fontWeight: isActive ? 600 : 400,
              marginLeft: index > 0 ? "-2px" : "0",
              userSelect: "none",
            }}
          >
            <span className="text-sm whitespace-pre-line">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
