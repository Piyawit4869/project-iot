import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy, PenLine, Save, ShieldCheck, User2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { GlobalModal } from "~/components/shared/modal/modal";
import { TabControl } from "~/components/shared/tab-control";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ConnectLineSchema, type ConnectLineValues } from "~/schemas/settings";

import TableMassage from "../connect-line/table-massage";
import ReplyMessageForm from "../connect-line/create-massage";
import MessageCardForm from "../connect-line/card-massage";
import {
  useGetConnectionLine,
  useUpdateConnectionLine,
} from "~/api/client/settings";
import { useSearchParams, useNavigate, useParams } from "react-router";
import { useEntityBreadcrumb } from "~/providers/RouteProvider";
import EditReplyMessageForm from "../connect-line/edit-reply-message-form";
import TableCardMassage from "../connect-line/table-card-massage";
import EditMessageCardForm from "../connect-line/edit-card-massage";
import { Separator } from "~/components/ui/separator";
import GlobalButton from "~/components/shared/global-button";
import { cn, copyTextToClipboard } from "~/lib/utils";
import { EditableFormField } from "./editable-formField";
import { CustomTabs } from "~/components/shared/custom-tabs";

type LineTab = "config-line" | "massage-line" | "config-card";
type LineView = "list" | "create" | "edit";

