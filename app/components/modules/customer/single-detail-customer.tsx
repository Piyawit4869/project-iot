"use client";

import { Link, Save, X } from "lucide-react";

import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useCustomerViewModel } from "./viewmodels/useCustomerViewModel";
import { useGetAllUsers } from "~/api/client/customer/useGetUsers";
import {
  useGetAiNote,
  useUpdateCustomer,
} from "~/api/client/customer/useCustomer";
import type { CustomerValues } from "~/schemas/customer/customer-form";
import { GlobalModal } from "~/components/shared/modal/modal";
import { useModalStore } from "~/components/shared/modal/modal-controller";
import { CustomerProvider } from "~/hooks/customer/useCustomerStore";
import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import { Form } from "~/components/ui/form";
import { Card, CardContent } from "~/components/ui/card";
import { DataTable } from "~/components/shared/data-table";
import { useEntityBreadcrumb } from "~/providers/RouteProvider";
import { useOrdersPaginateFilter } from "~/api/client/order/useGetOrder";
import { FormCustomerDetailCard } from "./components/form/customer-detail-form";
import { FormCustomerInfoCard } from "./components/form/customer-info-form";
import { FormCustomerContact } from "./components/form/customer-contact-form";
import { ViewCustomerDeatailCard } from "./components/view/customer-detail-view";
import { ViewCustomerInfoCard } from "./components/view/customer-info-view";
import { ViewCustomerContact } from "./components/view/customer-contact";
import { RelationshipCard } from "./components/relationship";
import { ViewCustomerActivityLog } from "./components/customer-activityLog";

