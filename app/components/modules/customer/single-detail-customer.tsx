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
import { FormCustomerDetailCard } from "./components/form/customer-detail-form";
import { FormCustomerInfoCard } from "./components/form/customer-info-form";
import { FormCustomerContact } from "./components/form/customer-contact-form";
import { ViewCustomerDeatailCard } from "./components/view/customer-detail-view-new";
import { ViewCustomerInfoCard } from "./components/view/customer-info-view";
import { ViewCustomerContact } from "./components/view/customer-contact";
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
  const [tab, setTab] = React.useState("dashboard");

  const data = customer?.profile;
  const otherName = data?.name;
  const lineName = data?.lineName;

  const fullName = [data?.firstName, data?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const phoneContactState = formUpdate.watch("contacts.0.phone");
  const nameContactState = formUpdate.watch("contacts.0.name");

  //disable btn
  let isAnyFilled = false;
  if (phoneContactState && !nameContactState) {
    isAnyFilled = true;
  }
  if (!phoneContactState && nameContactState) {
    isAnyFilled = true;
  }

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

                  <GlobalButton
                    key="cancel-btn"
                    type="button"
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1 flex items-center gap-1 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
                    // icon={<X />}
                    label={<span className="hidden sm:inline">ยกเลิก</span>}
                  />

                  <GlobalButton
                    key="save"
                    type="submit"
                    form="customer"
                    loading={isUpdating}
                    disabled={isLoading || isPending || isAnyFilled}
                    className="flex-1  flex items-center gap-1 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm dark:disabled:bg-transparent dark:disabled:text-white dark:disabled:border-white  dark:disabled:border-1"
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
                          <ViewCustomerDeatailCard
                            customer={customer}
                            form={formUpdate}
                            loading={loadCustomer}
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
                        <ViewCustomerInfoCard
                          customer={customer}
                          form={formUpdate}
                          loading={loadCustomer}
                        />
                      </div>
                      <div className="w-[50%]">
                        <ViewCustomerContact
                          customer={customer}
                          form={formUpdate}
                          loading={loadCustomer}
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
                      {/* <Card className="">
                        <div className="flex gap-2 mx-6">
                          <span className="text-base font-bold  ">
                            ออเดอร์ที่เคยสั่งซื้อ
                          </span>
                        </div>
                        <CardContent className="px-6">
                          
                        </CardContent>
                      </Card> */}
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
                            // isEdit={isEdit}
                            customerNote={customerNote}
                            fetchCustomerNote={fetchCustomerNote ?? (() => {})}
                            className="min-h-50 h-auto"
                          />
                          <RemarkCard
                            isEdit={isEdit ?? false}
                            loading={isLoading ?? false}
                            remark={customer?.remark || ""}
                            form={formUpdate}
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

          {/* <Form {...formUpdate}>
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
                  />

                  <ViewCustomerActivityLog loading={loadCustomer} />
                </div>
              </div>
            </form>
          </Form> */}
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
