import { GlobalModal } from "~/components/shared/modal/modal";

import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { useEntityBreadcrumb } from "~/providers/RouteProvider";
import type { ProductCreateDTO } from "~/schemas/product/product";
import { useGetProducts } from "~/api/client/products/useGetProducts";
import {
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "~/api/client/product/useProductQuery";

export const useFormProductAction = (id: string) => {
  const navigate = useNavigate();
  const { mutate } = useCreateProduct();
  const { mutate: updateMutate } = useUpdateProduct(id);
  const { mutate: deleteMutate } = useDeleteProduct();
  const params = useParams<{ id: string }>();
  const { data } = useGetProducts(params.id ?? "");

  useEntityBreadcrumb({
    feature: "products",
    entity: data ? { id: data.id, name: data?.name ?? data.id } : undefined,
    base: data && {
      href: `/products/${data?.id}`,
      label: data?.name,
      uuid: data?.id,
    },
  });

  const create = (values: ProductCreateDTO) => {
    GlobalModal.info({
      title: "สร้างสินค้า",
      description: "คุณต้องการสร้างสินค้าใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังสร้างสินค้า...");

        mutate(values, {
          onSuccess: ({}) => {
            toast.success("สร้างสินค้าเรียบร้อยแล้ว!", { id: toastId });
            // router.push(`/organization/inventory/${id}`);
            navigate(`/products/`);
          },
          onError: () => {
            toast.error("กรอกข้อมูลไม่ครบหรือไม่ถูกต้อง", { id: toastId });
          },
        });
      },
    });
  };

  const update = (values: ProductCreateDTO) => {
    GlobalModal.success({
      title: "บันทึกสินค้า",
      description: "คุณต้องการบันทึกสินค้านี้ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังบันทึกสินค้า...");
        updateMutate(values, {
          onSuccess: () => {
            toast.success("สินค้าบันทึกเรียบร้อยแล้ว!", { id: toastId });
          },
          onError: (error) => {
            console.error("Update inventory error:", error);
            toast.error("เกิดข้อผิดพลาดขณะบันทึกสินค้า", { id: toastId });
          },
        });
      },
    });
  };

  const remove = () => {
    GlobalModal.warning({
      title: "ลบสินค้า",
      description: "คุณต้องการลบสินค้านี้ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังลบสินค้า...");

        deleteMutate(id, {
          onSuccess: () => {
            toast.success("ลบสินค้าบันทึกเรียบร้อยแล้ว!", { id: toastId });
            navigate("/inventory");
          },
          onError: (error) => {
            console.error("Remove inventory error:", error);
            toast.error("เกิดข้อผิดพลาดขณะบันทึกสินค้า", { id: toastId });
          },
        });
      },
    });
  };

  return {
    onSubmit: { create, update, remove },
  };
};
