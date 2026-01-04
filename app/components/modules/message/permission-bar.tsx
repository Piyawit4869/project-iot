import { X } from "lucide-react";

interface PermissionBarProps {
  onAllow: () => void;
  visible: boolean;

  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PermissionBar({
  onAllow,
  visible,
  setVisible,
}: PermissionBarProps) {
  if (!visible) return null;

  return (
    <div
      className="w-full h-full flex items-center justify-between gap-3 px-4 py-2 text-sm
      bg-gray-50 border-b border-amber-200 text-amber-900"
    >
      <div className="flex items-center gap-2">
        <span>ℹ️</span>
        <span>
          โปรดอนุญาตให้ ROME Platform ส่งงานแจ้งเตือนได้โดย{" "}
          <span className="underline cursor-pointer" onClick={onAllow}>
            ตั้งค่ารับการแจ้งเตือนบนบราวเซอร์
          </span>
        </span>
      </div>

      <button onClick={() => setVisible(false)} className="hover:opacity-70">
        <X size={16} />
      </button>
    </div>
  );
}