export default function SingDetailleCustomer() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id as string;

  const {
    state: { customer, loadCustomer, formUpdate, isUpdating },
  } = useCustomerViewModel();

  const { isLoading } = useGetAllUsers();
  const { data: getData, isLoading: isLoadingAiNote } = useGetAiNote(id);
  const { mutate: update, isPending } = useUpdateCustomer(id);
  const [isEdit, setIsEdit] = React.useState(false);
  const [AIOpen, setAIOpen] = React.useState(false);

  const dataFromAI = getData?.customerData;

  const data = customer?.profile;
  const otherName = data?.name;
  const lineName = data?.lineName;
  const fullName = [data?.firstName, data?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const phoneContactState = formUpdate.getFieldState("contacts.0.phone");
  const nameContactState = formUpdate.getFieldState("contacts.0.name");
  const { isDirty } = formUpdate.formState;

  useEntityBreadcrumb({
    feature: "customer",
    entity: customer
      ? {
          id: id,
          name: fullName || lineName || otherName,
        }
      : undefined,
    base: customer && {
      href: `/customers/${id}`,
      label: fullName || lineName || otherName,
      uuid: id,
    },
  });

  const onUpdate = (values: CustomerValues) => {
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
      title: "ยืนยันการแก้ไขข้อมูลลูกค้า",
      description: "คุณต้องการแก้ไขข้อมูลลูกค้านี้หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังบันทึกข้อมูลลูกค้า...", {
          position: "bottom-right",
        });
        update(payload, {
          onSuccess: (data) => {
            if (data?.error) {
              toast.error("เกิดข้อผิดพลาด: " + data.error, { id: toastId });
              return;
            }
            toast.success("แก้ไขข้อมูลลูกค้าสำเร็จ !", { id: toastId });
            setIsEdit(false);
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดในการแก้ไข", { id: toastId });
          },
        });
      },
    });
  };

  const onSync = () => {
    const status = formUpdate.getValues("status");
    const oldValues = formUpdate.getValues();

    const baseValues = (oldValues as any).value ?? oldValues;

    const payload = {
      ...baseValues,
      id,
      contacts: [
        {
          name: dataFromAI.customerName || baseValues.contacts?.[0]?.name || "",
          email: dataFromAI.email || baseValues.contacts?.[0]?.email || "",
          phone:
            dataFromAI.contactNumber || baseValues.contacts?.[0]?.phone || "",
        },
      ],
      status: status || "newly_registered",
      profile: {
        ...baseValues.profile,
        taxId: dataFromAI.taxId || baseValues.profile?.taxId || "",
      },
      consentPii: dataFromAI.consentPii ?? baseValues.consentPii,
      remark: dataFromAI.summary || baseValues.remark,
    };

    GlobalModal.info({
      title: "ยืนยันการ Sync ข้อมูลจาก AI ",
      description: "คุณต้องการ Sync ข้อมูลจาก AI หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลัง Sync ข้อมูลลูกค้าจาก AI ...", {
          position: "bottom-right",
        });
        update(payload, {
          onSuccess: (data) => {
            if (data?.error) {
              toast.error("เกิดข้อผิดพลาด: " + data.error, { id: toastId });
              return;
            }

            const baseCustomer = data?.value ?? data;
            formUpdate.reset(baseCustomer);

            toast.success("Sync ข้อมูลสำเร็จ !", { id: toastId });
            setAIOpen(false);
            setIsEdit(false);
          },
        });
      },
    });
  };

  const cancelEdit = () => {
    GlobalModal.warning({
      title: "ยืนยันการออกจากหน้าแก้ไขลูกค้า",
      description:
        "ข้อมูลที่กรอกไว้ยังไม่ได้ถูกบันทึก หากออกจากหน้านี้ ข้อมูลเหล่านี้จะไม่ถูกบันทึก",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        navigate("/customer");
      },
      onCancel: () => {
        useModalStore.getState().hide();
      },
    });
  };

  const handleCancel = () => {
    if (!isDirty) {
      setIsEdit(false);
    } else {
      GlobalModal.warning({
        title: "ยืนยันการออกจากหน้าแก้ไขลูกค้า",
        description:
          "ข้อมูลที่กรอกไว้ยังไม่ได้ถูกบันทึก หากออกจากหน้านี้ ข้อมูลเหล่านี้จะไม่ถูกบันทึก",
        confirmText: "ยืนยัน",
        cancelText: "ยกเลิก",
        onConfirm: () => {
          setIsEdit(false);
        },
        onCancel: () => {
          useModalStore.getState().hide();
        },
      });
    }
  };

  const handleBack = () => {
    if (isEdit) {
      cancelEdit();
    } else {
      navigate("/customer");
    }
  };

  return (
    <>
      <CustomerProvider>
        <div className="flex flex-col space-y-3 p-8 ">
          <TabControl
            backpath={() => handleBack()}
            title={
              isEdit
                ? `แก้ไขลูกค้า ${fullName || otherName || ""}`
                : `ลูกค้า ${fullName || otherName || ""}`
            }
            buttons={[
              isEdit ? (
                <div className="w-full flex flex-row flex-wrap gap-2">
                  <GlobalButton
                    key="sync-ai"
                    type="button"
                    onClick={() => setAIOpen(true)}
                    // disabled={isLoading || dataFromAI === null}
                    variant="secondary"
                    className="flex-1  bg-[#2e498d] text-white hover:bg-[#142a60] hover:text-white px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
                    icon={<Link />}
                    label={
                      <span className="hidden sm:inline">Sync ข้อมูล AI</span>
                    }
                  />

                  <GlobalButton
                    key="cancel-btn"
                    type="button"
                    onClick={handleCancel}
                    variant="secondary"
                    className="flex-1 bg-[#EF4343] text-white hover:bg-[#d73232] flex items-center gap-1 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
                    icon={<X />}
                    label={<span className="hidden sm:inline">ยกเลิก</span>}
                  />

                  <GlobalButton
                    key="save"
                    type="submit"
                    form="customer"
                    loading={isUpdating}
                    disabled={
                      isLoading ||
                      isPending ||
                      phoneContactState.invalid ||
                      nameContactState.invalid
                    }
                    className="flex-1  flex items-center gap-1 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
                    icon={<Save />}
                    label={<span className="hidden sm:inline">บันทึก</span>}
                  />
                </div>
              ) : (
                <GlobalButton
                  label="แก้ไข"
                  key="update-button"
                  type="button"
                  onClick={() => setIsEdit(true)}
                />
              ),
            ]}
          />

          <Form {...formUpdate}>
            <form id="customer" onSubmit={formUpdate.handleSubmit(onUpdate)}>
              <div className="flex w-full gap-3 flex-col md:flex-row">
                <div className="flex-1 flex flex-col gap-3 transition-all">
                  {isEdit ? (
                    <>
                      <FormCustomerDetailCard
                        customer={customer}
                        form={formUpdate}
                        loading={loadCustomer}
                      />
                      <FormCustomerInfoCard
                        customer={customer}
                        form={formUpdate}
                        loading={loadCustomer}
                        dataFromAI={dataFromAI || []}
                      />
                      <FormCustomerContact
                        customer={customer}
                        form={formUpdate}
                        loading={loadCustomer}
                      />
                    </>
                  ) : (
                    <>
                      <ViewCustomerDeatailCard
                        customer={customer}
                        form={formUpdate}
                        loading={loadCustomer}
                      />
                      <ViewCustomerInfoCard
                        customer={customer}
                        form={formUpdate}
                        loading={loadCustomer}
                      />
                      <ViewCustomerContact
                        customer={customer}
                        form={formUpdate}
                        loading={loadCustomer}
                      />
                    </>
                  )}
                </div>

                <div className="flex-1 flex flex-col gap-3 transition-all h-full">
                  <RelationshipCard
                    form={formUpdate}
                    customer={customer}
                    loading={loadCustomer}
                    isEdit={isEdit}
                    users={[]}
                  />
                  <ViewCustomerActivityLog loading={loadCustomer} />
                </div>
              </div>
            </form>
          </Form>

          <Card>
            <div className="flex gap-2 mt-5 mx-6">
              <span className="text-base font-bold pb-4">
                ออเดอร์ที่เคยสั่งซื้อ
              </span>
            </div>
            <CardContent>
              {/* <DataTable
                offSearch
                offFilter
                queryFunction={({ pageIndex, pageSize }) =>
                  ordersPaginateFilter({ pageIndex, pageSize, customerId: id })
                }
                columns={columnsOrders}
              /> */}
            </CardContent>
          </Card>
        </div>
      </CustomerProvider>

      {/* <AIMessageView
        open={AIOpen}
        onOpenChange={setAIOpen}
        data={getData}
        onClickBtn={onSync}
        isLoading={isLoadingAiNote}
      /> */}
    </>
  );
}
