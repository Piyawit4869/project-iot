import { Tags, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCreateTag } from "~/api/client/customer/useCustomer";
import GlobalButton from "~/components/shared/global-button";
import { GlobalTagsBadge } from "~/components/shared/global-tags";
import { Separator } from "~/components/ui/separator";
import { TagManagerModal } from "./TagManagerModal";

export interface TagItem {
  id: string;
  name: string;
}

interface ChatCustomerTagsProps {
  title?: string;
  selectedTags?: TagItem[];
  availableTags?: TagItem[];
  onTagsChange?: (tags: any[]) => void;
  onClose?: () => void;
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
  const selectedTagsId = selectedTags?.map((t) => t.id);

  const { mutate, isPending } = useCreateTag();
  const [inputValue, setInputValue] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [onClose]);

  const handleRemoveTag = (tagId: string) => {
    const updated = selectedTags?.filter((t) => t.id !== tagId);
    onTagsChange?.(updated || []);
  };

  const handleAddTag = (tagNameOrId: string) => {
    const existingTag =
      availableTags?.find((t) => t.id === tagNameOrId) ||
      availableTags?.find((t) => t.name === tagNameOrId);

    if (existingTag) {
      if (!selectedTagsId?.includes(existingTag.id)) {
        onTagsChange?.([...(selectedTags || []), existingTag]);
      }
      return;
    }

    mutate(
      { active: true, name: tagNameOrId },
      {
        onSuccess: (values) => {
          onTagsChange?.([
            ...(selectedTags || []),
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

  const remainingTags = availableTags?.filter(
    (tag) => !selectedTagsId?.includes(tag.id)
  );

  return (
    <>
      <TagManagerModal
        open={true} // หรือรับจาก props
        title={title ?? "เลือกหรือสร้างแท็ก"}
        inputValue={inputValue}
        onInputChange={setInputValue}
        selectedTags={selectedTags ?? []}
        availableTags={remainingTags ?? []}
        handleInputKeyDown={handleInputKeyDown}
        loading={isPending}
        onAddTag={(tag) => handleAddTag(tag.id)}
        onRemoveTag={(tag) => handleRemoveTag(tag.id)}
        onCreateTag={(name) => {
          handleAddTag(name);
          setInputValue("");
        }}
        onClose={onClose || (() => {})}
        onSubmit={handleSubmit}
      />
      {/* <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div
          ref={modalRef}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <div className="flex flex-row gap-2 items-center">
              <Tags className="w-5 h-5" />
              <h2 className="text-xl font-semibold text-gray-800 ">{title}</h2>
            </div>

            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="px-6 py-6 max-h-[70vh] overflow-y-auto space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                เพิ่มแท็ก
              </h3>
              <div className="relative mb-3">
                <input
                  disabled={isPending}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="ใส่แท็ก..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                />
              </div>
              <div className="mt-5  ">
                <div className="flex flex-wrap gap-2 mb-3  ">
                  {selectedTags?.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">
                      ไม่มีแท็กที่เลือก
                    </p>
                  ) : (
                    selectedTags?.map((tag) => (
                      <>
                        {" "}
                        <GlobalTagsBadge
                          key={tag.id}
                          value={tag.name}
                          showIcon
                          onClick={() => handleRemoveTag(tag.id)}
                        />
                      </>
                    ))
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                เลือกแท็กที่มีอยู่
              </h3>
              <div className="flex flex-wrap gap-2">
                {remainingTags?.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">
                    เลือกแท็กทั้งหมดแล้ว
                  </p>
                ) : (
                  remainingTags?.map((tag) => (
                    <GlobalTagsBadge
                      key={tag.id}
                      value={tag.name}
                      onClick={() => handleAddTag(tag.id)}
                      showIcon={false}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-5  flex gap-3">
            <div className="w-[50%]">
              {" "}
              <GlobalButton
                onClick={onClose}
                label="ยกเลิก"
                variant="secondary"
                className=""
              />
            </div>

            <div className="w-[50%]">
              <GlobalButton onClick={handleSubmit} label="บันทึก" />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
