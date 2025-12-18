import { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { $patchStyleText } from "@lexical/selection";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import ToolbarButton from "./toolbarbutton";
import ToolbarDivider from "./toolbardivider";
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
import FontSizeSelect from "./toolbarselect";

type Action = "unordered" | "ordered" | "remove";

const Toolbar: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  const [action, setAction] = useState<Action>("unordered");

  const handleChangeAlign = (newAlign: "left" | "center" | "right") => {
    setAlign(newAlign);
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, newAlign);
  };

  const iconMap = {
    left: <TextAlignStart className="h-4 w-4" />,
    center: <TextAlignCenter className="h-4 w-4" />,
    right: <TextAlignEnd className="h-4 w-4" />,
    link: <Link className="h-4 w-4" />,
    unordered: <List className="h-4 w-4" />,
    ordered: <ListOrdered className="h-4 w-4" />,
    remove: <ListX className="h-4 w-4" />,
  };

  const handleCycleAction = () => {
    const order: Action[] = ["unordered", "ordered", "remove"];
    const currentIndex = order.indexOf(action);
    const nextIndex = (currentIndex + 1) % order.length;
    const nextAction = order[nextIndex];
    setAction(nextAction);

    switch (nextAction) {
      case "unordered":
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        break;
      case "ordered":
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        break;
      case "remove":
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        break;
    }
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

      <ToolbarButton
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $patchStyleText(selection, {
                backgroundColor: "#fff3a0",
              });
            }
          });
        }}
      >
        <Code className="h-4 w-4" />
      </ToolbarButton>

      <button className="p-2" onClick={handleCycleAction}>
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
      <ToolbarButton
        onClick={() =>
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://example.com")
        }
      >
        <Link className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton>
        <ImagePlus className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
};

export default Toolbar;
