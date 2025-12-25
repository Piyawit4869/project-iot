"use client";

import React from "react";
import { Plus } from "lucide-react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { GlobalTagsBadge } from "./global-tags";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { TagManagerModal } from "../modules/message/TagManagerModal";
import {
  useCreateTag,
  useCustomer,
  useGetAllTags,
  useUpdateCustomerTags,
} from "~/api/client/customer/useCustomer";
import { ChatCustomerTags } from "../modules/message/chat-customer-tags";
import { GlobalModal } from "./modal/modal";
import { toast } from "sonner";
import { useParams } from "react-router";

interface TagsSelectorModalProps {
  form: any;
}

type Tag = {
  id: string;
  name: string;
};

export const TagsSelectorModal: React.FC<TagsSelectorModalProps> = ({
  form,
}) => {
  const initialTags = form.getValues("tags") ?? [];
  const customerId = useParams<{ id: string }>();
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);
  const { data: customerSingle, refetch } = useCustomer(customerId.id ?? "");
  const { mutate: updateTags } = useUpdateCustomerTags(customerSingle?.id);

  const { data: allTags = [] } = useGetAllTags();
  const { mutate: createTag, isPending } = useCreateTag();

  /* =========================
   * DERIVED DATA
   ========================= */
  const availableTags: Tag[] = allTags.map((t: any) => ({
    id: t.id,
    name: t.name,
  }));

  const availableTagObjects = availableTags.filter(
    (t) => !selectedTags.some((s) => s.id === t.id)
  );

  /* =========================
   * HANDLERS
   ========================= */

  const handleToggleTag = (tag: Tag) => {
    setSelectedTags((prev) => {
      const exists = prev.some((t) => t.id === tag.id);
      return exists ? prev.filter((t) => t.id !== tag.id) : [...prev, tag];
    });
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags((prev) => prev.filter((t) => t.id !== tagId));
  };

  const handleDeleteTag = (tagId: string) => {
    const updated = selectedTags.filter((t) => t.id !== tagId);
    setSelectedTags(updated);

    form.setValue(
      "tags",
      updated.map((t) => ({
        id: t.id,
        name: t.name,
        active: true,
      }))
    );
  };

  const handleCreateTag = (name: string) => {
    if (!name.trim()) return;
    createTag(
      { active: true, name },
      {
        onSuccess: (created) => {
          setSelectedTags((prev) => [
            ...prev,
            { id: created.id, name: created.name },
          ]);
          setInputValue("");
        },
      }
    );
  };

  const handleAddTag = (nameOrId: string) => {
    const existing =
      availableTags.find((t) => t.id === nameOrId) ||
      availableTags.find((t) => t.name === nameOrId);

    if (existing) {
      handleToggleTag(existing);
      return;
    }

    handleCreateTag(nameOrId);
  };

  const handleSave = () => {
    form.setValue(
      "tags",
      selectedTags.map((t) => ({
        id: t.id,
        name: t.name,
        active: true,
      }))
    );
    setOpen(false);
  };

  const handleSubmitTags = () => {
    GlobalModal.info({
      title: "เพิ่มแท็กของลูกค้า",
      description: "คุณต้องการเพิ่มแท็กของลูกค้า ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังเพิ่มแท็กของลูกค้า...");

        updateTags(
          {
            tags: selectedTags.map((t) => ({
              id: t.id,
              active: true,
            })),
          },
          {
            onSuccess: () => {
              toast.success("เพิ่มแท็กของลูกค้าเรียบร้อยแล้ว!", {
                id: toastId,
              });
              refetch();
              setOpen(false);
            },
            onError: () => {
              toast.error("ไม่สามารถเพิ่มแท็กของลูกค้า", { id: toastId });
            },
          }
        );
      },
    });
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      handleAddTag(inputValue.trim());
      setInputValue("");
    }
  };

  /* =========================
   * INIT
   ========================= */
  React.useEffect(() => {
    setSelectedTags(
      initialTags.map((t: any) => ({
        id: t.id,
        name: t.name,
      }))
    );
  }, [initialTags]);

  /* =========================
   * RENDER
   ========================= */
  return (
    <>
      <FormField
        control={form.control}
        name="tags"
        render={() => (
          <FormItem>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <GlobalTagsBadge
                    key={tag.id}
                    value={tag.name}
                    onClick={() => handleDeleteTag(tag.id)}
                  />
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setOpen(true)}
                >
                  แก้ไขแท็ก
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <TagManagerModal
        open={open}
        title="เลือกหรือสร้างแท็ก"
        inputValue={inputValue}
        onInputChange={setInputValue}
        handleInputKeyDown={handleInputKeyDown}
        selectedTags={selectedTags}
        availableTags={availableTagObjects}
        loading={isPending}
        onAddTag={(tag) => handleToggleTag(tag)}
        onRemoveTag={(tag) => handleRemoveTag(tag.id)}
        onCreateTag={handleCreateTag}
        onClose={() => setOpen(false)}
        onSubmit={customerId.id ? handleSubmitTags : handleSave}
      />
    </>
  );
};
