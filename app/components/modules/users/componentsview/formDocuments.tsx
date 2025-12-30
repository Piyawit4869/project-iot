import React from "react";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { File } from "lucide-react";
import type { UsersFormValues } from "~/schemas/users/user";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { InfoRow } from "~/components/shared/InfoRow";
import { fileTypeMap } from "~/initData/user-initData";

// ---------- Types ----------
type DocumentItem = UsersFormValues["profile"]["documents"][number];

export interface UserDocumentsViewProps {
  data?: Partial<UsersFormValues>;
  loading?: boolean;
  showActions?: boolean;
  onAddClick?: () => void;
  onRemoveClick?: (index: number) => void;
}

const isImage = (mime?: string) => !!mime && mime.startsWith("image/");

export const UserDocuments: React.FC<UserDocumentsViewProps> = ({
  data,
  loading = false,
  showActions = false,
  onAddClick,
  onRemoveClick,
}) => {
  const docs: ReadonlyArray<Partial<DocumentItem>> =
    data?.profile?.documents ?? [];

  return (
    <>
      <div className="flex gap-2 items-center px-4">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <File className="h-5 w-5" />
          เอกสารแนบ
        </CardTitle>
      </div>

      {loading ? (
        <CardContent className="space-y-4 ">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <CardContent className="p-0 space-y-4">
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex items-center justify-between">
              {showActions && (
                <Button type="button" onClick={onAddClick}>
                  +
                </Button>
              )}
            </div>

            {docs.length === 0 ? (
              <div className="rounded-xl text-sm text-muted-foreground">
                ยังไม่มีเอกสารแนบ
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {docs.map((row, index) => {
                  const preview =
                    row.url && isImage(row.mimeType) ? (
                      <a href={row.url} target="_blank" rel="noreferrer">
                        {/* ตัวอย่างรูปเล็ก */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={row.url}
                          alt={row.fileName ?? `doc-${index + 1}`}
                          className="h-28 w-28 object-cover rounded-md border"
                        />
                      </a>
                    ) : row.url ? (
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline break-all"
                      >
                        เปิดไฟล์
                      </a>
                    ) : (
                      "-"
                    );
                  return (
                    <div key={index} className="rounded-xl space-y-4">
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold mb-3">
                            เอกสารแนบ {index + 1}
                          </h4>
                          {showActions && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => onRemoveClick?.(index)}
                            >
                              ลบรายการนี้
                            </Button>
                          )}
                        </div>
                        <div className="flex mb-4">
                          <InfoRow
                            label="ไฟล์"
                            value={
                              <span className="block max-w-[300px] truncate text-sm text-gray-700">
                                {preview}
                              </span>
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InfoRow
                            label="ประเภทเอกสาร"
                            value={
                              fileTypeMap[row.type as any] ?? row.type ?? "-"
                            }
                          />
                          <InfoRow label="ชื่อไฟล์" value={row.fileName} />
                          {/* <InfoRow
                            label="แท็กกำกับไฟล์"
                            value={
                              Array.isArray(row.tags) && row.tags.length > 0
                                ? row.tags.join(", ")
                                : "-"
                            }
                          /> */}
                          {/* <InfoRow
                            label="เป็นเอกสารหลักหรือไม่"
                            value={row.isPrimary ? "ใช่" : "ไม่ใช่"}
                          />
                          <InfoRow label="เวอร์ชันไฟล์" value={row.version} />
                          <InfoRow
                            label="วันหมดอายุ"
                            value={row.expiresAt}
                            format={(v) =>
                              v ? dayjs(v).format("DD MMMM YYYY") : "-"
                            }
                          /> */}
                          <InfoRow
                            label="ผ่านการตรวจสอบหรือไม่"
                            value={row.verified ? "ผ่าน" : "ยังไม่ผ่าน"}
                          />

                          <InfoRow
                            label="ประเภทไฟล์ (MIME)"
                            value={row.mimeType}
                          />
                          {/* <InfoRow label="ขนาดไฟล์ (ไบต์)" value={row.size} /> */}

                          {/* <InfoRow
                          label="ผู้ให้บริการจัดเก็บ"
                          value={row.storageProvider}
                        />

                        <InfoRow
                          label="รหัสตรวจสอบไฟล์ (Checksum)"
                          value={row.checksum}
                        /> */}

                          {/* <InfoRow
                            className="md:col-span-2"
                            label="หมายเหตุ"
                            value={
                              row.remark && row.remark.trim() ? row.remark : "-"
                            }
                          /> */}
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
    </>
  );
};
