import React from "react";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { PenLine, PlusIcon, Trash2, X } from "lucide-react";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import type { UsersFormValues } from "~/schemas/users/user";
import { useFieldArray, useWatch, type UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { UserSkillModal } from "./formSkillsModal";
import { Separator } from "~/components/ui/separator";
import GlobalButton from "~/components/shared/global-button";

export interface UserFormProfileProps {
  form: UseFormReturn<UsersFormValues>;
  data?: Partial<UsersFormValues>;
  loading?: boolean;
}

export const UserSkills: React.FC<UserFormProfileProps> = ({
  form,
  loading = false,
}) => {
  const {
    fields: skFields,
    // append: appendSk,
    remove: removeSk,
    update: updateSk,
  } = useFieldArray({
    control: form.control,
    name: "profile.skills",
  });

  const skValues = useWatch({
    control: form.control,
    name: "profile.skills",
  });

  const [open, setOpen] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [originalData, setOriginalData] = React.useState<any>(null);

  const handleOpenCreate = () => {
    const nextIndex = form.getValues("profile.skills")?.length ?? 0;
    // updateSk(nextIndex, {
    //   // id: uid(),
    //   name: "",
    //   level: "",
    //   yearsOfExperience: undefined as unknown as number,
    //   isPrimary: false,
    //   description: "",
    // });
    setEditingIndex(Math.max(nextIndex, 0));
    setOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    const current = form.getValues(`profile.skills.${index}`);
    setOriginalData(structuredClone(current));
    setEditingIndex(index);
    setOpen(true);
  };

  // ปิดโมดัล: ถ้ารายการเพิ่งสร้างและยังว่าง ให้ลบทิ้ง
  const handleClose = () => {
    if (editingIndex !== null) {
      if (originalData) {
        updateSk(editingIndex, originalData);
      } else {
        const v = form.getValues(`profile.skills.${editingIndex}`);
        const blank =
          !v?.name &&
          !v?.level &&
          !v?.description &&
          !v?.yearsOfExperience &&
          !v?.isPrimary;

        if (blank) {
          removeSk(editingIndex);
        }
      }
    }
    setOriginalData(null);
    setOpen(false);
    setEditingIndex(null);
  };

  const handleSubmitFromModal = () => {
    if (editingIndex === null) return;

    GlobalModal.info({
      title: "บันทึกทักษะ",
      description: "คุณต้องการทำรายการ ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังบันทึกข้อมูล...");
        try {
          const current = form.getValues(`profile.skills.${editingIndex}`);
          updateSk(editingIndex, {
            name: current?.name ?? "",
            level: current?.level ?? "",
            yearsOfExperience:
              current?.yearsOfExperience === undefined ||
              current?.yearsOfExperience === null ||
              (current?.yearsOfExperience as any) === ""
                ? undefined
                : Number(current.yearsOfExperience),
            isPrimary: !!current?.isPrimary,
            description: current?.description ?? "",
          });
          setOriginalData(null);
          toast.success("บันทึกเรียบร้อยแล้ว!", { id: toastId });
          setOpen(false);
          setEditingIndex(null);
        } catch {
          toast.error("ดำเนินการไม่สำเร็จ", { id: toastId });
        }
      },
    });
  };

  const handleDelete = (index: number) => {
    GlobalModal.warning({
      title: "ลบทักษะ",
      description: "คุณต้องการทำรายการ ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังลบข้อมูล...");
        try {
          removeSk(index);
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
    <div className="py-0 pb-5">
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
              <h1 className="font-bold text-base">ทักษะ</h1>
              <Button
                type="button"
                size="sm"
                onClick={handleOpenCreate}
                aria-label="เพิ่มทักษะ"
              >
                <PlusIcon />
              </Button>
            </div>

            {skFields.length === 0 ? (
              <div className="rounded-xl text-sm text-muted-foreground">
                ยังไม่มีประวัติทักษะ กรุณากดปุ่ม “+” เพื่อเพิ่มรายการแรก
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {skFields.map((row, index) => {
                  const sv = (skValues?.[index] as any) ?? {};
                  const name =
                    typeof sv?.name === "string" ? sv.name.trim() : "";
                  const level =
                    typeof sv?.level === "string" ? sv.level.trim() : "";
                  const yoeRaw =
                    sv?.yearsOfExperience !== undefined &&
                    sv?.yearsOfExperience !== null &&
                    (sv?.yearsOfExperience as any) !== ""
                      ? Number(sv.yearsOfExperience)
                      : undefined;
                  const yoeTxt =
                    yoeRaw !== undefined && yoeRaw > 0 ? `${yoeRaw} ปี` : "";

                  const details = [
                    { label: "ระดับความชำนาญ", value: level ?? "-" },
                    { label: "ประสบการณ์", value: yoeTxt ?? "-" },
                    { label: "ทักษะหลัก", value: sv?.isPrimary ? "ใช่" : "" },
                    { label: "รายละเอียด", value: sv?.description ?? "-" },
                  ].filter((d) => d.value && String(d.value).trim().length > 0);

                  return (
                    <div key={row.id} className="">
                      <div className="flex items:start sm:items-center justify-between flex-col sm:flex-row">
                        <div className="min-w-0">
                          <h4 className="font-semibold truncate">
                            {name
                              ? `ทักษะ : ${name}`
                              : level
                                ? `ระดับ : ${level}`
                                : `ประวัติทักษะ #${index + 1}`}
                          </h4>

                          {details.length > 0 && (
                            <>
                              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
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
                                      {d.label} :
                                    </span>{" "}
                                    <span>{String(d.value)}</span>
                                  </p>
                                ))}
                              </div>
                            </>
                          )}
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                          <GlobalButton
                            label="แก้ไข"
                            type="button"
                            variant="outline"
                            width="80px"
                            aria-label={`แก้ไขทักษะ #${index + 1}`}
                            onClick={() => handleOpenEdit(index)}
                            className="  transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm"
                            icon={<PenLine size={20} />}
                          />

                          <GlobalButton
                            label="ลบรายการนี้"
                            type="button"
                            variant="secondary"
                            width="120px"
                            aria-label={`ลบทักษะ #${index + 1}`}
                            onClick={() => handleDelete(index)}
                            className="  transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm"
                            icon={<Trash2 size={20} />}
                          />
                        </div>
                      </div>
                      {skFields.length > 1 && <Separator className="my-2" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      )}

      {editingIndex !== null && (
        <UserSkillModal
          open={open}
          title={
            form.getValues(`profile.skills.${editingIndex}.name`)
              ? "แก้ไขทักษะ"
              : "เพิ่มทักษะ"
          }
          form={form}
          indexPath={editingIndex}
          onClose={handleClose}
          onSubmit={handleSubmitFromModal}
        />
      )}
    </div>
  );
};
