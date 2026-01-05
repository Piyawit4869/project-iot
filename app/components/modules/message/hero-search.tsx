import * as React from "react";
import { Button } from "~/components/ui/button";
import { ShoppingBag, MessageCircle, Handshake, Send } from "lucide-react";

interface HeroSearchProps {
  onInputChange: (value: string) => void;
}

// Full-bleed hero with centered headline + pill search bar
export default function HeroSearch(props: HeroSearchProps) {
  const { onInputChange } = props;

  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null);

  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const [query, setQuery] = React.useState("");

  const salePrompts = [
    {
      id: "recommend",
      label: "ช่วยแนะนำสินค้า",
      value: "ช่วยแนะนำสินค้าให้ลูกค้า พร้อมจุดเด่นและประโยชน์",
      icon: ShoppingBag,
      bg: "bg-blue-50 dark:bg-blue-950",
      hover: "hover:bg-blue-100 dark:hover:bg-blue-900",
      text: "text-blue-700 dark:text-blue-300 text-sm",
    },
    {
      id: "close-sale",
      label: "ช่วยปิดการขาย",
      value: "ช่วยเขียนข้อความปิดการขายให้ลูกค้าน่าสนใจ",
      icon: MessageCircle,
      bg: "bg-green-50 dark:bg-green-950",
      hover: "hover:bg-green-100 dark:hover:bg-green-900",
      text: "text-green-700 dark:text-green-300 text-sm",
    },
    {
      id: "reply-customer",
      label: "ช่วยตอบลูกค้า",
      value: "ช่วยตอบแชทลูกค้าอย่างสุภาพและเป็นมืออาชีพ",
      icon: Handshake,
      bg: "bg-purple-50 dark:bg-purple-950",
      hover: "hover:bg-purple-100 dark:hover:bg-purple-900",
      text: "text-purple-700 dark:text-purple-300 text-sm",
    },
  ];

  const onSend = (value?: string) => {
    // TODO: wire to your search/route action

    onInputChange(value ?? "");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-550px)] border border-b-0 bg-white dark:bg-background">
      <div
        className="flex flex-1 flex-col"
        style={{
          height: 400,
        }}
      >
        <div
          ref={scrollAreaRef}
          className="flex h-full flex-col space-y-6 overflow-y-auto px-2 z-0 relative  "
        >
          <div className="h-[calc(100vh-669px)]">
            <div className="h-[calc(100vh-669px)] flex flex-col items-center justify-center gap-3">
              {salePrompts.map((prompt) => {
                const Icon = prompt.icon;

                return (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => {
                      setQuery(prompt.value);

                      onSend(prompt.value);
                      textareaRef.current?.focus();
                    }}
                    className={`
                      w-1/2 max-w-sm rounded-xl border px-4 py-3 flex items-center gap-3 transition ${prompt.bg} ${prompt.hover}`}
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${prompt.text}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className={`font-sm ${prompt.text}`}>
                      {prompt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <form
              onSubmit={() => onSend()}
              className="flex flex-col justify-between gap-2 border-t w-full h-[100px]"
            >
              <textarea
                placeholder="สอบถาม AI ได้เลย"
                className="flex-1 w-full resize-none overflow-auto p-2 border-0 rounded-md outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={1}
                ref={textareaRef}
                onInput={(e) => {
                  const textarea = e.target as HTMLTextAreaElement;
                  textarea.style.height = "auto";
                  textarea.style.height = `${textarea.scrollHeight}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    onSend();
                    const textarea = e.target as HTMLTextAreaElement;

                    textarea.style.height = `50px`;
                  }
                }}
              />

              <div className="flex justify-end">
                <Button
                  size="icon"
                  type="submit"
                  // disabled={isPending}
                >
                  {/* {isPendingAI || isAILoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : ( */}
                  <Send className="w-4 h-4" />
                  {/* )} */}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
