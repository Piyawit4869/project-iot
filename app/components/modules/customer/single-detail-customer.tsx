import {
  Activity,
  Bot,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Link,
  Save,
  User,
  X,
} from "lucide-react";

import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useCustomerViewModel } from "./viewmodels/useCustomerViewModel";
import { useGetAllUsers } from "~/api/client/customer/useGetUsers";
import {
  useGetAiNote,
  useGetAnalyzeCustomer,
  useUpdateCustomer,
} from "~/api/client/customer/useCustomer";
import type { CustomerValues } from "~/schemas/customer/customer-form";
import { GlobalModal } from "~/components/shared/modal/modal";
import { useModalStore } from "~/components/shared/modal/modal-controller";
import { CustomerProvider } from "~/hooks/customer/useCustomerStore";
import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import { Form } from "~/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { DataTable } from "~/components/shared/data-table";
import { useEntityBreadcrumb } from "~/providers/RouteProvider";
import { useOrdersPaginateFilter } from "~/api/client/order/useGetOrder";

import { AIMessageView } from "../message/ai-message-view-modal";
import { useOrderColumns } from "../order/components/columns";
import { AiGetDataFromChat } from "./components/ai-getdata-from-chat";
import { CustomTabs } from "~/components/shared/custom-tabs";

import { OrderFilterFields } from "~/schemas/order/type";

import { DashboardTabContent } from "./contents-tabs/dashboard-tab-content";
import { CustomerDetailTabContent } from "./contents-tabs/customer-detail-tab-content";
import { NoteTabContent } from "./contents-tabs/note-tab-content";

