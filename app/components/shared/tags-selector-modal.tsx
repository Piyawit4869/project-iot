"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { Check, Plus } from "lucide-react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { GlobalTagsBadge } from "./global-tags";

interface TagsSelectorModalProps {
  form: any;
}

const defaultTags = [
  { name: "ลูกค้า VIP", active: true },
  { name: "ลูกค้าใหม่", active: true },
  { name: "ลูกค้าประจำ", active: true },
  { name: "ลูกค้าที่สนใจ", active: true },
  { name: "ลูกค้าไม่เคลื่อนไหว", active: false },
  { name: "ใช้โปรโมชั่น", active: true },
  { name: "มียอดซื้อสูง", active: true },
  { name: "มีประวัติร้องเรียน", active: false },
  { name: "ลูกค้าขายส่ง", active: true },
  { name: "ลูกค้าปลีก", active: true },
  { name: "สมาชิก", active: true },
  { name: "Walk-in", active: true },
];

export const TagsSelectorModal: React.FC<TagsSelectorModalProps> = (props) => {
  const { form } = props;

  const initialTags: typeof defaultTags = form.getValues("tags") ?? [];

  const [tags, setTags] = React.useState<typeof defaultTags>(() => {
    const tagMap = new Map(defaultTags.map((tag) => [tag.name, tag]));

    initialTags.forEach((initialTag) => {
      if (tagMap.has(initialTag.name)) {
        tagMap.set(initialTag.name, initialTag);
      } else {
        tagMap.set(initialTag.name, initialTag);
      }
    });

    return Array.from(tagMap.values());
  });

  const [open, setOpen] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const handleToggleTag = (tagName: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tagName)
        ? prevTags.filter((tag) => tag !== tagName)
        : [...prevTags, tagName]
    );
  };

  const handleDeleteTag = (tagName: string) => {
    const updatedTags = selectedTags.filter((tag) => tag !== tagName);

    setSelectedTags(updatedTags);

    const updatedTagObjects = updatedTags.map((tag) => ({
      name: tag,
      active: true,
    }));

    form.setValue("tags", updatedTagObjects);
  };

  const handleCreateTag = () => {
    if (!search) return;
    const newTag = { name: search, active: true };
    setTags((prevTags) => [...prevTags, newTag]);
    handleToggleTag(search);
    setSearch("");
  };

  const handleOnSaveTags = () => {
    const selectedTagObjects = selectedTags.map((tag) => ({
      name: tag,
      active: true,
    }));

    form.setValue("tags", selectedTagObjects);

    setOpen(false);
  };

  const handleOnClose = (isOpen: boolean) => {
    if (!isOpen) {
      handleOnSaveTags();
    }
    setOpen(isOpen);
  };

  React.useEffect(() => {
    const initialSelectedTags = initialTags.map((tag: any) => tag.name) ?? [];
    setSelectedTags(initialSelectedTags);
  }, [initialTags]);

  return (
    <FormField
      control={form.control}
      name="tags"
      render={() => {
        return (
          <FormItem>
            <FormControl className="w-full">
              <div className="flex flex-wrap gap-2 space-y-2">
                {selectedTags.map((tag) => (
                  <GlobalTagsBadge
                    key={tag}
                    value={tag}
                    onClick={() => handleDeleteTag(tag)}
                  />
                ))}

                <Dialog open={open} onOpenChange={handleOnClose}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      แก้ไขแท็ก
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>เลือกหรือสร้างแท็ก</DialogTitle>
                      <DialogDescription>
                        คุณสามารถเลือกจากแท็กที่มีหรือสร้างแท็กใหม่
                      </DialogDescription>
                    </DialogHeader>

                    <Command>
                      <CommandInput
                        placeholder="ค้นหาหรือเพิ่มแท็ก..."
                        value={search}
                        onValueChange={setSearch}
                      />
                      <CommandList>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={handleCreateTag}
                        >
                          <Plus size={16} /> สร้าง Tags ใหม่: {search}
                        </Button>
                        {tags.map((tag) => (
                          <CommandItem
                            key={tag.name}
                            onSelect={() => handleToggleTag(tag.name)}
                          >
                            {tag.name}
                            {selectedTags.includes(tag.name) && (
                              <Check size={16} className="ml-auto" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </Command>
                  </DialogContent>
                </Dialog>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
