import { Plus, Tags, X } from "lucide-react";
import { GlobalTagsBadge } from "~/components/shared/global-tags";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

type Tag = {
  id?: string;
  name: string;
};

type TagManagerModalProps = {
  open: boolean;
  title: string;

  inputValue: string;
  onInputChange: (v: string) => void;

  selectedTags: any;
  availableTags?: Tag[];

  onAddTag: (tag: any) => void;
  onRemoveTag: (tag: any) => void;

  /** optional สำหรับกรณีสร้างแท็ก */
  onCreateTag?: (name: string) => void;

  onClose: () => void;
  onSubmit: () => void;

  loading?: boolean;
  handleInputKeyDown?: any;
};

export const TagManagerModal: React.FC<TagManagerModalProps> = ({
  open,
  title,
  inputValue,
  onInputChange,
  selectedTags,
  availableTags,
  onAddTag,
  onRemoveTag,
  onCreateTag,
  onClose,
  onSubmit,
  loading,
  handleInputKeyDown,
}) => {
  // const defaultTags = [
  //   { id: 1, name: "ลูกค้า VIP", active: true },
  //   { id: 2, name: "ลูกค้าใหม่", active: true },
  //   { id: 3, name: "ลูกค้าประจำ", active: true },
  //   { id: 4, name: "ลูกค้าที่สนใจ", active: true },
  //   { id: 5, name: "ลูกค้าไม่เคลื่อนไหว", active: false },
  //   { id: 6, name: "ใช้โปรโมชั่น", active: true },
  //   { id: 7, name: "มียอดซื้อสูง", active: true },
  //   { id: 8, name: "มีประวัติร้องเรียน", active: false },
  //   { id: 9, name: "ลูกค้าขายส่ง", active: true },
  //   { id: 10, name: "ลูกค้าปลีก", active: true },
  //   { id: 11, name: "สมาชิก", active: true },
  //   { id: 12, name: "Walk-in", active: true },
  // ];
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div className="flex items-center gap-2">
            <Tags className="w-5 h-5" />
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Add / Search */}
          <div>
            <h3 className="text-sm font-semibold mb-3">เพิ่มแท็ก</h3>

            <input
              disabled={loading}
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="เพิ่มแท็ก..."
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-gray-700"
            />

            {/* {onCreateTag && inputValue && (
              <Button
                type="button"
                variant="ghost"
                className="mt-2 w-full justify-start"
                onClick={() => onCreateTag(inputValue)}
              >
                <Plus className="w-4 h-4 mr-2" />
                สร้างแท็กใหม่: {inputValue}
              </Button>
            )} */}
          </div>

          <Separator />

          {/* Selected */}
          <div>
            <h3 className="text-sm font-semibold mb-3">แท็กที่เลือก</h3>
            <div className="flex flex-wrap gap-2">
              {selectedTags.length === 0 ? (
                <p className="text-sm text-gray-400 italic">
                  ยังไม่ได้เลือกแท็ก
                </p>
              ) : (
                selectedTags.map((tag: any) => (
                  <GlobalTagsBadge
                    key={tag.id ?? tag.name}
                    value={tag.name}
                    showIcon
                    onClick={() => onRemoveTag(tag)}
                  />
                ))
              )}
            </div>
          </div>

          <Separator />

          {/* Available */}
          <div>
            <h3 className="text-sm font-semibold mb-3">แท็กที่มีอยู่</h3>
            <div className="flex flex-wrap gap-2">
              {availableTags?.map((tag) => (
                <GlobalTagsBadge
                  key={tag.id}
                  value={tag.name}
                  showIcon={false}
                  onClick={() => onAddTag(tag)}
                />
              ))}
              {/* {defaultTags?.map((tag) => (
                <GlobalTagsBadge
                  key={tag.id ?? tag.name}
                  value={tag.name}
                  showIcon={false}
                  onClick={() => onAddTag(tag)}
                />
              ))} */}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 flex gap-3 border-t">
          <Button variant="secondary" className="w-1/2" onClick={onClose}>
            ยกเลิก
          </Button>

          <Button className="w-1/2" type="submit" onClick={onSubmit}>
            บันทึก
          </Button>
        </div>
      </div>
    </div>
  );
};
