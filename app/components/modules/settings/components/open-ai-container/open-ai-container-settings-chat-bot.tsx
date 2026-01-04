import React, { useState } from "react";
import { toast } from "sonner";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { useRouteLoaderData, useSearchParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, RotateCcw, Save } from "lucide-react";

import {
  useGetConnectionAi,
  useGetConnectionAiByOrgGroup,
  useResetChatAi,
  useUpdateConnectionAi,
} from "~/api/client/settings";
import { ConnectAiSchema, type ConnectAiValues } from "~/schemas/settings";
import { GlobalModal } from "~/components/shared/modal/modal";
import { TabControl } from "~/components/shared/tab-control";
import { Button } from "~/components/ui/button";
import { ChatbotSideBarSettings } from "./chat-bot-side-bar-settings";
import { ChatBotChatMessagesAndConfig } from "./chat-bot-chat-messages-and-config";
import { useChat } from "~/providers/chat/useChat";
import { socketConfig } from "~/lib/sockets";
import { useEntityBreadcrumb } from "~/providers/RouteProvider";

// ✅ NEW
import { AiConfigListPanel } from "./ai-config-list-panel"; // <- ปรับ path ให้ตรงไฟล์ที่คุณสร้าง
import { cn } from "~/lib/utils";
import GlobalButton from "~/components/shared/global-button";

interface OpenAiContainerSettingsChatBotProps {
  api: string;
  isLoading: boolean;
}

export const OpenAiContainerSettingsChatBot: React.FC<
  OpenAiContainerSettingsChatBotProps
> = (props) => {
  const { user } = useRouteLoaderData("root") as any;

  const { api } = props;

  const [sp] = useSearchParams();
  const id = sp.get("id") ?? "";

  const [showList, setShowList] = useState(true);

  const { mutate: UpdateConnectionAi } = useUpdateConnectionAi(String(id));

  const { refetch: refetchChatAI } = useGetConnectionAi(String(id));

  const { data, isLoading, refetch } = useGetConnectionAi(id ?? "");
  const { mutate: resetChatAi } = useResetChatAi(String(data?.id));

  const {
    data: assistants,
    isLoading: isAssistantsLoading,
    refetch: assistantsRefetch,
  } = useGetConnectionAiByOrgGroup(user?.organizationGroupId ?? "");

  const chatroomConfigId = data?.chatroomConfigId;

  const { addMessageAI } = useChat();
  const [autoScroll, setAutoScroll] = React.useState<boolean>(true);
  const [firstTimeMessage] = React.useState<string>("");

  const form = useForm<ConnectAiValues>({
    resolver: zodResolver(ConnectAiSchema) as Resolver<ConnectAiValues>,
    defaultValues: {},
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
            assistantsRefetch();
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

  const resetAi = () => {
    GlobalModal.info({
      title: "Reset Chat AI",
      description: "คุณต้องการ Reset Chat AI ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลัง Reset Chat...");
        resetChatAi(undefined, {
          onSuccess: () => {
            toast.success("Reset Chat สำเร็จ !", {
              id: toastId,
              duration: 2500,
              position: "bottom-right",
            });
            refetch();
          },
          onError: (error) => {
            console.error("Reset Chat ai error:", error);
            toast.error("เกิดข้อผิดพลาดขณะการ Reset Chat", {
              id: toastId,
            });
          },
        });
      },
    });
  };

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
  }, [data, form, id]);

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
            type="reset"
            form="config-ai"
            className="w-full"
            onClick={form.handleSubmit(onSubmit)}
            disabled={!id} // กันเคสยังไม่ได้เลือก config
          >
            <>
              <Save /> บันทึก
            </>
          </Button>,
        ]}
      />

      <div className="flex h-full w-full gap-2">
        <div
          className={cn(
            "bg-background rounded-md border overflow-hidden transition-all duration-300 flex",
            showList
              ? "w-[25%] min-w-[240px] flex-col"
              : "w-[44px] items-center justify-center"
          )}
        >
          {showList ? (
            <>
              {/* HEADER */}
              <div className="p-3 border-b flex items-center justify-between">
                <div>
                  <div className="font-semibold">รายการ Thread</div>
                  <div className="text-xs text-muted-foreground">
                    เลือก config เพื่อแก้ไข
                  </div>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowList(false)}
                >
                  <ChevronLeft />
                </Button>
              </div>

              {/* CONTENT */}
              <div className="flex-1 overflow-y-auto">
                <AiConfigListPanel
                  data={assistants}
                  isLoading={isAssistantsLoading}
                  refetch={assistantsRefetch}
                />
              </div>
            </>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowList(true)}
              className="h-full flex items-start pt-6"
            >
              <ChevronRight />
            </Button>
          )}
        </div>

        {/* MIDDLE : ROME Assistant */}
        <div
          className={`${
            showList ? "w-[45%]" : "w-[70%]"
          } transition-all duration-500`}
        >
          <div className="h-full bg-background rounded-md border flex flex-col">
            <div className="p-3 border-b flex items-center justify-between">
              <div>
                <div className="font-semibold">ROME Assistant</div>
                <div className="text-xs text-muted-foreground">
                  ทดสอบการคุยและดู output
                </div>
              </div>
              <GlobalButton
                label="Reset AI"
                variant="secondary"
                icon={<RotateCcw className="w-2 h-2" />}
                width="100px"
                onClick={resetAi}
                className="bg-white border-1 hover:bg-gray-100 hover:border-gray-100"
              />
            </div>

            <div className="h-full flex-1 overflow-y-auto p-3">
              {!isLoading && (
                <ChatBotChatMessagesAndConfig
                  chatroomConfigId={chatroomConfigId}
                  searchPrompt={firstTimeMessage}
                  data={data}
                  autoScroll={autoScroll}
                  setAutoScroll={setAutoScroll}
                />
              )}
            </div>
          </div>
        </div>

        {/* RIGHT : การตั้งค่าผู้ช่วย */}
        <div className="w-[30%] min-w-[300px]">
          <div className="h-full bg-background rounded-md border flex flex-col">
            <div className="p-3 border-b">
              <div className="font-semibold">การตั้งค่าผู้ช่วย</div>
              <div className="text-xs text-muted-foreground">
                ตั้งค่า model, policy, และ system instructions
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              <FormProvider {...form}>
                <form id="config-ai" className="h-full">
                  <ChatbotSideBarSettings form={form} id={id} />
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
