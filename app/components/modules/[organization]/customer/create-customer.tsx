"use client";

import { useNavigate } from "react-router";
import { useCustomerViewModel } from "./viewmodels/useCustomerViewModel";

import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { useModalStore } from "~/components/shared/modal/modal-controller";
import { CustomerProvider } from "~/hooks/customer/useCustomerStore";
import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import { Save } from "lucide-react";
import { Form } from "~/components/ui/form";
import { useCreateCustomer } from "~/api/client/customer/useCustomer";
import { CustomerInfoCard } from "./components/customer-info";
import { CustomerDeatailCard } from "./components/customer-detail-card";
import { CustomerTagAndAI } from "./components/customer-tag-ai";
import type { CustomerValues } from "~/schemas/customer/customer-form";

export default function CreateCustomer() {
  const navigate = useNavigate();

  const {
    state: { formCreate, isCreating },
  } = useCustomerViewModel();
  const { mutate: creation, isPending } = useCreateCustomer();
  const phoneContactState = formCreate.getFieldState("contacts.0.phone");
  const nameContactState = formCreate.getFieldState("contacts.0.name");
  const { isDirty } = formCreate.formState;

  const onCreate = (values: CustomerValues) => {
    const payload = Object.assign({}, values);
    const contact = payload?.contacts?.[0];

    if (
      contact &&
      !contact.name &&
      !contact.phone &&
      !contact.position &&
      !contact.department &&
      !contact.email
    ) {
      payload.contacts = [];
    }

    GlobalModal.info({
      title: "ยืนยันการสร้างข้อมูลลูกค้า",
      description: "คุณต้องการสร้างข้อมูลลูกค้านี้หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังบันทึกข้อมูลลูกค้า...", {
          position: "bottom-right",
        });
        creation(payload, {
          onSuccess: (data) => {
            toast.success("บันทึกข้อมูลลูกค้าสำเร็จ !", {
              id: toastId,
              duration: 2500,
              position: "bottom-right",
            });
            navigate(`/organization/customer/${data.id}`);
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดในการสร้างลูกค้า", {
              id: toastId,

              duration: 3000,
              position: "bottom-right",
            });
          },
        });
      },
    });
  };

  const cancelCreate = () => {
    if (!isDirty) {
      navigate("/organization/customer");
    } else {
      GlobalModal.info({
        title: "ยืนยันการออกจากหน้าสร้างลูกค้า",
        description:
          "ข้อมูลที่กรอกไว้ยังไม่ได้ถูกบันทึก หากออกจากหน้านี้ ข้อมูลเหล่านี้จะไม่ถูกบันทึก",
        confirmText: "ยืนยัน",
        cancelText: "ยกเลิก",
        onConfirm: () => {
          navigate("/organization/customer");
        },
        onCancel: () => {
          useModalStore.getState().hide();
        },
      });
    }
  };

  return (
    <CustomerProvider>
      <div className="flex flex-col space-y-3 p-4    ">
        <TabControl
          title="สร้างลูกค้า"
          backpath={() => cancelCreate()}
          buttons={[
            <>
              <GlobalButton
                label={
                  <>
                    <Save /> บันทึก
                  </>
                }
                type="submit"
                loading={isCreating}
                disabled={
                  isPending ||
                  phoneContactState.invalid ||
                  nameContactState.invalid
                }
                form="customer"
              />
            </>,
          ]}
        />
        <Form {...formCreate}>
          <form id="customer" onSubmit={formCreate.handleSubmit(onCreate)}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2 md:order-1">
                <CustomerInfoCard form={formCreate} />
              </div>
              <div className="w-full md:w-1/2 md:order-2 flex flex-col ">
                <CustomerDeatailCard form={formCreate} />
                <CustomerTagAndAI form={formCreate} />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </CustomerProvider>
  );
}
