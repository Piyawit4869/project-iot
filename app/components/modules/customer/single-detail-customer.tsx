"use client";

import {
  Bot,
  FileText,
  LayoutDashboard,
  Link,
  Save,
  User,
  X,
} from "lucide-react";

import React from "react";
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

import { RelationshipCard } from "./components/relationship";
import { ViewCustomerActivityLog } from "./components/customer-activityLog";
import { AIMessageView } from "../message/ai-message-view-modal";
import { useOrderColumns } from "../order/components/columns";
import { AiGetDataFromChat } from "./components/ai-getdata-from-chat";
import { CustomTabs } from "~/components/shared/custom-tabs";
import { NotesCard } from "./components/cardZone/NoteCard";
import { PieChart } from "~/components/shared/charts/pie-chart";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { RemarkCard } from "./components/cardZone/RemarkCard";
import { Button } from "~/components/ui/button";
import { OrderFilterFields } from "~/schemas/order/type";
import { AiCustomerFields } from "../message/AiCustomerFields";
import { CustomerDeail } from "./components/form-view/customer-deail";
import { OrganizationDetails } from "./components/form-view/organization-details";
import { ContactCustomer } from "./components/form-view/contact-customer";
import { set } from "react-hook-form";

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

  const [customerForms, setCustomerForms] = React.useState([
    { key: "contact_detail", mode: "view" },
    { key: "customer_detail", mode: "view" },
    { key: "organization_detail", mode: "view" },
  ]);

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
                    <>
                      <div className="flex flex-row gap-5">
                        <div className="w-[50%] h-auto">
                          <ContactCustomer
                            customer={customer}
                            form={formUpdate}
                            loading={loadCustomer}
                            onClick={onUpdate}
                            disabled={isLoading || isPending}
                            mode={
                              customerForms.find(
                                (f) => f.key === "contact_detail"
                              )?.mode
                            }
                            onCancel={handleCancel}
                            onEditForm={handleEditForm}
                          />
                        </div>

                        <Card className="w-[50%]">
                          <CardHeader>
                            <CardTitle className="text-base font-bold">
                              ความสัมพันธ์ลูกค้า
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4 w-full">
                            {loadAnalyzeCustomer ? (
                              <>
                                <div className="flex justify-center">
                                  <SkeletonLoading
                                    shape="rounded"
                                    width="w-[190px]"
                                    height="h-[190px]"
                                    className="mb-10"
                                  />
                                </div>
                                <SkeletonLoading />
                                <SkeletonLoading />
                                <SkeletonLoading />
                                <SkeletonLoading />
                              </>
                            ) : (
                              <div className="flex w-full">
                                <PieChart initData={analyzeCustomer} />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>

                      <Card className="my-5">
                        <div className="flex gap-2 mx-6 justify-between items-center">
                          <span className="text-base font-bold ">
                            ออเดอร์ที่สั่งซื้อล่าสุด
                          </span>
                          <Button onClick={() => setTab("order")}>
                            ดูทั้งหมด
                          </Button>
                        </div>
                        <CardContent>
                          <DataTable
                            offSearch
                            offFilter
                            queryFunction={({ pageIndex, pageSize }) =>
                              useOrdersPaginateFilter({
                                pageIndex,
                                pageSize: 5,
                                customerId: id,
                                sortField: "orderDetails_createdAt",
                                sortingBy: "desc",
                              })
                            }
                            offPaginate={true}
                            columns={columns}
                          />
                        </CardContent>
                      </Card>
                    </>
                  ),
                },
                {
                  key: "customerDetail",
                  label: "ข้อมูลลูกค้า",
                  icon: <User className="w-4 h-4" />,
                  content: (
                    <div className="flex flex-row gap-5">
                      <div className="w-[50%]">
                        <CustomerDeail
                          customer={customer}
                          form={formUpdate}
                          loading={loadCustomer}
                          onClick={onUpdate}
                          disabled={isLoading || isPending}
                          mode={
                            customerForms.find(
                              (f) => f.key === "customer_detail"
                            )?.mode
                          }
                          onCancel={handleCancel}
                          onEditForm={handleEditForm}
                        />
                      </div>
                      <div className="w-[50%]">
                        <OrganizationDetails
                          customer={customer}
                          form={formUpdate}
                          loading={loadCustomer}
                          onClick={onUpdate}
                          disabled={isLoading || isPending}
                          mode={
                            customerForms.find(
                              (f) => f.key === "organization_detail"
                            )?.mode
                          }
                          onCancel={handleCancel}
                          onEditForm={handleEditForm}
                        />
                      </div>
                    </div>
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
                  label: "บันทึกโน๊ต/กิจกรรม",
                  icon: <Bot className="w-4 h-4" />,
                  content: (
                    <>
                      <div className="flex flex-row gap-4 h-full">
                        <div className="w-[50%]  ">
                          <NotesCard
                            loading={isLoading ?? false}
                            notes={customer?.note ?? []}
                            customerNote={customerNote}
                            onClick={onUpdate}
                            fetchCustomerNote={fetchCustomerNote ?? (() => {})}
                            className="min-h-50 h-auto"
                          />

                          <RemarkCard
                            loading={isLoading ?? false}
                            remark={customer?.remark || ""}
                            form={formUpdate}
                            onClick={onUpdate}
                            className="min-h-50 h-auto mt-5"
                          />
                        </div>
                        <div className="w-[50%] ">
                          <ViewCustomerActivityLog className="h-full" />
                        </div>
                      </div>
                    </>
                  ),
                },
              ]}
            />
          </Form>
        </div>
      </CustomerProvider>

      {/* <AIMessageView
        open={AIOpen}
        onOpenChange={setAIOpen}
        customer={getData}
        onClickBtn={onSync}
        closeBtn={true}
        // isLoading={isLoadingAiNote}
      /> */}

      <div className="flex flex-col space-y-2 overflow-y-auto">
        <AIMessageView
          open={AIOpen}
          onOpenChange={setAIOpen}
          customer={dataFromAI}
          closeBtn={true}
          onClickBtn={onSync}
        />
        {/* <AiCustomerFields
          data={customer}
          onClickBtn={onSync}
          closeBtn={true}
          noSyncBtn={true}
        /> */}
      </div>
    </>
  );
}