export default function SingDetailleCustomer() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id as string;

  const {
    state: { customer, loadCustomer, formUpdate, isUpdating, fetchCustomer },
  } = useCustomerViewModel();

  const { isLoading } = useGetAllUsers();
  const { data: getData } = useGetAiNote(id);
  const dataFromAI = getData?.customerData;
  const columns = useOrderColumns();
  const { mutate: update, isPending } = useUpdateCustomer(id);
  const { data: analyzeCustomer, isLoading: loadAnalyzeCustomer } =
    useGetAnalyzeCustomer(id);

  const {
    state: {
      customerNote,
      fetchCustomerNote,
      customerAISetting,
      fetchCustomercAISetting,
    },
  } = useCustomerViewModel();

  const [isEdit, setIsEdit] = React.useState(false);
  const [AIOpen, setAIOpen] = React.useState(false);
  const [customerForms, setCustomerForms] = useState([
    { key: "contact_detail", mode: "view" },
    { key: "customer_detail", mode: "view" },
    { key: "organization_detail", mode: "view" },
  ]);
  const [tab, setTab] = React.useState("dashboard");

  const data = customer?.profile;
  const otherName = data?.name;
  const lineName = data?.lineName;

  const fullName = [data?.firstName, data?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const { isDirty } = formUpdate.formState;

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
            fetchCustomer();

            setCustomerForms((prev) =>
              prev.map((f) => ({ ...f, mode: "view" }))
            );

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
          name:
            dataFromAI?.customerName || baseValues?.contacts?.[0]?.name || "",
          email: dataFromAI?.email || baseValues?.contacts?.[0]?.email || "",
          phone:
            dataFromAI?.contactNumber || baseValues?.contacts?.[0]?.phone || "",
        },
      ],
      status: status || "newly_registered",
      profile: {
        ...baseValues?.profile,
        taxId: dataFromAI?.taxId || baseValues?.profile?.taxId || "",
      },
      consentPii: dataFromAI?.consentPii ?? baseValues?.consentPii,
      remark: dataFromAI?.summary || baseValues?.remark,
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

  const handleCloseForm = (key: string) => {
    setCustomerForms((prev) => {
      return prev.map((form) => {
        if (form.key === key) {
          return { ...form, mode: "view" };
        }
        return form;
      });
    });
  };

  const handleEditForm = (key: string) => {
    setCustomerForms((prev) => {
      return prev.map((form) => {
        if (form.key === key) {
          return { ...form, mode: "edit" };
        }
        return form;
      });
    });
  };

  const handleCancel = (key: string) => {
    if (!isDirty) {
      handleCloseForm(key);
      formUpdate.reset();
    } else {
      GlobalModal.warning({
        title: "ยืนยันการออกจากหน้าแก้ไขลูกค้า",
        description:
          "ข้อมูลที่กรอกไว้ยังไม่ได้ถูกบันทึก หากออกจากหน้านี้ ข้อมูลเหล่านี้จะไม่ถูกบันทึก",
        confirmText: "ยืนยัน",
        cancelText: "ยกเลิก",
        onConfirm: () => {
          handleCloseForm(key);
          formUpdate.reset();
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
              <div className="w-full flex flex-row flex-wrap gap-2">
                <GlobalButton
                  key="sync-ai"
                  type="button"
                  onClick={() => {
                    setAIOpen(true);
                  }}
                  // disabled={isLoading || dataFromAI === null}
                  variant="secondary"
                  className="flex-1  bg-[#2e498d] text-white hover:bg-[#142a60] hover:text-white px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
                  icon={<Link />}
                  label={
                    <span className="hidden sm:inline">Sync ข้อมูล AI</span>
                  }
                />
              </div>,
            ]}
          />

          <Form {...formUpdate}>
            <CustomTabs
              defaultValue="dashboard"
              value={tab}
              onValueChange={(val) => setTab(val)}
              items={[
                {
                  key: "dashboard",
                  label: "แดชบอร์ด (สรุป) ",
                  icon: <LayoutDashboard className="w-4 h-4" />,
                  content: (
                    <DashboardTabContent
                      isLoading={isLoading}
                      customer={customer}
                      formUpdate={formUpdate}
                      loadCustomer={loadCustomer}
                      onUpdate={onUpdate}
                      isPending={isPending}
                      handleCancel={handleCancel}
                      handleEditForm={handleEditForm}
                      columns={columns}
                      id={id}
                      customerForms={customerForms}
                      analyzeCustomer={analyzeCustomer}
                      loadAnalyzeCustomer={loadAnalyzeCustomer}
                      setTab={setTab}
                      fetchCustomer={fetchCustomer}
                    />
                  ),
                },
                {
                  key: "customerDetail",
                  label: "ข้อมูลลูกค้า",
                  icon: <User className="w-4 h-4" />,
                  content: (
                    <CustomerDetailTabContent
                      customer={customer}
                      formUpdate={formUpdate}
                      loadCustomer={loadCustomer}
                      onUpdate={onUpdate}
                      isLoading={isLoading}
                      isPending={isPending}
                      customerForms={customerForms}
                      handleCancel={handleCancel}
                      handleEditForm={handleEditForm}
                    />
                  ),
                },
                {
                  key: "dataFromAI",
                  label: "ข้อมูลจาก AI",
                  icon: <Bot className="w-4 h-4" />,
                  content: (
                    <>
                      <AiGetDataFromChat data={dataFromAI} />
                    </>
                  ),
                },
                {
                  key: "order",
                  label: "ออเดอร์ที่เคยสั่งซื้อ",
                  icon: <FileText className="w-4 h-4" />,
                  content: (
                    <>
                      <DataTable
                        queryFunction={({ pageIndex, pageSize }) =>
                          useOrdersPaginateFilter({
                            pageIndex,
                            pageSize,
                            customerId: id,
                          })
                        }
                        columns={columns}
                        customerFilterFields={OrderFilterFields}
                        showAdvancedButton={false}
                      />
                    </>
                  ),
                },
                {
                  key: "note",
                  label: "โน๊ต/กิจกรรม",
                  icon: <Activity className="w-4 h-4" />,
                  content: (
                    <NoteTabContent
                      isLoading={isLoading}
                      customer={customer}
                      formUpdate={formUpdate}
                      onUpdate={onUpdate}
                      fetchCustomerNote={fetchCustomerNote}
                      customerNote={customerNote}
                      isEdit={isEdit}
                      setIsEdit={setIsEdit}
                    />
                  ),
                },
              ]}
            />
          </Form>
        </div>
      </CustomerProvider>

      <div className="flex flex-col space-y-2 overflow-y-auto">
        <AIMessageView
          open={AIOpen}
          onOpenChange={setAIOpen}
          customer={dataFromAI}
          closeBtn={true}
          onClickBtn={onSync}
        />
      </div>
    </>
  );
}
