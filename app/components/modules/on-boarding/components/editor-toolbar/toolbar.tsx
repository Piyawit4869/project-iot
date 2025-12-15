import React, { useRef } from "react";
import ToolbarButton from "./toolbarbutton";
import ToolbarDivider from "./toolbardivider";
import ToolbarSelect from "./toolbarselect";
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  List,
  ImagePlus,
  Trash,
  Link,
} from "lucide-react";

const Toolbar: React.FC = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <div className="flex items-center gap-1 px-2 py-1">
        <ToolbarButton>
          <Undo2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton>
          <Redo2 className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarSelect />

        <ToolbarDivider />

        <ToolbarButton>
          <span className="text-sm font-semibold">A</span>
        </ToolbarButton>
        <ToolbarButton onClick={() => document.execCommand("bold")}>
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => document.execCommand("italic")}>
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => document.execCommand("underline")}>
          <Underline className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton>
          <Link className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => document.execCommand("insertUnorderedList")}
        >
          <List className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton>
          <ImagePlus className="h-4 w-4" />
        </ToolbarButton>
      </div>

      <div className="border-t" />

      <div
        ref={editorRef}
        contentEditable
        data-placeholder="ใส่เนื้อหาเนื้อหาที่นี่..."
        className="relative min-h-[300px] p-4
                   focus:outline-none
                   empty:before:content-[attr(data-placeholder)]
                   empty:before:text-gray-400"
        suppressContentEditableWarning
      />

      <div className="flex items-center border-t px-10 py-2">
        <div className="ml-auto inline-flex items-center text-red-700 cursor-pointer">
          <Trash className="h-5 w-5" />
          &nbsp;ลบ
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
