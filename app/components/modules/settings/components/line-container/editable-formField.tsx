import { Copy, Save, X } from "lucide-react";
import React from "react";
import GlobalButton from "~/components/shared/global-button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { cn, copyTextToClipboard } from "~/lib/utils";
import type { ConnectLineValues } from "~/schemas/settings";

type EditableFormFieldProps = {
  label: string;
  placeholder?: string;
  edit?: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (value: any) => void;
  field: any;
  masked?: boolean;
  showCopy?: boolean;
  isEdit?: boolean;
};

const maskValue = (value?: string, show = 4) => {
  if (!value) return "";
  if (value.length <= show) return "*".repeat(value.length);
  return value.slice(0, show) + "*".repeat(value.length - show);
};

export function EditableFormField({
  label,
  placeholder,
  edit,
  onEdit,
  field,
  masked,
  onCancel,
  onSave,
  showCopy,
  isEdit,
}: EditableFormFieldProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (value: string) => {
    const success = await copyTextToClipboard(value || "");
    setCopied(success);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <FormItem className="flex flex-row w-full items-start">
      <FormLabel className="w-70 mt-3">
        {label}{" "}
        {showCopy && (
          <button
            type="button"
            onClick={() => handleCopy(field.value)}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            {copied ? (
              <span className="text-[#b4b4c5] text-xs">คัดลอกแล้ว</span>
            ) : (
              <div className="flex flex-row gap-2">
                <Copy size={16} /> <span>คัดลอก</span>
              </div>
            )}
          </button>
        )}
      </FormLabel>

      <FormControl>
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center">
            <Input
              placeholder={placeholder}
              disabled={edit}
              value={masked && edit ? maskValue(field.value) : field.value}
              onChange={field.onChange}
              className={cn(
                "shadow-none max-w-[50%]",
                edit
                  ? "border-0 bg-transparent text-muted-foreground"
                  : "border border-input text-foreground"
              )}
            />
          </div>

          {isEdit ? (
            <GlobalButton
              variant="secondary"
              label="แก้ไข"
              width="5%"
              className="ml-2 mt-3"
              onClick={onEdit}
            />
          ) : (
            <div className="flex flex-row mt-4">
              {" "}
              <div
                className={`edit-icon-container   cursor-pointer }`}
                onClick={onCancel}
              >
                <div className="edit-icon-wrapper">
                  <X size={20} />
                </div>
              </div>
              <div
                className={`edit-icon-container    cursor-pointer`}
                onClick={onSave}
              >
                <div className="edit-icon-wrapper">
                  <Save size={20} className="edit-icon" />
                </div>
              </div>
            </div>
          )}
        </div>
      </FormControl>

      <FormMessage />
    </FormItem>
  );
}
