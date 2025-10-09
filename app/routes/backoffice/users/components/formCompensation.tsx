import React, { useEffect } from "react";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";

import { PlusIcon } from "lucide-react";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { CompensationModal } from "./formCompensationModal";
import dayjs from "dayjs";
import type { UsersFormValues } from "../user-schema/user";
import { useFieldArray, useWatch, type UseFormReturn } from "react-hook-form";
import { CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export interface UserFormProfileProps {
  form: UseFormReturn<UsersFormValues>;
  data?: Partial<UsersFormValues>;
  loading?: boolean;
}

export const UserCompensation: React.FC<UserFormProfileProps> = ({
  form,
  data,
  loading = false,
}) => {
  const {
    fields: cfFields,
    // append: appendCf,
    remove: removeCf,
    update: updateCf,
    replace: replaceCf,
  } = useFieldArray({
    control: form.control,
    name: "profile.compensationConfigs",
  });

  const cfValues = useWatch({
    control: form.control,
    name: "profile.compensationConfigs",
  });

  const [open, setOpen] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);

  const handleOpenCreate = () => {
    const nextIndex =
      form.getValues("profile.compensationConfigs")?.length ?? 0;

    // updateCf(nextIndex, {
    //   baseSalary: 0,
    //   currency: "",
    //   bonusEligible: false,
    //   bonusRate: undefined,
    //   allowance: undefined,
    //   insurance: "",
    //   providentFund: false,
    //   contractType: "",
    //   effectiveDate: "",
    //   expireDate: "",
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
      const v = form.getValues(`profile.compensationConfigs.${editingIndex}`);
      const blank =
        !v?.baseSalary &&
        !v?.currency &&
        !v?.bonusEligible &&
        !v?.bonusRate &&
        !v?.allowance &&
        !v?.insurance &&
        !v?.providentFund &&
        !v?.contractType &&
        !v?.effectiveDate &&
        !v?.expireDate &&
        !v?.description;

      if (blank) removeCf(editingIndex);
    }
    setOpen(false);
    setEditingIndex(null);
  };

  const handleSubmitFromModal = () => {
    if (editingIndex === null) return;

    GlobalModal.info({
      title: "บันทึกค่าตอบแทน",
      description: "คุณต้องการทำรายการ ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังบันทึกข้อมูล...");
        try {
          const current = form.getValues(
            `profile.compensationConfigs.${editingIndex}`
          );

          updateCf(editingIndex, {
            baseSalary:
              current?.baseSalary === undefined ||
              current?.baseSalary === null ||
              (current as any)?.baseSalary === ""
                ? 0
                : Number(current.baseSalary),
            currency: current?.currency ?? "",
            bonusEligible: !!current?.bonusEligible,
            bonusRate:
              current?.bonusRate === undefined ||
              current?.bonusRate === null ||
              (current as any)?.bonusRate === ""
                ? undefined
                : Number(current.bonusRate),
            allowance:
              current?.allowance === undefined ||
              current?.allowance === null ||
              (current as any)?.allowance === ""
                ? undefined
                : Number(current.allowance),
            insurance: current?.insurance ?? "",
            providentFund: !!current?.providentFund,
            contractType: current?.contractType ?? "",
            effectiveDate: current?.effectiveDate ?? "",
            expireDate: current?.expireDate ?? "",
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

  const handleDelete = (index: number) => {
    GlobalModal.warning({
      title: "ลบค่าตอบแทน",
      description: "คุณต้องการทำรายการ ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังลบข้อมูล...");
        try {
          removeCf(index);
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

  useEffect(() => {
    if (!data) return;
    const fromApi =
      data.profile?.compensationConfigs ??
      (data as any)?.compensationConfigs ??
      [];
    const normalized = fromApi.map((e: any) => ({
      baseSalary:
        e.baseSalary === null ||
        e.baseSalary === undefined ||
        e.baseSalary === ""
          ? undefined
          : Number(e.baseSalary),
      currency: e.currency ?? "TH",
      bonusEligible: !!e.bonusEligible,
      bonusRate:
        e.bonusRate === null || e.bonusRate === undefined || e.bonusRate === ""
          ? undefined
          : Number(e.bonusRate),
      allowance:
        e.allowance === null || e.allowance === undefined || e.allowance === ""
          ? undefined
          : Number(e.allowance),
      insurance: e.insurance ?? "",
      providentFund: !!e.providentFund,
      contractType: e.contractType ?? "",
      effectiveDate: e.effectiveDate ?? "",
      expireDate: e.expireDate ?? "",
      description: e.description ?? "",
    }));

    form.reset({
      ...form.getValues(),
      ...data,
      profile: {
        ...form.getValues("profile"),
        ...(data.profile ?? {}),
        compensationConfigs: normalized,
      },
    });

    replaceCf(normalized);
  }, [data, form, replaceCf]);

  return (
    <>
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
              <h1 className="font-bold">ค่าตอบแทน</h1>
              <Button
                type="button"
                size="sm"
                onClick={handleOpenCreate}
                aria-label="เพิ่มค่าตอบแทน"
              >
                <PlusIcon />
              </Button>
            </div>

            {cfFields.length === 0 ? (
              <div className="rounded-xl text-sm text-muted-foreground">
                ยังไม่มีค่าตอบแทน กรุณากดปุ่ม “+” เพื่อเพิ่มรายการแรก
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {cfFields.map((row, index) => {
                  const v = (cfValues?.[index] as any) ?? {};
                  const salary =
                    v?.baseSalary !== undefined && v?.baseSalary !== null
                      ? Number(v.baseSalary)
                      : undefined;
                  const currency = v?.currency && String(v.currency).trim();
                  const contract =
                    v?.contractType && String(v.contractType).trim();

                  const formatDate = (d?: string) =>
                    d ? dayjs(d).format("DD MMMM YYYY") : "-";

                  const period =
                    v?.startDate || v?.endDate
                      ? `${formatDate(v?.startDate)} - ${
                          v?.isGraduated
                            ? formatDate(v?.endDate)
                            : v?.endDate
                            ? formatDate(v?.endDate)
                            : "ปัจจุบัน"
                        }`
                      : "-";

                  const details = [
                    { label: "สกุลเงิน", value: currency ?? "-" },
                    {
                      label: "โบนัส",
                      value: v?.bonusEligible
                        ? v?.bonusRate !== undefined &&
                          v?.bonusRate !== null &&
                          v?.bonusRate !== ""
                          ? `มี (${v.bonusRate}%)`
                          : "มี"
                        : "-",
                    },
                    {
                      label: "เบี้ยเลี้ยง",
                      value:
                        v?.allowance !== undefined &&
                        v?.allowance !== null &&
                        String(v.allowance) !== ""
                          ? (Number(v.allowance), currency || "-")
                          : "",
                    },
                    { label: "ประกัน", value: v?.insurance ?? "-" },
                    {
                      label: "กองทุนสำรองเลี้ยงชีพ",
                      value: v?.providentFund ? "มี" : "-",
                    },
                    { label: "สัญญา", value: contract ?? "-" },
                    { label: "ช่วงเวลา", value: period ?? "-" },
                    { label: "หมายเหตุ", value: v?.description ?? "-" },
                  ].filter((d) => d.value && String(d.value).trim().length > 0);

                  return (
                    <div
                      key={row.id}
                      className="rounded-xl border p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <h4 className="font-semibold truncate">
                            {salary !== undefined && !Number.isNaN(salary)
                              ? `เงินเดือนพื้นฐาน: ${salary}`
                              : contract
                              ? `สัญญา: ${contract}`
                              : `ค่าตอบแทน #${index + 1}`}
                          </h4>

                          {details.length > 0 && (
                            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                              {details.map((d) => (
                                <p
                                  key={d.label}
                                  className={
                                    d.label === "หมายเหตุ"
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
                            aria-label={`แก้ไขค่าตอบแทน #${index + 1}`}
                            onClick={() => handleOpenEdit(index)}
                          >
                            แก้ไข
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            aria-label={`ลบค่าตอบแทน #${index + 1}`}
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
        <CompensationModal
          open={open}
          title={
            form.getValues(
              `profile.compensationConfigs.${editingIndex}.baseSalary`
            )
              ? "แก้ไขค่าตอบแทน"
              : "เพิ่มค่าตอบแทน"
          }
          form={form}
          indexPath={editingIndex}
          onClose={handleClose}
          onSubmit={handleSubmitFromModal}
          updateCf={updateCf}
        />
      )}
    </>
  );
};
