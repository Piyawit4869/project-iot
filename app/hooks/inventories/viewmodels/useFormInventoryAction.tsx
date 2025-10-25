import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  useCreateInventory,
  useDeleteInventory,
  useUpdateInventory,
} from "~/api/client/inventories/useInventoryQuery";
import { GlobalModal } from "~/components/shared/modal/modal";
import type { InventoryCreateDTO } from "~/schemas/product/detail/InventorySchema";

export const useFormInventoryAction = (id: string) => {
  const navigate = useNavigate();
  const { mutate } = useCreateInventory();
  const { mutate: updateMutate } = useUpdateInventory(id);
  const { mutate: deleteMutate } = useDeleteInventory();

  const create = (values: InventoryCreateDTO) => {
    GlobalModal.info({
      title: "สร้างคลังสินค้า",
      description: "คุณต้องการสร้างคลังสินค้าใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังสร้างคลังสินค้า...");

        const { id, ...payload } = values;

        mutate(payload, {
          onSuccess: (data) => {
            toast.success("สร้างคลังสินค้าเรียบร้อยแล้ว!", { id: toastId });
            navigate(`/inventory/${data.id}`);
          },
          onError: () => {
            toast.error("กรอกข้อมูลไม่ครบหรือไม่ถูกต้อง", { id: toastId });
          },
        });
      },
    });
  };

  const update = (values: InventoryCreateDTO) => {
    GlobalModal.success({
      title: "บันทึกคลังสินค้า",
      description: "คุณต้องการบันทึกคลังสินค้านี้ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังบันทึกคลังสินค้า...");
        updateMutate(values, {
          onSuccess: () => {
            toast.success("คลังสินค้าบันทึกเรียบร้อยแล้ว!", { id: toastId });
          },
          onError: (error) => {
            console.error("Update inventory error:", error);
            toast.error("เกิดข้อผิดพลาดขณะบันทึกคลังสินค้า", { id: toastId });
          },
        });
      },
    });
  };

  const remove = () => {
    GlobalModal.warning({
      title: "ลบคลังสินค้า",
      description: "คุณต้องการลบคลังสินค้านี้ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังลบคลังสินค้า...");

        deleteMutate(id, {
          onSuccess: () => {
            toast.success("ลบคลังสินค้าบันทึกเรียบร้อยแล้ว!", { id: toastId });
            navigate("/inventory");
          },
          onError: (error) => {
            console.error("Remove inventory error:", error);
            toast.error("เกิดข้อผิดพลาดขณะบันทึกคลังสินค้า", { id: toastId });
          },
        });
      },
    });
  };

  return {
    onSubmit: { create, update, remove },
  };
};
