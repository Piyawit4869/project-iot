import React from "react";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { useParams } from "react-router";
import {
  useGetAllPermission,
  useGetRoles,
  useGrantPermission,
} from "~/api/client/role/useGetRole";
import { Button } from "~/components/ui/button";

export const GrantPermission: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetAllPermission();
  const { data: roles } = useGetRoles(params.id ?? "");
  const { mutate } = useGrantPermission(params.id ?? "");

  const userList = Array.isArray(data) ? data.flat() : [];

  const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([]);
  const [taken, setTaken] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const filteredUsers = userList.filter((u) =>
    `${u?.feature}`.toLowerCase().includes(search.toLowerCase())
  );

  React.useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    const apiIds = roles?.permissions?.map((item: any) => item.id);

    setSelectedUserIds(apiIds);
  }, [data]);

  const toggleUser = (id: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      const addList = filteredUsers
        .filter((u) => !taken.includes(u.id))
        .map((u) => u.id);

      setSelectedUserIds((prev) => Array.from(new Set([...prev, ...addList])));
    } else {
      setSelectedUserIds((prev) =>
        prev.filter(
          (id) => !filteredUsers.some((u) => u.id === id && !taken.includes(id))
        )
      );
    }
  };

  const onSubmit = () => {
    GlobalModal.info({
      title: "เพิ่มpermissionในตำแหน่ง",
      description: "คุณต้องการเพิ่มpermissionในตำแหน่งนี้ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังเพิ่มpermission...");

        const payload = {
          permissionIds: selectedUserIds,
        };

        mutate(payload, {
          onSuccess: () => {
            toast.success("เพิ่มpermissionเรียบร้อยแล้ว!", { id: toastId });
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดขณะเพิ่มpermission", { id: toastId });
          },
        });
      },
    });
  };

  return (
    <>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-bold">
            ตาราง Permission
          </CardTitle>
          <Button type="button" size="sm" onClick={onSubmit}>
            บันทึก
          </Button>
        </div>
      </CardHeader>

      {loading ? (
        <CardContent className="space-y-4">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <CardContent className="space-y-4">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="sticky top-0 bg-sidebar p-2 text-left text-white">
                  ชื่อ
                </th>
                <th className="sticky top-0 bg-sidebar p-2 pr-4 text-center w-8 text-white">
                  <Checkbox
                    checked={
                      filteredUsers.length > 0 &&
                      filteredUsers.every(
                        (u) =>
                          selectedUserIds.includes(u.id) || taken.includes(u.id)
                      )
                    }
                    onCheckedChange={(checked) =>
                      toggleSelectAll(checked === true)
                    }
                  />
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => {
                const disabled = taken.includes(user.id);
                return (
                  <tr
                    key={user.id}
                    className={`border-b ${
                      disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <td className="p-2">{user?.feature}</td>

                    <td className="p-2 pr-4 text-center">
                      <Checkbox
                        checked={selectedUserIds?.includes(user.id)}
                        // disabled={disabled}
                        onCheckedChange={() => toggleUser(user.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      )}
    </>
  );
};
