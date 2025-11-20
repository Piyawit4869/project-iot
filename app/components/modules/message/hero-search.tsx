import * as React from "react";
import { Button } from "~/components/ui/button";
import { ArrowRight, FileImage, Loader2, Send } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";

interface HeroSearchProps {
  onInputChange: (value: string) => void;
}

// Full-bleed hero with centered headline + pill search bar
export default function HeroSearch(props: HeroSearchProps) {
  const { onInputChange } = props;

  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null);

  const [query, setQuery] = React.useState("");

  const onSend = () => {
    // TODO: wire to your search/route action

    onInputChange(query);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-495px)] border-1 rounded-sm bg-white dark:bg-background">
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
          <div className="h-[calc(100vh-625px)]"></div>
          <div>
            <form
              onSubmit={onSend}
              className="flex flex-col justify-between gap-2 border-t w-full h-[100px]"
            >
              <textarea
                placeholder="สอบถาม AI ได้เลย"
                className="flex-1 w-full resize-none overflow-auto p-2 border-0 rounded-md outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={1}
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
