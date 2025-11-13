import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCreateTag } from "~/api/client/customer/useCustomer";

interface TagItem {
  id: string;
  name: string;
}

interface ChatCustomerTagsProps {
  title: string;
  selectedTags: TagItem[];
  availableTags: TagItem[];
  onTagsChange: (tags: TagItem[]) => void;
  onClose: () => void;
  handleSubmit: () => void;
}

export function ChatCustomerTags({
  title,
  selectedTags,
  availableTags,
  onTagsChange,
  onClose,
  handleSubmit,
}: ChatCustomerTagsProps) {
  const selectedTagsId = selectedTags.map((t) => t.id);

  const { mutate, isPending } = useCreateTag();
  const [inputValue, setInputValue] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [onClose]);

  const handleRemoveTag = (tagId: string) => {
    const updated = selectedTags.filter((t) => t.id !== tagId);
    onTagsChange(updated);
  };

  const handleAddTag = (tagNameOrId: string) => {
    const existingTag =
      availableTags.find((t) => t.id === tagNameOrId) ||
      availableTags.find((t) => t.name === tagNameOrId);

    if (existingTag) {
      if (!selectedTagsId.includes(existingTag.id)) {
        onTagsChange([...selectedTags, existingTag]);
      }
      return;
    }

    mutate(
      { active: true, name: tagNameOrId },
      {
        onSuccess: (values) => {
          onTagsChange([
            ...selectedTags,
            {
              id: values.id,
              name: values.name,
            },
          ]);
        },
        onError: () => {},
      }
    );
  };

  /** กด Enter เพื่อเพิ่มแท็กใหม่ */
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      handleAddTag(inputValue.trim());
      setInputValue("");
    }
  };

  const remainingTags = availableTags.filter(
    (tag) => !selectedTagsId.includes(tag.id)
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Selected tags */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-3">
              เลือกแท็ก
            </h3>
            <div className="border border-slate-300 rounded-lg p-4 bg-slate-50">
              <div className="flex flex-wrap gap-2 mb-3 min-h-10">
                {selectedTags.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">
                    ไม่มีแท็กที่เลือก
                  </p>
                ) : (
                  selectedTags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition-colors"
                    >
                      <span className="text-sm font-medium">{tag.name}</span>
                      <button
                        onClick={() => handleRemoveTag(tag.id)}
                        className="p-0.5 hover:bg-slate-600 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
              <div className="relative">
                <input
                  disabled={isPending}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="ใส่แท็ก..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Existing tags */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-3">
              แท็กที่มีอยู่
            </h3>
            <div className="flex flex-wrap gap-2">
              {remainingTags.length === 0 ? (
                <p className="text-sm text-slate-400 italic">
                  เลือกแท็กทั้งหมดแล้ว
                </p>
              ) : (
                remainingTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => handleAddTag(tag.id)}
                    className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors text-sm font-medium"
                  >
                    {tag.name}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 bg-slate-50 border-t border-slate-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition-all font-medium"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all font-medium"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
