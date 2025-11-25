import React from "react";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { type UseFormReturn } from "react-hook-form";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import ModalUser from "../../permission/components/modal-select-user";
import type { RolesFormValues } from "~/schemas/roles/roles";
import { useGetAllUsers } from "~/api/client/user";
import { useGetRoles, useGrantUsers } from "~/api/client/role/useGetRole";
import { useParams } from "react-router";
import { DataTable } from "~/components/shared/data-table";
import { useUserColumns } from "../component/columns";
export interface RolesFormProps {
  form: UseFormReturn<RolesFormValues>;
  data?: Partial<RolesFormValues>;
  loading?: boolean;
}

export const GrantUser: React.FC<RolesFormProps> = ({
  form,
  loading = false,
}) => {
  const params = useParams<{ id: string }>();
  const columns = useUserColumns();
  const { data: user } = useGetAllUsers();
  const { data: roles, isLoading } = useGetRoles(params.id ?? "");
  const { mutate } = useGrantUsers(params.id ?? "");
  const [open, setOpen] = React.useState(false);
  const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([]);

  console.log("roles", roles?.users);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const onSubmit = (values: RolesFormValues) => {
    GlobalModal.info({
      title: "เพิ่มพนักงานในตำแหน่ง",
      description: "คุณต้องการเพิ่มพนักงานในตำแหน่งนี้ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังเพิ่มพนักงาน...");
        const payload = {
          userIds: selectedUserIds,
        };
        mutate(payload, {
          onSuccess: () => {
            toast.success("เพิ่มพนักงานเรียบร้อยแล้ว!", { id: toastId });
            setOpen(false);
          },
          onError: (err) => {
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
            // queryFunction={(res) =>
            //   paginate({
            //     pageIndex: res.pageIndex,
            //     status: status === "all" ? "" : status,
            //     limit: res.pageSize,
            //     ...filters,
            //     createdFrom,
            //     createdTo,
            //     updatedFrom,
            //     updatedTo,
            //   } as any)
            // }
            data={roles?.users ?? []}
            columns={columns}
            isCustomLoading={isLoading}
          />
          {/* {editingIndex !== null && ( */}
          <ModalUser
            open={open}
            onClose={handleCloseModal}
            users={[user]}
            value={selectedUserIds}
            onChange={setSelectedUserIds}
            onSubmit={() => onSubmit(form.getValues())}
          />
          {/* )} */}
        </CardContent>
      )}
    </>
  );
};
