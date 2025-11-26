import React from "react";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouteLoaderData, useSearchParams } from "react-router";
import {
  useGetConnectionAi,
  useUpdateConnectionAi,
} from "~/api/client/settings";
import { ConnectAiSchema, type ConnectAiValues } from "~/schemas/settings";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { TabControl } from "~/components/shared/tab-control";
import { Button } from "~/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizeble";
import { ChatbotSideBarSettings } from "./chat-bot-side-bar-settings";
import { ChatBotChatMessagesAndConfig } from "./chat-bot-chat-messages-and-config";
import { useChat } from "~/providers/chat/useChat";
import { socketConfig } from "~/lib/sockets";
import { useEntityBreadcrumb } from "~/providers/RouteProvider";
import { Save } from "lucide-react";

// ✅ NEW
import { AiConfigListPanel } from "./ai-config-list-panel"; // <- ปรับ path ให้ตรงไฟล์ที่คุณสร้าง

interface OpenAiContainerSettingsChatBotProps {
  api: string;
}

export const OpenAiContainerSettingsChatBot: React.FC<
  OpenAiContainerSettingsChatBotProps
> = (props) => {
  const { api } = props;

  const [sp] = useSearchParams();
  const id = sp.get("id") ?? "";

  const { mutate: UpdateConnectionAi } = useUpdateConnectionAi(String(id));
  const { refetch: refetchChatAI } = useGetConnectionAi(String(id));
  const { user } = useRouteLoaderData("root") as any;

  const { data } = useGetConnectionAi(id ?? "");
  const chatroomConfigId = data?.chatroomConfigId;

  const { addMessageAI } = useChat();
  const [autoScroll, setAutoScroll] = React.useState<boolean>(true);
  const [firstTimeMessage] = React.useState<string>("");

  const form = useForm<ConnectAiValues>({
    resolver: zodResolver(ConnectAiSchema) as Resolver<ConnectAiValues>,
  });

  const onSubmit = (formData: ConnectAiValues) => {
    GlobalModal.info({
      title: "ยืนยันการบันทึกการตั้งค่า AI Assistant",
      description: "คุณต้องการบันทึกค่าการเชื่อมต่อ AI Assistant ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังบันทึกการเชื่อมต่อ...");
        UpdateConnectionAi(formData, {
          onSuccess: () => {
            toast.success("บันทึกการเชื่อมต่อสำเร็จ !", {
              id: toastId,
              duration: 2500,
              position: "bottom-right",
            });
            refetchChatAI();
          },
          onError: (error) => {
            console.error("Update connection ai error:", error);
            toast.error("เกิดข้อผิดพลาดขณะบันทึกการเชื่อมต่อ", {
              id: toastId,
            });
          },
        });
      },
    });
  };

  const assistantName = form.watch("name");

  useEntityBreadcrumb({
    feature: "ai",
    entity: data ? { id: data.id, name: data?.name ?? data.id } : undefined,
    base: data && {
      href: `/setting-organization/third-party/ai/${data?.id}`,
      label: data?.name,
      uuid: data?.id,
    },
  });

  React.useEffect(() => {
    if (data) {
      form.reset({
        id: data?.id ?? "",
        active: data?.active ?? false,
        name: data?.name ?? "",
        aiKey: data?.aiKey ?? "",
        systemInstructions: data.systemInstructions ?? "",
        model: data?.model ?? "",
        useStock: Boolean(data.useStock),
        consentPii: Boolean(data.consentPii),
        openAssistantId: data?.openAssistantId ?? "",
        note: data?.note ?? "",
        remark: data?.remark ?? "",
        defaultIsAiReply: Boolean(data.defaultIsAiReply),
        temperature: data?.temperature ?? 0,
        topP: data?.topP ?? 0,
        branchId: data?.branchId ?? "",
      });
    }
  }, [data, form]);

  React.useEffect(() => {
    const socket = socketConfig(api);

    if (user?.branchId) {
      socket.emit("rooms", `${user.branchId}`);
    }

    socket.on("rooms", (room: any) => {
      if (room.chatRoomType === "config") {
        addMessageAI({
          ...room,
          imageUrl:
            room.imageUrl || `https://ui-avatars.com/api/?name=${room.sender}`,
          streaming: true,
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [api, addMessageAI, user?.branchId]);

  return (
    <div>
      <TabControl
        title="ROME Assistant"
        noneSticky={true}
        backpath="/setting-organization/third-party"
        buttons={[
          <Button
            key="save-btn"
            type="submit"
            form="config-ai"
            className="w-full"
            disabled={!id} // กันเคสยังไม่ได้เลือก config
          >
            <>
              <Save /> บันทึก
            </>
          </Button>,
        ]}
      />

      {/* ✅ 3 Panels Layout */}
      <div className="h-[calc(100vh-theme(spacing.32))] w-full px-2">
        {/* container */}
        <div className="h-full w-full rounded-xl border bg-muted/40 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* LEFT */}
            <ResizablePanel minSize={16} defaultSize={22} maxSize={28}>
              <div className="h-full bg-background">
                {/* sticky header */}
                <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">
                        รายการ Assistant
                      </div>
                      <div className="text-xs text-muted-foreground">
                        เลือก config เพื่อแก้ไข
                      </div>
                    </div>
                  </div>
                </div>

                {/* content (scroll) */}
                <div className="h-[calc(100%-56px)] overflow-y-auto p-3">
                  <AiConfigListPanel />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-border" />

            {/* MIDDLE */}
            <ResizablePanel minSize={38} defaultSize={45}>
              <div className="h-full bg-background">
                <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">
                        การตั้งค่าผู้ช่วย
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ตั้งค่า model, policy, และ system instructions
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[calc(100%-56px)] overflow-y-auto p-3">
                  <FormProvider {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      id="config-ai"
                      className="h-full"
                    >
                      <ChatbotSideBarSettings form={form} id={id} />
                    </form>
                  </FormProvider>
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-border" />

            {/* RIGHT */}
            <ResizablePanel minSize={26} defaultSize={33}>
              <div className="h-full bg-background flex flex-col">
                <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">
                        {assistantName || "ROME Assistant"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ทดสอบการคุยและดู output
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <ChatBotChatMessagesAndConfig
                    chatRoomId={chatroomConfigId}
                    searchPrompt={firstTimeMessage}
                    data={data}
                    autoScroll={autoScroll}
                    setAutoScroll={setAutoScroll}
                  />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};
