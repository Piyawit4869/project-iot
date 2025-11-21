import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Save, ShieldCheck, User2 } from "lucide-react";
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

export const LineContainerSettings: React.FC = () => {
  const [sp] = useSearchParams();
  const navigate = useNavigate();
  const params = useParams();

  // const id = (params?.id as string) ?? "";
  const id = sp.get("id") ?? "";

  const { mutate: UpdateConnectionLine } = useUpdateConnectionLine(id);
  const { data } = useGetConnectionLine(id ?? "");

  const tabFromUrl = sp.get("tab") ?? "config-line";
  const viewFromUrl = sp.get("view") ?? "list";

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
      name: "",
      channelId: "",
      channelSecret: "",
      channelAccessToken: "",
    },
  });

  const [tab, setTab] = React.useState(tabFromUrl);
  React.useEffect(() => setTab(tabFromUrl), [tabFromUrl]);

  const handleChangeTab = (v: string) => {
    setTab(v);
    setSearch({ tab: v, view: v === "massage-line" ? viewFromUrl : null });
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
        name: data?.name ?? "",
        channelId: data?.channelId ?? "",
        channelSecret: data?.channelSecret ?? "",
        channelAccessToken: data?.channelAccessToken ?? "",
      });
    }
  }, [data, form]);

  const goList = (tab: string) =>
    setSearch({ tab: tab, view: "list", replyId: null });
  const goCreate = (tab: string) =>
    setSearch({ tab: tab, view: "create", replyId: null });
  const goEdit = (replyId: string) =>
    setSearch({ tab: "massage-line", view: "edit", replyId });

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
            className="w-full">
            <>
              <Save /> สร้าง
            </>
          </Button>,
        ]
      : [];

  return (
    <div className="flex flex-col w-full">
      <TabControl
        title="ROME Assistant"
        noneSticky={true}
        backpath="/setting-organization/third-party"
        buttons={headerButtons}
      />

      <Tabs value={tab} onValueChange={handleChangeTab} className="mt-4">
        <TabsList className="mb-4">
          <TabsTrigger value="config-line">ข้อมูล</TabsTrigger>
          <TabsTrigger value="massage-line">ข้อความตอบกลับ</TabsTrigger>
          <TabsTrigger value="config-card">การ์ดเมสเสจ</TabsTrigger>
        </TabsList>

        <TabsContent value="config-line">
          <Form {...form}>
            <form id="config-line" onSubmit={form.handleSubmit(handleOnSubmit)}>
              <div className="flex w-full flex-col space-y-6 bg-[var(--background)] text-[var(--foreground)]">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--card)]">
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                    <p className="mt-3 text-lg font-semibold text-[var(--card-foreground)]">
                      เชื่อมต่อสำเร็จ
                    </p>
                  </div>

                  <div className="px-6 pb-4">
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-6">
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ชื่อช่องทาง</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="เช่น Line Official ROME"
                                  className="bg-[var(--input)] text-[var(--foreground)]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-[var(--destructive)]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          name="channelId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Channel ID</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="1234567890"
                                  className="bg-[var(--input)] text-[var(--foreground)]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-[var(--destructive)]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          name="channelSecret"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Channel Secret</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="1234567890abcdefghijk"
                                  className="bg-[var(--input)] text-[var(--foreground)]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-[var(--destructive)]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          name="channelAccessToken"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Channel access token (long-lived)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="w231-12abcdefg1234567890"
                                  className="bg-[var(--input)] text-[var(--foreground)]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-[var(--destructive)]" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="massage-line">
          {viewFromUrl === "list" && (
            <TableMassage
              onCreate={() => goCreate("massage-line")}
              onEdit={goEdit}
            />
          )}

          {viewFromUrl === "create" && (
            <ReplyMessageForm
              mode="create"
              onCancel={() => goList("massage-line")}
              onSaved={() => goList("massage-line")}
            />
          )}

          {viewFromUrl === "edit" && (
            <EditReplyMessageForm
              mode="edit"
              replyId={sp.get("subId") ?? ""}
              onCancel={() => goList("massage-line")}
              onSaved={() => goList("massage-line")}
            />
          )}
        </TabsContent>

        <TabsContent value="config-card">
          {viewFromUrl === "list" && (
            <TableCardMassage onCreate={() => goCreate("config-card")} />
          )}
          {viewFromUrl === "create" && (
            <MessageCardForm
              onCancel={() => goList("config-card")}
              onSaved={() => goList("config-card")}
            />
          )}
          {viewFromUrl === "edit" && (
            <EditMessageCardForm
              id={sp.get("subId") || ""}
              onCancel={() => goList("config-card")}
              onSaved={() => goList("config-card")}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
