import React from "react";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { PlusIcon } from "lucide-react";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import dayjs from "dayjs";
import { WorkExperienceModal } from "./formworkExperiencesModal";
import { useFieldArray, useWatch, type UseFormReturn } from "react-hook-form";
import type { UsersFormValues } from "~/schemas/users/user";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export interface UserFormProfileProps {
  form: UseFormReturn<UsersFormValues>;
  data?: Partial<UsersFormValues>;
  loading?: boolean;
}

export const UserWorkExperience: React.FC<UserFormProfileProps> = ({
  form,
  loading = false,
}) => {
  const {
    fields: weFields,
    // append: appendWe,
    remove: removeWe,
    update: updateWe,
  } = useFieldArray({
    control: form.control,
    name: "profile.workExperiences",
  });

  const weValues = useWatch({
    control: form.control,
    name: "profile.workExperiences",
  });

  const [open, setOpen] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);

  const handleOpenCreate = () => {
    const nextIndex = form.getValues("profile.workExperiences")?.length ?? 0;

    // updateWe(nextIndex, {
    //   // id: uid(),
    //   company: "",
    //   position: "",
    //   employmentType: "",
    //   startDate: "",
    //   endDate: "",
    //   isCurrent: false,
    //   location: "",
    //   description: "",
    // });

    setEditingIndex(Math.max(nextIndex, 0));
    setOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    if (editingIndex !== null) {
      const v = form.getValues(`profile.workExperiences.${editingIndex}`);
      const blank =
        !v?.company &&
        !v?.position &&
        !v?.employmentType &&
        !v?.startDate &&
        !v?.endDate &&
        !v?.isCurrent &&
        !v?.location &&
        !v?.description;

      if (blank) removeWe(editingIndex);
    }
    setOpen(false);
    setEditingIndex(null);
  };

  const handleSubmitFromModal = () => {
    if (editingIndex === null) return;

    GlobalModal.info({
      title: "บันทึกประสบการณ์ทำงาน",
      description: "คุณต้องการทำรายการ ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังบันทึกข้อมูล...");
        try {
          const current = form.getValues(
            `profile.workExperiences.${editingIndex}`
          );
          updateWe(editingIndex, {
            company: current?.company ?? "",
            position: current?.position ?? "",
            employmentType: current?.employmentType ?? "",
            startDate: current?.startDate ?? "",
            endDate: current?.endDate ?? "",
            isCurrent: !!current?.isCurrent,
            location: current?.location ?? "",
            description: current?.description ?? "",
          });
          toast.success("บันทึกเรียบร้อยแล้ว!", { id: toastId });
          setOpen(false);
          setEditingIndex(null);
        } catch {
          toast.error("ดำเนินการไม่สำเร็จ กรุณาลองใหม่ภายหลัง", {
            id: toastId,
          });
        }
      },
    });
  };

  // ลบแบบมีโมดัลยืนยัน
  const handleDelete = (index: number) => {
    GlobalModal.warning({
      title: "ลบประสบการณ์ทำงาน",
      description: "คุณต้องการทำรายการ ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังลบข้อมูล...");
        try {
          removeWe(index);
          if (editingIndex === index) {
            setOpen(false);
            setEditingIndex(null);
          } else if (editingIndex !== null && index < editingIndex) {
            setEditingIndex(editingIndex - 1);
          }
          toast.success("ลบรายการเรียบร้อยแล้ว", { id: toastId });
        } catch {
          toast.error("ลบรายการไม่สำเร็จ กรุณาลองใหม่ภายหลัง", { id: toastId });
        }
      },
    });
  };

  return (
    <Card className="py-0 pb-5">
      {loading ? (
        <CardContent className="space-y-4 ">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <CardContent className="space-y-4">
          <div className="lg:col-span-2 flex flex-col gap-3 mt-5">
            <div className="flex items-center justify-between">
              <h1 className="font-bold">ประสบการณ์ทำงาน</h1>
              <Button
                type="button"
                size="sm"
                onClick={handleOpenCreate}
                aria-label="เพิ่มประสบการณ์ทำงาน"
              >
                <PlusIcon />
              </Button>
            </div>

            {weFields.length === 0 ? (
              <div className="rounded-xl text-sm text-muted-foreground">
                ยังไม่มีประวัติประสบการณ์ทำงาน กรุณากดปุ่ม “+”
                เพื่อเพิ่มรายการแรก
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {weFields.map((row, index) => {
                  const wv = (weValues?.[index] as any) ?? {};
                  const company =
                    typeof wv?.company === "string" ? wv.company.trim() : "";
                  const position =
                    typeof wv?.position === "string" ? wv.position.trim() : "";

                  const formatDate = (d?: string) =>
                    d ? dayjs(d).format("DD MMMM YYYY") : "-";

                  const period =
                    wv?.startDate || wv?.endDate
                      ? `${formatDate(wv?.startDate)} - ${
                          wv?.isGraduated
                            ? formatDate(wv?.endDate)
                            : wv?.endDate
                              ? formatDate(wv?.endDate)
                              : "ปัจจุบัน"
                        }`
                      : "";

                  const details = [
                    { label: "ตำแหน่ง", value: position ?? "-" },
                    {
                      label: "ประเภทการจ้างงาน",
                      value: wv?.employmentType ?? "-",
                    },
                    { label: "ช่วงเวลา", value: period ?? "-" },
                    { label: "ที่ตั้ง", value: wv?.location ?? "-" },
                    { label: "รายละเอียด", value: wv?.description ?? "-" },
                  ].filter((d) => d.value && String(d.value).trim().length > 0);

                  return (
                    <div
                      key={row.id}
                      className="rounded-xl border p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <h4 className="font-semibold truncate">
                            {company
                              ? `บริษัท: ${company}`
                              : position
                                ? `ตำแหน่ง: ${position}`
                                : `ประวัติประสบการณ์ทำงาน #${index + 1}`}
                          </h4>

                          {details.length > 0 && (
                            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                              {details.map((d) => (
                                <p
                                  key={d.label}
                                  className={
                                    d.label === "รายละเอียด"
                                      ? "break-words"
                                      : "truncate"
                                  }
                                >
                                  <span className="font-medium">
                                    {d.label}:
                                  </span>{" "}
                                  <span>{String(d.value)}</span>
                                </p>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            type="button"
                            variant="secondary"
                            aria-label={`แก้ไขประสบการณ์ทำงาน #${index + 1}`}
                            onClick={() => handleOpenEdit(index)}
                          >
                            แก้ไข
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            aria-label={`ลบประสบการณ์ทำงาน #${index + 1}`}
                            onClick={() => handleDelete(index)}
                          >
                            ลบรายการนี้
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      )}

      {editingIndex !== null && (
        <WorkExperienceModal
          open={open}
          title={
            form.getValues(`profile.workExperiences.${editingIndex}.company`)
              ? "แก้ไขประสบการณ์ทำงาน"
              : "เพิ่มประสบการณ์ทำงาน"
          }
          form={form}
          indexPath={editingIndex}
          onClose={handleClose}
          onSubmit={handleSubmitFromModal}
        />
      )}
    </Card>
  );
};
