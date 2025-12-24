"use client";

import { useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "sonner";
import {
  useCreateContact,
  useCreateCustomer,
  useDeleteContact,
  useDeleteCustomer,
  useUpdateContact,
} from "~/api/client/customer/useCustomer";
import { useCreateBranchesOrganization } from "~/api/client/settings";
import { GlobalModal } from "~/components/shared/modal/modal";

import type { ContactValues } from "~/schemas/customer/customer-form";
import type { BranchesOrganization } from "~/schemas/settings";

type DayKey =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

//TO FIX
export function mapOpenDaysToApi(
  openDays: Record<DayKey, { open?: string; close?: string }>
) {
  return (Object.keys(openDays) as DayKey[])
    .filter((day) => openDays[day]?.open && openDays[day]?.close)
    .map((day) => ({
      day: [day],
      open: openDays[day].open!,
      close: openDays[day].close!,
    }));
}

export const useOrganizationAction = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id as string;

  // const { mutate: deleted } = useDeleteCustomer();
  const { mutate: creation, isPending } = useCreateBranchesOrganization();

  // const onDelete = () => {
  //   GlobalModal.delete({
  //     title: "ยืนยันการลบข้อมูลลูกค้า",
  //     description: "คุณต้องการลบข้อมูลลูกค้านี้หรือไม่?",
  //     confirmText: "ลบ",
  //     cancelText: "ยกเลิก",
  //     onConfirm: () => {
  //       const toastId = toast.loading("กำลังลบข้อมูลลูกค้า...", {
  //         position: "bottom-right",
  //       });
  //       deleted(id, {
  //         onSuccess: () => {
  //           toast.success("ลบข้อมูลลูกค้าเรียบร้อยแล้ว !", {
  //             id: toastId,
  //             //  description: response.message || "",
  //             duration: 2500,
  //             position: "bottom-right",
  //           });
  //           navigate(`/customer`);
  //         },
  //         onError: () => {
  //           toast.error("ไม่สามารถลบข้อมูลลูกค้าได้", {
  //             id: toastId,
  //             // description: message,
  //             duration: 3000,
  //             position: "bottom-right",
  //           });
  //         },
  //       });
  //     },
  //   });
  // };

  const onCreate = (values: BranchesOrganization) => {
    const payload = {
      ...values,
      organizationId: id,
      setting: {
        ...values.setting,
        openDays: mapOpenDaysToApi(values.setting.openDays),
      },
      address: {
        ...values.address,
        organizationId: id,
      },
    };

    GlobalModal.info({
      title: "ยืนยันการสร้างสาขาองค์กร",
      description: "คุณต้องการสร้างสาขาองค์กรนี้หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังบันทึกสาขาองค์กร...", {
          position: "bottom-right",
        });
        creation(payload, {
          onSuccess: (data) => {
            toast.success("บันทึกสาขาองค์กรสำเร็จ !", {
              id: toastId,
              duration: 2500,
              position: "bottom-right",
            });
            navigate(`/setting-organization?organizationId=${data.id}`);
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดในการสร้างองค์กร", {
              id: toastId,

              duration: 3000,
              position: "bottom-right",
            });
          },
        });
      },
    });
  };

  return {
    onCreate,
    // onDelete,
  };
};