export const LineContainerSettings: React.FC = () => {
  const [sp] = useSearchParams();
  const navigate = useNavigate();
  const params = useParams();

  // const id = (params?.id as string) ?? "";
  const id = sp.get("id") ?? "";

  const { mutate: UpdateConnectionLine } = useUpdateConnectionLine(id);
  const { data } = useGetConnectionLine(id ?? "");

  const tabFromUrl = (sp.get("tab") as LineTab) ?? "config-line";
  const viewFromUrl = (sp.get("view") as LineView) ?? "list";
  const subIdFromUrl = sp.get("subId") ?? "";

  const setSearch = (partial: Record<string, string | null | undefined>) => {
    const curr = new URLSearchParams(sp);
    Object.entries(partial).forEach(([k, v]) => {
      if (v === null || v === undefined) curr.delete(k);
      else curr.set(k, String(v));
    });
    navigate({ search: curr.toString() }, { replace: true });
  };

  const form = useForm<ConnectLineValues>({
    resolver: zodResolver(ConnectLineSchema),
    defaultValues: {
      id: "",
      imageUrl: "",
      name: "",
      channelId: "",
      channelSecret: "",
      channelAccessToken: "",
    },
  });

  const [tab, setTab] = React.useState<LineTab>(tabFromUrl);

  React.useEffect(() => {
    setTab(tabFromUrl);
  }, [tabFromUrl]);

  const handleChangeTab = (v: string) => {
    const nextTab = v as LineTab;
    setTab(nextTab);

    // reset view when changing tab
    goView(nextTab, "list");
  };

  const handleOnSubmit = (values: ConnectLineValues) => {
    GlobalModal.info({
      title: "ยืนยันการบันทึกการตั้งค่า Line Official",
      description: "คุณต้องการบันทึกค่าการเชื่อมต่อ Line Official ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังบันทึกการเชื่อมต่อ...");
        try {
          UpdateConnectionLine(values, {
            onSuccess: () => {
              toast.success("บันทึกการเชื่อมต่อสำเร็จ !", {
                id: toastId,
                duration: 2500,
                position: "bottom-right",
              });
              setCustomerForms((prev) =>
                prev.map((f) => ({ ...f, mode: true }))
              );
            },
            onError: (error) => {
              console.error("Update connection error:", error);
              toast.error("เกิดข้อผิดพลาดขณะบันทึกการเชื่อมต่อ", {
                id: toastId,
              });
            },
          });
        } catch {
          toast.error("เกิดข้อผิดพลาดที่ไม่คาดคิด", { id: toastId });
        }
      },
    });
  };

  React.useEffect(() => {
    if (data) {
      form.reset({
        id: data?.id ?? "",
        imageUrl: data?.imageUrl ?? "",
        name: data?.name ?? "",
        channelId: data?.channelId ?? "",
        channelSecret: data?.channelSecret ?? "",
        channelAccessToken: data?.channelAccessToken ?? "",
      });
    }
  }, [data, form]);

  // const goList = (tab: string) =>
  //   setSearch({ tab: tab, view: "list", replyId: null });

  // const goCreate = (tab: string) =>
  //   setSearch({ tab: tab, view: "create", replyId: null });

  // const goEdit = (replyId: string) =>
  //   setSearch({ tab: "massage-line", view: "edit", replyId });

  useEntityBreadcrumb({
    feature: "line",
    entity: data ? { id: data.id, name: data?.name ?? data.id } : undefined,
    base: data && {
      href: `/setting-organization/third-party/line/${data?.id}`,
      label: data?.name,
      uuid: data?.id,
    },
  });

  const headerButtons =
    tab === "config-line"
      ? [
          <Button
            key="save-btn"
            type="submit"
            form="config-line"
            className="w-full"
          >
            <>
              <Save /> สร้าง
            </>
          </Button>,
        ]
      : [];

  const goView = (tab: LineTab, view: LineView, subId?: string) => {
    setSearch({
      tab,
      view,
      subId: view === "edit" ? subId : null,
    });
  };

  const [customerForms, setCustomerForms] = React.useState([
    { key: "name", mode: true },
    { key: "channelId", mode: true },
    { key: "channelSecret", mode: true },
    { key: "channelAccessToken", mode: true },
    { key: "imageUrl", mode: true },
  ]);

  const handleCloseForm = (key: string) => {
    setCustomerForms((prev) => {
      return prev.map((form) => {
        if (form.key === key) {
          return { ...form, mode: true };
        }
        return form;
      });
    });
  };

  const handleEditForm = (key: string) => {
    setCustomerForms((prev) => {
      return prev.map((form) => {
        if (form.key === key) {
          return { ...form, mode: false };
        }
        return form;
      });
    });
  };

  const editName = customerForms.find((f: any) => f.key === "name")?.mode;
  const editChannelId = customerForms.find(
    (f: any) => f.key === "channelId"
  )?.mode;
  const editChannelSecret = customerForms.find(
    (f: any) => f.key === "channelSecret"
  )?.mode;
  const editChannelAccessToken = customerForms.find(
    (f: any) => f.key === "channelAccessToken"
  )?.mode;

  const editImageUrl = customerForms.find(
    (f: any) => f.key === "imageUrl"
  )?.mode;

  return (
    <div className="flex flex-col w-full">
      <TabControl
        title="Line"
        noneSticky={true}
        backpath="/setting-organization/third-party"
        // buttons={headerButtons}
      />

      <CustomTabs
        value={tab}
        onValueChange={handleChangeTab}
        defaultValue="config-line"
        items={[
          {
            key: "config-line",
            label: "ข้อมูล",

            content: (
              <Form {...form}>
                <form
                  id="config-line"
                  onSubmit={form.handleSubmit(handleOnSubmit)}
                >
                  <div className="flex w-full flex-col bg-white rounded-xl border  shadow-sm">
                    <div className="px-6 mt-4 pb-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="flex h-12 w-12   items-center justify-center rounded-full bg-gray-700">
                            <User2 className="h-7 w-7 text-white" />
                          </div>
                          <div className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                            <ShieldCheck className="h-3.5 w-3.5 text-white" />
                          </div>
                        </div>
                        <p className="text-lg pl-3 font-semibold text-[var(--card-foreground)]">
                          ข้อมูลการเชื่อมต่อ Line Official
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mt-5">
                        <FormField
                          name="imageUrl"
                          render={({ field }) => (
                            <EditableFormField
                              onSave={form.handleSubmit(handleOnSubmit)}
                              label="รูปภาพ"
                              edit={editImageUrl}
                              onCancel={() => handleCloseForm("imageUrl")}
                              onEdit={() => handleEditForm("imageUrl")}
                              field={field}
                              masked
                              type="image"
                              isEdit={editImageUrl}
                            />
                          )}
                        />

                        <Separator />

                        <FormField
                          name="name"
                          render={({ field }) => (
                            <EditableFormField
                              label="ชื่อช่องทาง"
                              placeholder="เช่น Line Official ROME"
                              edit={editName}
                              onCancel={() => handleCloseForm("name")}
                              onEdit={() => handleEditForm("name")}
                              onSave={form.handleSubmit(handleOnSubmit)}
                              field={field}
                              showCopy
                              isEdit={editName}
                            />
                          )}
                        />

                        <Separator />

                        <FormField
                          name="channelId"
                          render={({ field }) => (
                            <EditableFormField
                              label="Channel ID"
                              placeholder="1234567890"
                              edit={editChannelId}
                              onCancel={() => handleCloseForm("channelId")}
                              onEdit={() => handleEditForm("channelId")}
                              field={field}
                              onSave={form.handleSubmit(handleOnSubmit)}
                              showCopy
                              isEdit={editChannelId}
                            />
                          )}
                        />

                        <Separator />

                        <FormField
                          name="channelSecret"
                          render={({ field }) => (
                            <EditableFormField
                              label="Channel Secret"
                              placeholder="1234567890abcdefghijk"
                              edit={editChannelSecret}
                              onCancel={() => handleCloseForm("channelSecret")}
                              onEdit={() => handleEditForm("channelSecret")}
                              field={field}
                              masked
                              showCopy
                              onSave={form.handleSubmit(handleOnSubmit)}
                              isEdit={editChannelSecret}
                            />
                          )}
                        />

                        <Separator />

                        <FormField
                          name="channelAccessToken"
                          render={({ field }) => (
                            <EditableFormField
                              onSave={form.handleSubmit(handleOnSubmit)}
                              label={
                                <span>
                                  Channel access token
                                  <span className="block">(long-lived)</span>
                                </span>
                              }
                              placeholder="w231-12abcdefg1234567890"
                              edit={editChannelAccessToken}
                              onCancel={() =>
                                handleCloseForm("channelAccessToken")
                              }
                              onEdit={() =>
                                handleEditForm("channelAccessToken")
                              }
                              field={field}
                              masked
                              showCopy
                              isEdit={editChannelAccessToken}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            ),
          },
          {
            key: "massage-line",
            label: "ข้อความตอบกลับ",

            content: (
              <>
                {viewFromUrl === "list" && (
                  <TableMassage
                    onCreate={() => goView("massage-line", "create")}
                    onEdit={(id) => goView("massage-line", "edit", id)}
                  />
                )}

                {viewFromUrl === "create" && (
                  <ReplyMessageForm
                    mode="create"
                    onCancel={() => goView("massage-line", "list")}
                    onSaved={() => goView("massage-line", "list")}
                  />
                )}

                {viewFromUrl === "edit" && subIdFromUrl && (
                  <EditReplyMessageForm
                    mode="edit"
                    replyId={subIdFromUrl}
                    onCancel={() => goView("massage-line", "list")}
                    onSaved={() => goView("massage-line", "list")}
                  />
                )}
              </>
            ),
          },
          {
            key: "config-card",
            label: "การ์ดเมสเสจ",

            content: (
              <>
                {viewFromUrl === "list" && (
                  <TableCardMassage
                    onCreate={() => goView("config-card", "create")}
                    onEdit={(id) => goView("config-card", "edit", id)}
                  />
                )}

                {viewFromUrl === "create" && (
                  <MessageCardForm
                    onCancel={() => goView("config-card", "list")}
                    onSaved={() => goView("config-card", "list")}
                  />
                )}

                {viewFromUrl === "edit" && subIdFromUrl && (
                  <EditMessageCardForm
                    id={subIdFromUrl}
                    onCancel={() => goView("config-card", "list")}
                    onSaved={() => goView("config-card", "list")}
                  />
                )}
              </>
            ),
          },
        ]}
      />

      {/* <Tabs value={tab} onValueChange={handleChangeTab} className="mt-4">
        <TabsList className="mb-4">
          <TabsTrigger value="config-line">ข้อมูล</TabsTrigger>
          <TabsTrigger value="massage-line">ข้อความตอบกลับ</TabsTrigger>
          <TabsTrigger value="config-card">การ์ดเมสเสจ</TabsTrigger>
        </TabsList>

        <TabsContent value="config-line">
          <Form {...form}>
            <form id="config-line" onSubmit={form.handleSubmit(handleOnSubmit)}>
              <div className="flex w-full flex-col space-y-6 bg-[var(--background)] text-[var(--foreground)]">
                <div className="px-6 mt-4 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--muted)]">
                        <User2 className="h-6 w-6 text-[var(--muted-foreground)]" />
                      </div>
                      <div className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                        <ShieldCheck className="h-3.5 w-3.5 text-white" />
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-[var(--card-foreground)]">
                      ข้อมูลการเชื่อมต่อ Line Official
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mt-5">
                    <FormField
                      name="name"
                      render={({ field }) => (
                        <EditableFormField
                          label="ชื่อช่องทาง"
                          placeholder="เช่น Line Official ROME"
                          edit={editName}
                          onCancel={() => handleCloseForm("name")}
                          onEdit={() => handleEditForm("name")}
                          onSave={form.handleSubmit(handleOnSubmit)}
                          field={field}
                          isEdit={editName}
                        />
                      )}
                    />

                    <Separator />

                    <FormField
                      name="channelId"
                      render={({ field }) => (
                        <EditableFormField
                          label="Channel ID"
                          placeholder="1234567890"
                          edit={editChannelId}
                          onCancel={() => handleCloseForm("channelId")}
                          onEdit={() => handleEditForm("channelId")}
                          field={field}
                          onSave={form.handleSubmit(handleOnSubmit)}
                          showCopy
                          isEdit={editChannelId}
                        />
                      )}
                    />

                    <Separator />

                    <FormField
                      name="channelSecret"
                      render={({ field }) => (
                        <EditableFormField
                          label="Channel Secret"
                          placeholder="1234567890abcdefghijk"
                          edit={editChannelSecret}
                          onCancel={() => handleCloseForm("channelSecret")}
                          onEdit={() => handleEditForm("channelSecret")}
                          field={field}
                          masked
                          onSave={form.handleSubmit(handleOnSubmit)}
                          isEdit={editChannelSecret}
                        />
                      )}
                    />

                    <Separator />

                    <FormField
                      name="channelAccessToken"
                      render={({ field }) => (
                        <EditableFormField
                          onSave={form.handleSubmit(handleOnSubmit)}
                          label="Channel access token (long-lived)"
                          placeholder="w231-12abcdefg1234567890"
                          edit={editChannelAccessToken}
                          onCancel={() => handleCloseForm("channelAccessToken")}
                          onEdit={() => handleEditForm("channelAccessToken")}
                          field={field}
                          masked
                          isEdit={editChannelAccessToken}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="massage-line"></TabsContent>

        <TabsContent value="config-card">
          {viewFromUrl === "list" && (
            <TableCardMassage
              onCreate={() => goView("config-card", "create")}
              onEdit={(id) => goView("config-card", "edit", id)}
            />
          )}

          {viewFromUrl === "create" && (
            <MessageCardForm
              onCancel={() => goView("config-card", "list")}
              onSaved={() => goView("config-card", "list")}
            />
          )}

          {viewFromUrl === "edit" && subIdFromUrl && (
            <EditMessageCardForm
              id={subIdFromUrl}
              onCancel={() => goView("config-card", "list")}
              onSaved={() => goView("config-card", "list")}
            />
          )}
        </TabsContent>
      </Tabs> */}
    </div>
  );
};
