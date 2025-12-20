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

export const TagsSelectorModal: React.FC<TagsSelectorModalProps> = ({
  form,
}) => {
  const initialTags = form.getValues("tags") ?? [];
  const customerId = useParams<{ id: string }>();
  const [inputValue, setInputValue] = React.useState("");

  const {
    data: customerSingle,
    isLoading,
    refetch,
  } = useCustomer(customerId.id ?? "");
  const { mutate: updateTags } = useUpdateCustomerTags(customerSingle?.id);

  const { data: allTags } = useGetAllTags();
  const { mutate, isPending } = useCreateTag();

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [showTagManager, setShowTagManager] = React.useState(false);

  const availableTags =
    allTags && allTags.length
      ? allTags
          .filter((a: any, index: number) => index < 20)
          .map((b: any) => {
            return { name: b.name, id: b.id };
          })
      : [];
  const remainingTags = availableTags?.filter(
    (tag: any) => !selectedTags?.includes(tag.id)
  );
  /* =========================
   * HANDLERS (string-based)
   ========================= */
  const handleToggleTag = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName]
    );
  };

  const handleRemoveTag = (tagId: string) => {
    const updated = selectedTags?.filter((t) => t !== tagId);
    setSelectedTags?.(updated || []);
  };

  const handleDeleteTag = (tagName: string) => {
    const updated = selectedTags.filter((t) => t !== tagName);
    setSelectedTags(updated);

    form.setValue(
      "tags",
      updated.map((t) => ({ name: t, active: true }))
    );
  };

  const handleCreateTag = (name: string) => {
    if (!name) return;
    handleToggleTag(name);
    setSearch("");
    mutate(
      { active: true, name: name },
      {
        onSuccess: (values) => {
          setSelectedTags?.([...(selectedTags || []), values.name]);
        },
        onError: () => {},
      }
    );
  };

  const handleAddTag = (tagNameOrId: string) => {
    const existingTag =
      availableTags?.find((t: any) => t.id === tagNameOrId) ||
      availableTags?.find((t: any) => t.name === tagNameOrId);

    if (existingTag) {
      if (!selectedTags?.includes(existingTag.id)) {
        setSelectedTags?.([...(selectedTags || []), existingTag]);
      }
      return;
    }

    mutate(
      { active: true, name: tagNameOrId },
      {
        onSuccess: (values) => {
          setSelectedTags?.([...(selectedTags || []), values.name]);
          setOpen(false);
        },
        onError: () => {},
      }
    );
  };

  const handleSave = () => {
    form.setValue(
      "tags",
      selectedTags.map((t) => ({ name: t, active: true }))
    );
    setOpen(false);
  };
  const handleSubmit = () => {
    GlobalModal.info({
      title: "เพิ่มแท็กของลูกค้า",
      description: "คุณต้องการเพิ่มแท็กของลูกค้า ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังเพิ่มผู้แท็กของลูกค้า...");

        const result = selectedTags.map((tag: any) => {
          return {
            id: tag.id,
            name: tag,
            active: true,
          };
        });

        updateTags(
          { tags: result },
          {
            onSuccess: () => {
              toast.success("เพิ่มผู้แท็กของลูกค้าเรียบร้อยแล้ว!", {
                id: toastId,
              });
              refetch();
              setOpen(false);
            },
            onError: () => {
              toast.error("ไม่สามารถเพิ่มผู้แท็กของลูกค้า", { id: toastId });
              refetch();
            },
          }
        );

        setShowTagManager(false);
      },
    });
  };

  const selectedTagObjects = selectedTags.map((tag) => ({
    id: tag,
    name: tag,
  }));

  const availableTagObjects =
    allTags?.filter((t: any) => !selectedTags.includes(t.name)) ?? [];

  /* =========================
   * INIT
   ========================= */
  React.useEffect(() => {
    setSelectedTags(initialTags.map((t: any) => t.name));
  }, [initialTags]);

  return (
    <>
      <FormField
        control={form.control}
        name="tags"
        render={() => (
          <FormItem>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {selectedTags.length === 0 ? (
                  <></>
                ) : (
                  selectedTags.map((tag) => (
                    <GlobalTagsBadge
                      key={tag}
                      value={tag}
                      // showIcon
                      onClick={() => handleDeleteTag(tag)}
                    />
                  ))
                )}

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

      {customerSingle ? (
        <TagManagerModal
          open={open}
          title="เลือกหรือสร้างแท็ก"
          inputValue={inputValue}
          onInputChange={setInputValue}
          selectedTags={selectedTagObjects}
          availableTags={availableTagObjects}
          loading={isPending}
          onAddTag={(tag) => handleToggleTag(tag.name)}
          onRemoveTag={(tag) => handleRemoveTag(tag.id)}
          onCreateTag={(name) => {
            handleAddTag(name);
            setInputValue("");
          }}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      ) : (
        <TagManagerModal
          open={open}
          title="เลือกหรือสร้างแท็ก"
          inputValue={search}
          onInputChange={setSearch}
          selectedTags={selectedTagObjects}
          availableTags={availableTagObjects}
          onAddTag={(tag) => handleToggleTag(tag.name)}
          onRemoveTag={(tag) => handleDeleteTag(tag.name)}
          onCreateTag={handleCreateTag}
          onClose={() => setOpen(false)}
          onSubmit={handleSave}
        />
      )}
    </>
  );
};
