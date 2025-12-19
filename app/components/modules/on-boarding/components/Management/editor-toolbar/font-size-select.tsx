import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { $patchStyleText } from "@lexical/selection";

const FONT_SIZES = ["12px", "16px", "20px", "24px", "32px"];

const FontSizeSelect = () => {
  const [editor] = useLexicalComposerContext();
  const [fontSize, setFontSize] = useState<string>("");

  const updateFontSize = () => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) {
        setFontSize("");
        return;
      }

      const node = selection.anchor.getNode();
      if ($isTextNode(node)) {
        const size = node.getStyle()?.match(/font-size:\s*([^;]+)/)?.[1] ?? "";
        setFontSize(size);
      } else {
        setFontSize("");
      }
    });
  };

  useEffect(() => {
    const unregisterSelection = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateFontSize();
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    const unregisterUpdate = editor.registerUpdateListener(() => {
      updateFontSize();
    });

    return () => {
      unregisterSelection();
      unregisterUpdate();
    };
  }, [editor]);

  const applyFontSize = (size: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      $patchStyleText(selection, {
        "font-size": size,
      });
    });
  };

  const displayValue = FONT_SIZES.includes(fontSize) ? fontSize : "";

  return (
    <select
      value={displayValue}
      onChange={(e) => applyFontSize(e.target.value)}
      className="px-2 py-1 border rounded text-sm"
    >
      <option value="">Font size</option>
      {FONT_SIZES.map((size) => (
        <option key={size} value={size}>
          {size.replace("px", "")}
        </option>
      ))}
    </select>
  );
};

export default FontSizeSelect;
