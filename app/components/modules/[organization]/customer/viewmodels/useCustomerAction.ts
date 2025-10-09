"use client";

import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import {
  useCreateContact,
  useDeleteContact,
  useDeleteCustomer,
  useUpdateContact,
} from "~/api/client/customer/useCustomer";
import { GlobalModal } from "~/components/shared/modal/modal";
import type { ContactValues } from "~/schemas/customer/customer-form";

export const useCustomerAction = () => {
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const id = sp.get("id") ?? "";

  const { mutate: deleted } = useDeleteCustomer();
  const { mutate: createContact } = useCreateContact(id);
  const { mutate: updateContact } = useUpdateContact();
  const { mutate: deletedContact } = useDeleteContact();

  const onDelete = () => {
    GlobalModal.delete({
      title: "ยืนยันการลบข้อมูลลูกค้า",
      description: "คุณต้องการลบข้อมูลลูกค้านี้หรือไม่?",
      confirmText: "ลบ",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังลบข้อมูลลูกค้า...", {
          position: "bottom-right",
        });
        deleted(id, {
          onSuccess: () => {
            toast.success("ลบข้อมูลลูกค้าเรียบร้อยแล้ว !", {
              id: toastId,
              //  description: response.message || "",
              duration: 2500,
              position: "bottom-right",
            });
            navigate(`/organization/customer`);
          },
          onError: () => {
            toast.error("ไม่สามารถลบข้อมูลลูกค้าได้", {
              id: toastId,
              // description: message,
              duration: 3000,
              position: "bottom-right",
            });
          },
        });
      },
    });
  };

  return {
    onDelete,
  };
};
