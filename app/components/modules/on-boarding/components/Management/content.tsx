import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import Toolbar from "./editor-toolbar/toolbar";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { Trash } from "lucide-react";
import type { ContentProps } from "~/schemas/on-boarding/onboard";

export const Content: React.FC<ContentProps> = ({ onDelete }) => {
  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10">
        {onDelete && (
          <div
            className="inline-flex absolute top-2 right-2 text-red-700 cursor-pointer"
            onClick={onDelete}
          >
            <Trash className="h-5 w-5" />
            &nbsp;ลบ
          </div>
        )}
      </div>
      <LexicalComposer
        initialConfig={{
          namespace: "editor",
          nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            LinkNode,
          ],
          onError(error) {
            console.error(error);
          },
        }}
      >
        <div className="rounded-md border bg-white shadow-sm">
          <Toolbar />
          <div className="border-t" />

          <RichTextPlugin
            contentEditable={
              <ContentEditable className="editor min-h-[300px] p-4 focus:outline-none" />
            }
            placeholder={
              <div className="absolute top-10 left-0 p-4 text-gray-400 pointer-events-none">
                พิมพ์เนื้อหาที่ต้องการ..
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </LexicalComposer>
    </div>
  );
};
