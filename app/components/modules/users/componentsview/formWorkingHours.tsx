// "use client";

// import React from "react";
// import { CardContent, Button, CardHeader, CardTitle } from "@/components/ui";
// import { SkeletonLoading } from "@/components/shared/skeleton-loading";
// import { Clock, PencilIcon, PlusIcon } from "lucide-react";
// import { SettingSchemaValues } from "@/schemas/organization/organization";

// type WH = SettingSchemaValues;

// export interface WorkingHoursPageViewProps {
//   data?: Partial<SettingSchemaValues>;
//   loading?: boolean;
//   showActions?: boolean;
//   onAddClick?: () => void;
//   onEditClick?: () => void;
// }

// export const WorkingHours: React.FC<WorkingHoursPageViewProps> = ({
//   data,
//   loading = false,
//   showActions = false,
//   onAddClick,
//   onEditClick,
// }) => {
//   const wh = (data?.openDays || {}) as Partial<WH> & Record<string, any>;

//   // Normalize fields defensively
//   const days =
//     Array.isArray(wh.daysOfWeek) && wh.daysOfWeek.length
//       ? wh.daysOfWeek.join(", ")
//       : wh.days || wh.workDays || "";

//   const startTime = wh.startTime ?? "";
//   const endTime = wh.endTime ?? "";

//   const lunchStart = wh.lunchStart ?? "";
//   const lunchEnd = wh.lunchEnd ?? "";

//   const breakMinutes =
//     wh.breakMinutes !== undefined &&
//     wh.breakMinutes !== null &&
//     wh.breakMinutes !== ""
//       ? `${wh.breakMinutes} นาที`
//       : "";

//   const timezone = wh.timezone || wh.tz || "";

//   const flexible =
//     typeof wh.flexible === "boolean"
//       ? wh.flexible
//       : typeof wh.isFlexible === "boolean"
//         ? wh.isFlexible
//         : undefined;

//   const notes = wh.notes || wh.note || wh.description || wh.remark || "";

//   const rows = [
//     { label: "วันทำงาน", value: days },
//     {
//       label: "เวลา",
//       value:
//         startTime || endTime ? `${startTime || "-"} - ${endTime || "-"}` : "",
//     },
//     {
//       label: "พักกลางวัน",
//       value:
//         lunchStart || lunchEnd
//           ? `${lunchStart || "-"} - ${lunchEnd || "-"}`
//           : "",
//     },
//     { label: "พักรวม", value: breakMinutes },
//     { label: "โซนเวลา", value: timezone },
//     {
//       label: "ยืดหยุ่น",
//       value: typeof flexible === "boolean" ? (flexible ? "ใช่" : "ไม่ใช่") : "",
//     },
//     { label: "หมายเหตุ", value: notes },
//   ].filter((r) => r.value && String(r.value).trim().length > 0);

//   const hasData = rows.length > 0;

//   return (
//     <>
//       <CardHeader>
//         <div className="flex gap-2 items-center w-full justify-between">
//           <CardTitle className="text-base font-semibold text-lg flex items-center gap-2">
//             <Clock className="h-5 w-5" />
//             เวลาทำงาน
//           </CardTitle>

//           {showActions && (
//             <Button
//               type="button"
//               size="sm"
//               onClick={hasData ? onEditClick : onAddClick}
//               aria-label={hasData ? "แก้ไขเวลาทำงาน" : "เพิ่มเวลาทำงาน"}
//             >
//               {hasData ? (
//                 <PencilIcon className="h-4 w-4" />
//               ) : (
//                 <PlusIcon className="h-4 w-4" />
//               )}
//             </Button>
//           )}
//         </div>
//       </CardHeader>

//       {loading ? (
//         <CardContent className="space-y-4">
//           <SkeletonLoading />
//           <SkeletonLoading />
//         </CardContent>
//       ) : (
//         <CardContent>
//           {hasData ? (
//             <div className="rounded-xl border p-4">
//               <div className="space-y-1 text-sm">
//                 {rows.map((row) => (
//                   <p key={row.label} className="flex gap-2">
//                     <span className="text-muted-foreground min-w-[110px]">
//                       {row.label}:
//                     </span>
//                     <span className="font-medium">{String(row.value)}</span>
//                   </p>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="rounded-xl text-sm text-muted-foreground">
//               ยังไม่มีข้อมูลเวลาทำงาน
//             </div>
//           )}
//         </CardContent>
//       )}
//     </>
//   );
// };
