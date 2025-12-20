import { Save, PenLine, X } from "lucide-react";

interface EditActionButtonsProps {
  isEdit?: boolean;
  disabled?: boolean;
  isAnyFilled?: boolean;
  form?: any;
  onSave?: (value?: any) => void;
  onEdit?: (value?: any) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export function EditActionButtons({
  isEdit,
  disabled = false,
  isAnyFilled = false,
  onSave,
  onEdit,
  form,
  loading,
  onCancel,
}: EditActionButtonsProps) {
  // logic ของ disable สำหรับปุ่มนี้
  const disableSave = disabled || isAnyFilled;
  const disableEdit = disabled;
  const disableCancel = disabled;

  return (
    <div className="ml-auto flex flex-row gap-3 text-muted-foreground">
      {isEdit ? (
        <div
          className={`edit-icon-container ${
            disableSave ? "pointer-events-none opacity-40" : "cursor-pointer"
          }`}
          onClick={
            disableSave
              ? undefined
              : form?.handleSubmit((values: any) => {
                  onSave?.(values);
                })
          }
        >
          <div className="edit-icon-wrapper">
            <Save size={20} className="edit-icon" />
          </div>
        </div>
      ) : (
        <div
          className={`edit-icon-container ${
            disableEdit ? "pointer-events-none opacity-40" : "cursor-pointer"
          }`}
          onClick={!disableEdit ? onEdit : undefined}
        >
          <div className="edit-icon-wrapper">
            <PenLine size={20} />
          </div>
        </div>
      )}

      {isEdit && (
        <div
          className={`edit-icon-container ${
            disableCancel ? "pointer-events-none opacity-40" : "cursor-pointer"
          }`}
          onClick={!disableCancel ? onCancel : undefined}
        >
          <div className="edit-icon-wrapper">
            <X size={20} />
          </div>
        </div>
      )}
    </div>
  );
}
