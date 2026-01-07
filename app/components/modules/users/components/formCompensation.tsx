import React, { useEffect } from "react";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";

import { PenLine, PlusIcon, Trash2 } from "lucide-react";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { CompensationModal } from "./formCompensationModal";
import dayjs from "dayjs";

import { useFieldArray, useWatch, type UseFormReturn } from "react-hook-form";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import type { UsersFormValues } from "~/schemas/users/user";
import { formatNumber } from "~/components/shared/global-format";
import GlobalButton from "~/components/shared/global-button";

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
  const [originalData, setOriginalData] = React.useState<any>(null);

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

    setOriginalData(null);
    setEditingIndex(Math.max(nextIndex, 0));
    setOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    const current = form.getValues(`profile.compensationConfigs.${index}`);
    setOriginalData(structuredClone(current));
    setEditingIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    if (editingIndex !== null) {
      if (originalData) {
        updateCf(editingIndex, originalData);
      } else {
        const v = form.getValues(`profile.compensationConfigs.${editingIndex}`);
        const blank =
          !v?.baseSalary &&
          !v?.bonusEligible &&
          !v?.bonusRate &&
          !v?.allowance &&
          !v?.insurance &&
          !v?.providentFund &&
          !v?.contractType &&
          !v?.effectiveDate &&
          !v?.expireDate &&
          !v?.description;

        if (blank) {
          removeCf(editingIndex);
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
              current?.allowance === undefined ||
              current?.allowance === null
                ? undefined
                : Number(current.allowance),

            insurance: current?.insurance ?? null,

            providentFund: !!current?.providentFund,

            contractType: current?.contractType ?? null,

            effectiveDate: current?.effectiveDate ?? null,

            expireDate: current?.expireDate ?? null,

            description: current?.description ?? null,
          });

          toast.success("บันทึกเรียบร้อยแล้ว!", { id: toastId });
          setOpen(false);
          setOriginalData(null);
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
              <h1 className="font-bold text-base">ค่าตอบแทน</h1>
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
                  const v = (cfValues?.[index] ?? {}) as any;

                  const salary =
                    v?.baseSalary != null ? Number(v.baseSalary) : undefined;

                  const currency = v?.currency?.toString().trim();
                  const contract = v?.contractType?.toString().trim();

                  const formatDate = (d?: string) =>
                    d ? dayjs(d).format("DD MMMM YYYY") : "-";

                  const period =
                    v?.effectiveDate || v?.expireDate
                      ? `${formatDate(v?.effectiveDate)} - ${
                          v?.effectiveDate
                            ? formatDate(v?.expireDate)
                            : v?.expireDate
                              ? formatDate(v?.expireDate)
                              : "ปัจจุบัน"
                        }`
                      : "-";

                  const title =
                    typeof salary === "number"
                      ? `เงินเดือนพื้นฐาน : ${formatNumber(salary)}`
                      : contract
                        ? `สัญญา : ${contract}`
                        : `ค่าตอบแทน #${index + 1}`;

                  const currencyLabel =
                    currency === "THB"
                      ? "บาท"
                      : currency === "USD"
                        ? "ดอลลาร์"
                        : (currency ?? "");

                  const details = [
                    {
                      label: "สกุลเงิน",
                      value:
                        currency === "THB"
                          ? "บาท"
                          : currency === "USD"
                            ? "ดอลลาร์"
                            : currency,
                    },
                    {
                      label: "เบี้ยเลี้ยง",
                      value:
                        v?.allowance != null &&
                        String(v.allowance).trim() !== ""
                          ? `${formatNumber(v.allowance)} ${currencyLabel ?? ""}`
                          : "-",
                    },
                    {
                      label: "โบนัส",
                      value: v?.bonusEligible
                        ? v?.bonusRate != null && v?.bonusRate !== ""
                          ? `มี (${v.bonusRate}%)`
                          : "มี"
                        : "ไม่มี",
                    },

                    // 🛡️ สวัสดิการ
                    { label: "ประกัน", value: v?.insurance || "-" },
                    {
                      label: "กองทุนสำรองเลี้ยงชีพ",
                      value: v?.providentFund ? "มี" : "-",
                    },

                    // 📄 สัญญา & เวลา
                    {
                      label: "สัญญา",
                      value:
                        contract === "full-time"
                          ? "พนักงานประจำ (Full-time)"
                          : contract === "contract"
                            ? "พนักงานชั่วคราว (Contract)"
                            : contract === "part-time"
                              ? "พนักงานรายวัน (Part-time)"
                              : contract,
                    },
                    { label: "ช่วงเวลาวันที่เริ่มมีผล", value: period },

                    // 📝 อื่น ๆ
                    { label: "หมายเหตุ", value: v?.description || "-" },
                  ].filter((d) => d.value && String(d.value).trim().length > 0);

                  return (
                    <div key={row.id}>
                      <div className="flex items:start sm:items-center justify-between flex-col sm:flex-row">
                        <div className="min-w-0">
                          <h4 className="font-semibold truncate">{title}</h4>

                          {details.length > 0 && (
                            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
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
                                    {d.label} :
                                  </span>{" "}
                                  <span>{d.value}</span>
                                </p>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                          <GlobalButton
                            label="แก้ไข"
                            type="button"
                            variant="outline"
                            width="80px"
                            aria-label={`แก้ไขค่าตอบแทน #${index + 1}`}
                            onClick={() => handleOpenEdit(index)}
                            className="  transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm"
                            icon={<PenLine size={20} />}
                          />

                          <GlobalButton
                            label="ลบรายการนี้"
                            type="button"
                            variant="secondary"
                            width="120px"
                            aria-label={`ลบค่าตอบแทน #${index + 1}`}
                            onClick={() => handleDelete(index)}
                            className="  transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm"
                            icon={<Trash2 size={20} />}
                          />
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

      {editingIndex !== null && open && (
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
        />
      )}
    </div>
  );
};
