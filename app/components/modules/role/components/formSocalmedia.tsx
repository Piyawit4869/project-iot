import React, { useEffect } from "react";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { PlusIcon } from "lucide-react";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { useFieldArray, useWatch, type UseFormReturn } from "react-hook-form";
import type { UsersFormValues } from "~/schemas/users/user";
import { CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { UserSocialModal } from "./formSocalmediaModal";

export interface UserFormProfileProps {
  form: UseFormReturn<UsersFormValues>;
  data?: Partial<UsersFormValues>;
  loading?: boolean;
}

export const UserSocalmedias: React.FC<UserFormProfileProps> = ({
  form,
  data,
  loading = false,
}) => {
  const {
    fields: smFields,
    // append: appendSm,
    remove: removeSm,
    update: updateSm,
    replace: replaceSm,
  } = useFieldArray({
    control: form.control,
    name: "profile.socialMedia",
  });

  const smValues = useWatch({
    control: form.control,
    name: "profile.socialMedia",
  });

  const [open, setOpen] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);

  const handleOpenCreate = () => {
    // appendSm({
    //   id: uid(),
    //   platform: "",
    //   username: "",
    //   url: "",
    //   isPrimary: false,
    //   description: "",
    // });
    const nextIndex = form.getValues("profile.socialMedia")?.length ?? 0;
    setEditingIndex(Math.max(nextIndex, 0));
    setOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    if (editingIndex !== null) {
      const v = form.getValues(`profile.socialMedia.${editingIndex}`);
      const blank =
        !v?.platform &&
        !v?.username &&
        !v?.url &&
        !v?.description &&
        !v?.isPrimary;
      if (blank) removeSm(editingIndex);
    }
    setOpen(false);
    setEditingIndex(null);
  };

  const handleSubmitFromModal = () => {
    if (editingIndex === null) return;

    GlobalModal.info({
      title: "บันทึกโซเชียลมีเดีย",
      description: "คุณต้องการทำรายการ ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังบันทึกข้อมูล...");
        try {
          const current = form.getValues(`profile.socialMedia.${editingIndex}`);
          updateSm(editingIndex, {
            platform: current?.platform ?? "",
            username: current?.username ?? "",
            url: current?.url ?? "",
            isPrimary: !!current?.isPrimary,
            description: current?.description ?? "",
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
      title: "ลบโซเชียลมีเดีย",
      description: "คุณต้องการทำรายการ ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังลบข้อมูล...");
        try {
          removeSm(index);
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
      data.profile?.socialMedia ?? (data as any)?.socialMedia ?? [];
    const normalized = fromApi.map((e: any) => ({
      platform: e.platform ?? "",
      username: e.username ?? "",
      url: e.url ?? "",
      isPrimary: !!e.isPrimary,
      description: e.description ?? "",
    }));

    replaceSm(normalized);
  }, [data, replaceSm]);

  return (
    <>
      {loading ? (
        <CardContent className="space-y-4">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <CardContent className="space-y-4">
          <div className="lg:col-span-2 flex flex-col gap-3 mt-5">
            <div className="flex items-center justify-between">
              <h1 className="font-bold">โซเชียลมีเดีย</h1>
              <Button
                type="button"
                size="sm"
                onClick={handleOpenCreate}
                aria-label="เพิ่มโซเชียลมีเดีย"
              >
                <PlusIcon />
              </Button>
            </div>

            {smFields.length === 0 ? (
              <div className="rounded-xl text-sm text-muted-foreground">
                ยังไม่มีโซเชียลมีเดีย กรุณากดปุ่ม “+” เพื่อเพิ่มรายการแรก
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {smFields.map((row, index) => {
                  const sv = (smValues?.[index] as any) ?? {};
                  const platform =
                    typeof sv?.platform === "string" ? sv.platform.trim() : "";

                  const url = typeof sv?.url === "string" ? sv.url.trim() : "";

                  const titleParts: string[] = [];
                  if (platform) titleParts.push(`แพลตฟอร์ม: ${platform}`);
                  const title =
                    titleParts.length > 0
                      ? titleParts.join(" ")
                      : `โซเชียลมีเดีย #${index + 1}`;

                  const details = [
                    { label: "ลิงก์", value: url },
                    { label: "บัญชีหลัก", value: sv?.isPrimary ? "ใช่" : "" },
                    { label: "รายละเอียด", value: sv?.description ?? "-" },
                  ].filter((d) => d.value && String(d.value).trim().length > 0);

                  return (
                    <div
                      key={row.id}
                      className="rounded-xl border p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <h4 className="font-semibold truncate">{title}</h4>

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
                                  {d.label === "ลิงก์" ? (
                                    <a
                                      href={String(d.value)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="underline underline-offset-2"
                                    >
                                      {String(d.value)}
                                    </a>
                                  ) : (
                                    <span>{String(d.value)}</span>
                                  )}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            type="button"
                            variant="secondary"
                            aria-label={`แก้ไขโซเชียลมีเดีย #${index + 1}`}
                            onClick={() => handleOpenEdit(index)}
                          >
                            แก้ไข
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            aria-label={`ลบโซเชียลมีเดีย #${index + 1}`}
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
        <UserSocialModal
          open={open}
          title={
            form.getValues(`profile.socialMedia.${editingIndex}.platform`)
              ? "แก้ไขโซเชียลมีเดีย"
              : "เพิ่มโซเชียลมีเดีย"
          }
          form={form}
          indexPath={editingIndex}
          onClose={handleClose}
          onSubmit={handleSubmitFromModal}
        />
      )}
    </>
  );
};
