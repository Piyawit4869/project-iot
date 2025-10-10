import React from "react";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouteLoaderData, useSearchParams } from "react-router";
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
import { useChat, type Message } from "~/providers/chat/useChat";
import { socketConfig } from "~/lib/sockets";

interface OpenAiContainerSettingsChatBotProps {
  api: string;
}

export const OpenAiContainerSettingsChatBot: React.FC<
  OpenAiContainerSettingsChatBotProps
> = (props) => {
  const { api } = props;

  const params = useParams();
  const id = (params?.id as string) ?? "";

  const { mutate: UpdateConnectionAi } = useUpdateConnectionAi(String(id));
  const { refetch: refetchChatAI } = useGetConnectionAi(String(id));

  const { data } = useGetConnectionAi(id ?? "");

  const { addMessage } = useChat();

  const { user_data } = useRouteLoaderData("root");

  const [autoScroll, setAutoScroll] = React.useState<boolean>(true);

  const [
    firstTimeMessage,
    // setFirstTimeMessage
  ] = React.useState<string>("");

  const form = useForm<ConnectAiValues>({
    resolver: zodResolver(ConnectAiSchema) as Resolver<ConnectAiValues>,
  });

  const onSubmit = (data: ConnectAiValues) => {
    GlobalModal.info({
      title: "ยืนยันการบันทึกการตั้งค่า AI Assistant",
      description: "คุณต้องการบันทึกค่าการเชื่อมต่อ AI Assistant ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังบันทึกการเชื่อมต่อ...");
        UpdateConnectionAi(data, {
          onSuccess: () => {
            toast.success("บันทึกการเชื่อมต่อสำเร็จ !", {
              id: toastId,
              duration: 2500,
              position: "bottom-right",
            });
            refetchChatAI();
          },
          onError: (error) => {
            console.error("Remove inventory error:", error);
            toast.error("เกิดข้อผิดพลาดขณะบันทึกการเชื่อมต่อ", {
              id: toastId,
            });
          },
        });
      },
    });
  };

  const assistantName = form.watch("name");

  React.useEffect(() => {
    if (data) {
      form.reset({
        id: data?.id ?? "",
        active: data?.active ?? true,
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

    // ✅ Join chat room (detail)
    if (data?.id) {
      socket.emit("chatAI", `${data.id}`);
    }

    // ✅ Listen for new messages
    socket.on("chatAI", (msg: Message) => {
      addMessage({
        ...msg,
      });
    });

    // ❌ Don't forget to clean up!
    return () => {
      socket.disconnect();
    };
  }, [user_data]);

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
          >
            บันทึก
          </Button>,
        ]}
      />
      <div className="flex h-full w-full bg-muted/40 relative px-2">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={50}>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} id="config-ai">
                <ChatbotSideBarSettings form={form} id={id} />
              </form>
            </FormProvider>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={25}>
            <div className="flex-1 overflow-y-auto">
              <div className="flex-1 flex flex-col bg-background justify-between">
                <div className="border-b px-4 py-2 flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-lg">{assistantName}</h2>
                </div>
                {/* {isFirstTimeAI && !currentCustomer?.chatRoomAssistantId ? (
                  <HeroSearch onInputChange={handleFirstTimeAISearch} />
                ) : ( */}
                <ChatBotChatMessagesAndConfig
                  chatRoomId={data?.chatRoomId}
                  searchPrompt={firstTimeMessage}
                  data={data}
                  autoScroll={autoScroll}
                  setAutoScroll={setAutoScroll}
                />
                {/* <ChatInput /> */}
                {/* <ChatInputAITest
                    chatRoomId={data?.chatRoomId}
                    isAILoading={false}
                  /> */}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
