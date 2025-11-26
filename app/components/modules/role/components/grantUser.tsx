import React from "react";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import ModalUser from "../../permission/components/modal-select-user";
import type { RolesFormValues } from "~/schemas/roles/roles";
import { useGetAllUsers } from "~/api/client/user";
import { useGetRoles, useGrantUsers } from "~/api/client/role/useGetRole";
import { useParams, useNavigate } from "react-router";
import { DataTable } from "~/components/shared/data-table";
import { useUserColumns } from "../component/columns";
import type { RolesFormProps } from "./fromSingle";
import { useQueryClient } from "@tanstack/react-query";

export const GrantUser: React.FC<RolesFormProps> = ({
  form,
  loading = false,
}) => {
  const params = useParams<{ id: string }>();
  const roleId = params.id ?? "";

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: userData } = useGetAllUsers();

  const allUsers = React.useMemo(
    () => (Array.isArray(userData) ? userData : []),
    [userData]
  );

  const userMap = React.useMemo(() => {
    return new Map(allUsers.map((u: any) => [u.id, u]));
  }, [allUsers]);
  const { data: roles, isLoading } = useGetRoles(roleId);
  const { mutate } = useGrantUsers(roleId);

  const [open, setOpen] = React.useState(false);
  const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([]);

  const users = React.useMemo(
    () => (Array.isArray(userData) ? userData : []),
    [userData]
  );

  const takenUserIds = React.useMemo(() => {
    const list = Array.isArray(roles?.users) ? roles!.users : [];
    return list
      .map((u: any) => u?.id)
      .filter(
        (id: any): id is string => typeof id === "string" && id.length > 0
      );
  }, [roles?.users]);

  const displayUsers = React.useMemo(() => {
    return users.filter((u: any) => !takenUserIds.includes(u?.id));
  }, [users, takenUserIds]);

  const handleRemoveUser = (userId: string) => {
    GlobalModal.info({
      title: "ลบพนักงานออกจากตำแหน่ง",
      description: "คุณต้องการลบพนักงานคนนี้ออกจากตำแหน่งใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังลบพนักงาน...");

        const remainingIds = takenUserIds.filter((id: string) => id !== userId);

        mutate(
          { userIds: remainingIds },
          {
            onSuccess: () => {
              toast.success("ลบพนักงานเรียบร้อยแล้ว!", { id: toastId });
              queryClient.invalidateQueries({ queryKey: ["roles", roleId] });
            },
            onError: () => {
              toast.error("เกิดข้อผิดพลาดขณะลบพนักงาน", { id: toastId });
            },
          }
        );
      },
    });
  };

  const columns = useUserColumns({
    onView: (userId) => navigate(`/users/${userId}`),
    onRemove: handleRemoveUser,
  });

  const handleCloseModal = () => setOpen(false);
  const handleOpenModal = () => setOpen(true);

  const onSubmit = (_values: RolesFormValues) => {
    GlobalModal.info({
      title: "เพิ่มพนักงานในตำแหน่ง",
      description: "คุณต้องการเพิ่มพนักงานในตำแหน่งนี้ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังเพิ่มพนักงาน...");

        const payload = {
          userIds: Array.from(new Set([...takenUserIds, ...selectedUserIds])),
        };

        mutate(payload, {
          onSuccess: () => {
            toast.success("เพิ่มพนักงานเรียบร้อยแล้ว!", { id: toastId });
            setOpen(false);
            queryClient.invalidateQueries({ queryKey: ["roles", roleId] });
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดขณะเพิ่มพนักงาน", { id: toastId });
          },
        });
      },
    });
  };

  return (
    <>
      <CardHeader>
        <div className="flex gap-2 justify-between">
          <CardTitle className="text-base font-bold">
            ตารางพนักงานที่อยู่ในตำแหน่ง
          </CardTitle>

          <Button type="button" size="sm" onClick={handleOpenModal}>
            เพิ่มพนักงาน
          </Button>
        </div>
      </CardHeader>

      {loading ? (
        <CardContent className="space-y-4 ">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <CardContent className="space-y-4">
          <DataTable
            data={roles?.users ?? []}
            columns={columns}
            isCustomLoading={isLoading}
          />

          <ModalUser
            open={open}
            onClose={handleCloseModal}
            users={displayUsers}
            value={selectedUserIds}
            onChange={setSelectedUserIds}
            onSubmit={() => onSubmit(form.getValues())}
          />
        </CardContent>
      )}
    </>
  );
};
