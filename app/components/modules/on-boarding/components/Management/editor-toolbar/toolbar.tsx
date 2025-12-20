import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $insertNodes,
} from "lexical";
import { $patchStyleText } from "@lexical/selection";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import ToolbarButton from "./toolbar-button";
import ToolbarDivider from "./toolbar-divider";
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  ListX,
  Link,
  ImagePlus,
  TextAlignStart,
  TextAlignCenter,
  TextAlignEnd,
  Baseline,
  Code,
} from "lucide-react";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import FontSizeSelect from "./font-size-select";
import { useRef } from "react";
import { $createImageNode } from "../image-node";
import { $getNearestNodeOfType } from "@lexical/utils";
import { ListNode } from "@lexical/list";

type Action = "unordered" | "ordered" | "remove";

type ToolbarProps = {
  onSelectImage: (url: string) => void;
};

const Toolbar: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  const [action, setAction] = useState<Action>("remove");

  const handleChangeAlign = (newAlign: "left" | "center" | "right") => {
    setAlign(newAlign);
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, newAlign);
  };

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsActive(selection.hasFormat("code"));
        }
      });
    });
  }, [editor]);

  const iconMap = {
    left: <TextAlignStart className="h-4 w-4" />,
    center: <TextAlignCenter className="h-4 w-4" />,
    right: <TextAlignEnd className="h-4 w-4" />,
    link: <Link className="h-4 w-4" />,
    unordered: <List className="h-4 w-4" />,
    ordered: <ListOrdered className="h-4 w-4" />,
    remove: <ListX className="h-4 w-4" />,
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    editor.update(() => {
      const imageNode = $createImageNode(imageUrl);
      $insertNodes([imageNode]);
    });
  };

  const handleCycleAction = () => {
    editor.focus();

    if (action === "remove") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      setAction("unordered");
      return;
    }

    if (action === "unordered") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      setAction("ordered");
      return;
    }

    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    setAction("remove");
  };

  return (
    <div className="flex items-center gap-1 px-2 py-1">
      <ToolbarButton
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      >
        <Undo2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      >
        <Redo2 className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarDivider />
      <FontSizeSelect />
      <ToolbarDivider />

      <ToolbarButton>
        <Baseline className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
      >
        <Underline className="h-4 w-4" />
      </ToolbarButton>

      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
        className={`
        p-2 rounded
        transition
        ${
          isActive
            ? "bg-gray-900 text-white"
            : "hover:bg-gray-200 text-gray-600"
        }
      `}
      >
        <Code className="h-4 w-4" />
      </button>

      <button
        type="button"
        className="p-2 rounded hover:bg-gray-100"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleCycleAction();
        }}
      >
        {iconMap[action]}
      </button>

      <button
        className="p-2"
        onClick={() =>
          handleChangeAlign(
            align === "left" ? "center" : align === "center" ? "right" : "left"
          )
        }
      >
        {iconMap[align]}
      </button>

      <ToolbarDivider />
      <ToolbarButton>
        <Link className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton onClick={() => inputRef.current?.click()}>
        <ImagePlus className="h-4 w-4" />
      </ToolbarButton>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleSelectFile}
      />
    </div>
  );
};

export default Toolbar;
