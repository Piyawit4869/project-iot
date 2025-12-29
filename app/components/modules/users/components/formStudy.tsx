import React, { useEffect } from "react";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { PlusIcon } from "lucide-react";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";

import dayjs from "dayjs";
import { useFieldArray, useWatch, type UseFormReturn } from "react-hook-form";
import type { UsersFormValues } from "~/schemas/users/user";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { UserStudyModal } from "./formStudyModal";

export interface UserFormProfileProps {
  form: UseFormReturn<UsersFormValues>;
  data?: Partial<UsersFormValues>;
  loading?: boolean;
}

export const UserStudy: React.FC<UserFormProfileProps> = ({
  form,
  data,
  loading = false,
}) => {
  const {
    fields: eduFields,
    // append: appendEdu,
    remove: removeEdu,
    update: updateEdu,
    replace: replaceEdu,
  } = useFieldArray({
    control: form.control,
    name: "profile.educationInformations",
  });

  const eduValues = useWatch({
    control: form.control,
    name: "profile.educationInformations",
  });

  const [open, setOpen] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);

  const handleOnOpenModal = () => {
    const nextIndex =
      form.getValues("profile.educationInformations")?.length ?? 0;

    // updateEdu(nextIndex, {
    //   // id: uid(),
    //   institution: "",
    //   degree: "",
    //   major: "",
    //   faculty: "",
    //   gpa: undefined,
    //   startDate: "",
    //   endDate: "",
    //   isGraduated: false,
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
      const v = form.getValues(`profile.educationInformations.${editingIndex}`);
      const blank =
        !v?.institution &&
        !v?.degree &&
        !v?.major &&
        !v?.faculty &&
        !v?.gpa &&
        !v?.startDate &&
        !v?.endDate &&
        !v?.isGraduated;

      removeEdu(editingIndex);
    }
    setOpen(false);
    setEditingIndex(null);
  };

  const handleSubmitFromModal = () => {
    if (editingIndex === null) return;

    GlobalModal.info({
      title: "บันทึกประวัติการศึกษา",
      description: "คุณต้องการทำรายการ ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังบันทึกข้อมูล...");
        try {
          const current = form.getValues(
            `profile.educationInformations.${editingIndex}`
          );
          updateEdu(editingIndex, {
            ...current,
            gpa: current?.gpa ?? undefined,
            isGraduated: !!current?.isGraduated,
            degree: current?.degree ?? "",
            major: current?.major ?? "",
            faculty: current?.faculty ?? "",
            description: current?.description ?? "",
            startDate: current?.startDate ?? "",
            endDate: current?.endDate ?? "",
          });
          toast.success("บันทึกเรียบร้อยแล้ว!", { id: toastId });
          setOpen(false);
          setEditingIndex(null);
        } catch (e) {
          toast.error("ดำเนินการไม่สำเร็จ กรุณาลองใหม่ภายหลัง", {
            id: toastId,
          });
        }
      },
    });
  };

  const handleDelete = (index: number) => {
    GlobalModal.warning({
      title: "ลบประวัติการศึกษา",
      description: "คุณต้องการทำรายการ ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังลบข้อมูล...");
        try {
          removeEdu(index);

          if (editingIndex === index) {
            setOpen(false);
            setEditingIndex(null);
          } else if (editingIndex !== null && index < editingIndex) {
            setEditingIndex(editingIndex - 1);
          }
          toast.success("ลบรายการเรียบร้อยแล้ว", { id: toastId });
        } catch (e) {
          toast.error("ลบรายการไม่สำเร็จ กรุณาลองใหม่ภายหลัง", { id: toastId });
        }
      },
    });
  };

  useEffect(() => {
    if (!data) return;
    const fromApi =
      data.profile?.educationInformations ??
      (data as any)?.educationInformations ??
      [];

    const forms = fromApi.map((e: any) => ({
      institution: e.institution ?? "",
      degree: e.degree ?? "",
      major: e.major ?? "",
      faculty: e.faculty ?? "",
      gpa:
        e.gpa === null || e.gpa === undefined || e.gpa === ""
          ? undefined
          : Number(e.gpa),
      startDate: e.startDate ?? "",
      endDate: e.endDate ?? "",
      isGraduated: !!e.isGraduated,
      description: e.description ?? "",
    }));

    form.reset({
      ...form.getValues(),
      ...data,
      profile: {
        ...form.getValues("profile"),
        ...(data.profile ?? {}),
        educationInformations: forms,
      },
    });

    replaceEdu(forms);
  }, [data, form, replaceEdu]);

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
              <h1 className="font-bold">การศึกษา</h1>
              <Button
                type="button"
                size="sm"
                onClick={handleOnOpenModal}
                aria-label="เพิ่มประวัติการศึกษา"
              >
                <PlusIcon />
              </Button>
            </div>

            {eduFields.length === 0 ? (
              <div className="rounded-xl text-sm text-muted-foreground">
                ยังไม่มีประวัติการศึกษา กรุณากดปุ่ม “+” เพื่อเพิ่มรายการแรก
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {eduFields.map((row, index) => {
                  const ev = (eduValues?.[index] as any) ?? {};
                  const inst =
                    typeof ev?.institution === "string"
                      ? ev.institution.trim()
                      : "";

                  const formatDate = (d?: string) =>
                    d ? dayjs(d).format("DD MMMM YYYY") : "-";

                  const period =
                    ev?.startDate || ev?.endDate
                      ? `${formatDate(ev?.startDate)} - ${
                          ev?.isGraduated
                            ? formatDate(ev?.endDate)
                            : ev?.endDate
                              ? formatDate(ev?.endDate)
                              : "ปัจจุบัน"
                        }`
                      : "";

                  const details = [
                    { label: "ระดับการศึกษา", value: ev?.degree ?? "-" },
                    { label: "สาขา", value: ev?.major ?? "-" },
                    { label: "คณะ", value: ev?.faculty ?? "-" },
                    {
                      label: "เกรดเฉลี่ย",
                      value:
                        ev?.gpa !== undefined &&
                        ev?.gpa !== null &&
                        String(ev.gpa) !== ""
                          ? ev.gpa
                          : "-",
                    },
                    {
                      label: "ช่วงเวลา",
                      value: period ?? "-",
                    },
                    { label: "รายละเอียด", value: ev?.description ?? "-" },
                  ].filter((d) => d.value && String(d.value).trim().length > 0);

                  return (
                    <div key={row.id} className=" p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <h4 className="font-semibold truncate">
                            {inst
                              ? `การศึกษา: ${inst}`
                              : `ประวัติการศึกษา #${index + 1}`}
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
                            aria-label={`แก้ไขประวัติการศึกษา #${index + 1}`}
                            onClick={() => handleOpenEdit(index)}
                          >
                            แก้ไข
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            aria-label={`ลบประวัติการศึกษา #${index + 1}`}
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
        <UserStudyModal
          open={open}
          title={
            form.getValues(
              `profile.educationInformations.${editingIndex}.institution`
            )
              ? "แก้ไขประวัติการศึกษา"
              : "เพิ่มประวัติการศึกษา"
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
