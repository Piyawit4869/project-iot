import React from "react";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { useFieldArray, useWatch, type UseFormReturn } from "react-hook-form";

import { PlusIcon } from "lucide-react";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { DocumentModal } from "./formDocumentsModal";

import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import type { UsersFormValues } from "~/schemas/users/user";
// import dayjs from "dayjs";

export interface UserFormProfileProps {
  form: UseFormReturn<UsersFormValues>;
  data?: Partial<UsersFormValues>;
  loading?: boolean;
}

const isImageFile = (mime?: string | null) =>
  !!mime && mime.toLowerCase().startsWith("image/");

const getImageSrc = (v: any) => v.previewUrl || v.url || v.downloadUrl || "";

const safeString = (val: unknown) =>
  val === undefined || val === null ? "" : String(val);

const ImagePreview: React.FC<{ src: string; alt?: string }> = ({
  src,
  alt,
}) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  if (!src || error) return null;

  return (
    <div className="mt-2">
      <button
        type="button"
        className="group relative block w-28 h-28 overflow-hidden rounded-lg border hover:shadow-sm"
        onClick={() => setOpen(true)}
        title="กดเพื่อดูรูปขนาดใหญ่"
      >
        <img
          src={src}
          alt={alt ?? "image preview"}
          className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]"
          onError={() => setError(true)}
          loading="lazy"
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-5xl max-h-[85vh] w-full">
            <img
              src={src}
              alt={alt ?? "image full"}
              className="max-h-[85vh] w-full object-contain bg-white rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const UserDocuments: React.FC<UserFormProfileProps> = ({
  form,
  loading = false,
}) => {
  const {
    fields: dmFields,
    // append: appendDm,
    remove: removeDm,
    update: updateDm,
  } = useFieldArray({
    control: form.control,
    name: "profile.documents",
  });

  const dmValues = useWatch({
    control: form.control,
    name: "profile.documents",
  });

  const [open, setOpen] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);

  const handleOpenCreate = () => {
    // appendDm({
    //   id: uid(),
    //   type: "",
    //   fileName: "",
    //   mimeType: "",
    //   size: undefined as unknown as number,
    //   url: "",
    //   storageProvider: "",
    //   checksum: "",
    //   tags: [],
    //   isPrimary: false,
    //   version: undefined as unknown as number,
    //   expiresAt: "",
    //   verified: false,
    //   remark: "",
    // });
    const nextIndex = form.getValues("profile.documents")?.length ?? 0;
    setEditingIndex(Math.max(nextIndex, 0));
    setOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    if (editingIndex !== null) {
      const v = form.getValues(`profile.documents.${editingIndex}`);
      const isTagsEmpty =
        !v?.tags ||
        (Array.isArray(v.tags) && v.tags.filter(Boolean).length === 0);
      const blank =
        !v?.type &&
        !v?.fileName &&
        !v?.mimeType &&
        !v?.size &&
        !v?.url &&
        !v?.storageProvider &&
        !v?.checksum &&
        isTagsEmpty &&
        !v?.isPrimary &&
        !v?.version &&
        !v?.expiresAt &&
        !v?.verified &&
        !v?.remark;

      if (blank) removeDm(editingIndex);
    }
    setOpen(false);
    setEditingIndex(null);
  };

  const handleSubmitFromModal = () => {
    if (editingIndex === null) return;

    GlobalModal.info({
      title: "บันทึกเอกสารแนบ",
      description: "คุณต้องการทำรายการ ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังบันทึกข้อมูล...");
        try {
          const current = form.getValues(`profile.documents.${editingIndex}`);

          const tagsArr = Array.isArray(current?.tags)
            ? current.tags
            : current?.tags
              ? String(current.tags)
                  .split(",")
                  .map((s: string) => s.trim())
                  .filter(Boolean)
              : [];

          updateDm(editingIndex, {
            type: current?.type ?? "",
            fileName: current?.fileName ?? "",
            mimeType: current?.mimeType ?? "",
            size:
              current?.size === undefined ||
              current?.size === null ||
              (current as any).size === ""
                ? 0
                : Number(current.size),
            url: current?.url || "",
            storageProvider: current?.storageProvider ?? "",
            checksum: current?.checksum ?? "",
            tags: tagsArr,
            isPrimary: !!current?.isPrimary,
            version:
              current?.version === undefined ||
              current?.version === null ||
              (current as any).version === ""
                ? undefined
                : Number(current.version),
            expiresAt: current?.expiresAt ?? "",
            verified: !!current?.verified,
            remark: current?.remark || "",
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
      title: "ลบเอกสารแนบ",
      description: "คุณต้องการทำรายการ ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังลบข้อมูล...");
        try {
          removeDm(index);
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

  const titleLine = (idx: number) => {
    const v = dmValues?.[idx] as any;
    const type = v?.type && String(v.type).trim();
    const fileName = v?.fileName && String(v.fileName).trim();
    if (fileName) return `ไฟล์: ${fileName}`;
    if (type) return `เอกสาร: ${type}`;
    return `เอกสารแนบ #${idx + 1}`;
  };

  const renderDetails = (idx: number) => {
    const v = (dmValues?.[idx] as any) ?? {};

    // const tagsTxt = Array.isArray(v?.tags)
    //   ? (v.tags as string[]).filter(Boolean).join(", ")
    //   : safeString(v?.tags);

    // const sizeTxt =
    //   v?.size !== undefined && v?.size !== null && safeString(v.size) !== ""
    //     ? `${v.size} ไบต์`
    //     : "";

    const details = [
      { label: "ประเภท", value: v?.type ?? "-" },
      { label: "ประเภทไฟล์", value: v?.mimeType ?? "-" },
      // { label: "ขนาดไฟล์", value: sizeTxt },
      // { label: "ผู้ให้บริการ", value: v?.storageProvider ?? "-" },
      // { label: "Checksum", value: v?.checksum ?? "-" },
      // { label: "แท็ก", value: tagsTxt || "-" },
      // { label: "เอกสารหลัก", value: v?.isPrimary ? "ใช่" : "" },
      // {
      //   label: "เวอร์ชัน",
      //   value:
      //     v?.version !== undefined &&
      //     v?.version !== null &&
      //     safeString(v.version) !== ""
      //       ? safeString(v.version)
      //       : "",
      // },
      // {
      //   label: "วันหมดอายุ",
      //   value: v?.expiresAt ? dayjs(v.expiresAt).format("DD MMMM YYYY") : "-",
      // },
      { label: "ผ่านการตรวจสอบ", value: v?.verified ? "ใช่" : "" },
      { label: "หมายเหตุ", value: v?.remark ?? "-" },
    ].filter((d) => d.value && safeString(d.value).trim().length > 0);

    const showImage = isImageFile(v?.mimeType);
    const imgSrc = showImage ? getImageSrc(v) : "";

    if (!showImage && details.length === 0) return null;

    return (
      <div className="mt-2 space-y-2">
        {showImage && imgSrc && (
          <ImagePreview src={imgSrc} alt={v?.type || v?.mimeType || "image"} />
        )}

        {details.length > 0 && (
          <div className="space-y-1 text-xs text-muted-foreground">
            {details.map((d) => (
              <p
                key={d.label}
                className={d.label === "หมายเหตุ" ? "break-words" : "truncate"}
                title={safeString(d.value)}
              >
                <span className="font-medium">{d.label}:</span>{" "}
                <span>{safeString(d.value)}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    );
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
          <div className="lg:col-span-2 flex flex-col gap-3 mt-5 ">
            <div className="flex items-center justify-between">
              <h1 className="font-bold">เอกสารแนบ</h1>
              <Button
                type="button"
                size="sm"
                onClick={handleOpenCreate}
                aria-label="เพิ่มเอกสารแนบ"
              >
                <PlusIcon />
              </Button>
            </div>

            {dmFields.length === 0 ? (
              <div className="rounded-xl text-sm text-muted-foreground">
                ยังไม่มีเอกสารแนบ กรุณากดปุ่ม “+” เพื่อเพิ่มรายการแรก
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {dmFields.map((row, index) => (
                  <div key={row.id} className=" p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <h4 className="font-semibold truncate">
                          {titleLine(index)}
                        </h4>
                        {renderDetails(index)}
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          type="button"
                          variant="secondary"
                          aria-label={`แก้ไขเอกสารแนบ #${index + 1}`}
                          onClick={() => handleOpenEdit(index)}
                        >
                          แก้ไข
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          aria-label={`ลบเอกสารแนบ #${index + 1}`}
                          onClick={() => handleDelete(index)}
                        >
                          ลบรายการนี้
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      )}

      {editingIndex !== null && (
        <DocumentModal
          open={open}
          title={
            form.getValues(`profile.documents.${editingIndex}.fileName`)
              ? "แก้ไขเอกสารแนบ"
              : "เพิ่มเอกสารแนบ"
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
