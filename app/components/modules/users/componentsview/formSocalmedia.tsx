import React from "react";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";

import { Share2 } from "lucide-react";
import type { UsersFormValues } from "~/schemas/users/user";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { InfoRow } from "~/components/shared/InfoRow";

type SocialItem = UsersFormValues["profile"]["socialMedia"][number];

export interface UserSocialMediasViewProps {
  data?: Partial<UsersFormValues>;
  loading?: boolean;
  showActions?: boolean;
  onAddClick?: () => void;
  onRemoveClick?: (index: number) => void;
}

const toLink = (url?: string) =>
  url?.startsWith("http://") || url?.startsWith("https://")
    ? url
    : url
      ? `https://${url}`
      : undefined;

export const UserSocalmedias: React.FC<UserSocialMediasViewProps> = ({
  data,
  loading = false,
  showActions = false,
  onAddClick,
  onRemoveClick,
}) => {
  const social: ReadonlyArray<Partial<SocialItem>> =
    data?.profile?.socialMedia ?? [];

  return (
    <>
      <CardHeader>
        <div className="flex gap-2 items-center">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            โซเชียลมีเดีย
          </CardTitle>
        </div>
      </CardHeader>
      {loading ? (
        <CardContent className="space-y-4">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <CardContent className="space-y-4">
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex items-center justify-between">
              {showActions && (
                <Button type="button" onClick={onAddClick}>
                  +
                </Button>
              )}
            </div>

            {social.length === 0 ? (
              <div className="rounded-xl text-sm text-muted-foreground">
                ยังไม่มีโซเชียลมีเดีย
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {social.map((row, index) => {
                  const href = toLink(row?.url ?? "-");

                  return (
                    <div key={index} className="rounded-xl space-y-4">
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">
                            โซเชียลมีเดีย {index + 1}
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
                        <InfoRow
                          label="ลิงก์ URL"
                          value={
                            href ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="underline underline-offset-2 break-all"
                              >
                                {href}
                              </a>
                            ) : (
                              "-"
                            )
                          }
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <InfoRow
                            label="แพลตฟอร์ม"
                            value={row?.platform ?? "-"}
                          />
                          <InfoRow
                            label="ชื่อบัญชี"
                            value={row?.username ?? "-"}
                          />

                          <InfoRow
                            label="เป็นบัญชีหลักหรือไม่"
                            value={row?.isPrimary ?? "ไม่ใช่"}
                          />

                          <InfoRow
                            className="md:col-span-2"
                            label="รายละเอียดเพิ่มเติม"
                            value={
                              row.description && row.description.trim()
                                ? row.description
                                : "-"
                            }
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
    </>
  );
};
