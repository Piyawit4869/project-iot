"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { useDebounce } from "~/hooks/use-debounce";
import { GlobalImage } from "~/components/shared/global-image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Separator } from "~/components/ui/separator";
import React from "react";

type Props = {
  data: {
    imageUrl: string;
    name: string;
    sku: string;
    quantity: number;
    id: string;
    label: string;
    price: number;
  }[];
  onSelect: (value: string) => void;
};

export const ProductSelectBox: React.FC<Props> = ({ data, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const result = data.filter((d) =>
      d.label.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setFilteredData(result);
  }, [debouncedSearch, data]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <div className="w-full">
          <input
            value={search || (data.find((d) => d.id === value)?.label ?? "")}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true); // เปิด popover ตอนพิมพ์
            }}
            onFocus={() => setOpen(true)}
            onClick={(e) => {
              e.stopPropagation(); // กันการ toggle ปิด popover
              setOpen(true);
            }}
            className="
          w-full border rounded-md px-3 py-2
          outline-none focus:ring-2 focus:ring-primary
        "
            placeholder="เลือกรายการสินค้า หรือพิมพ์ค้นหา..."
          />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          {/* ถ้าจะใช้อันนี้แทน input ก็ uncomment ได้ */}
          {/* 
      <CommandInput
        placeholder="ค้นหารายการสินค้า..."
        className="h-9"
        onValueChange={(val) => setSearch(val)}
      />
      */}

          <CommandList key={debouncedSearch}>
            {filteredData.length === 0 && (
              <CommandEmpty>ไม่พบข้อมูล</CommandEmpty>
            )}

            <CommandGroup>
              {filteredData.map((d) => (
                <React.Fragment key={d.id}>
                  <CommandItem
                    value={JSON.stringify({ label: d.label, value: d.id })}
                    onSelect={(currentValue) => {
                      const item = JSON.parse(currentValue);
                      setValue(item.value);
                      onSelect(item.value);
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <GlobalImage
                        src={d.imageUrl}
                        alt="user-image"
                        width={60}
                        height={60}
                        notShowPreview={true}
                        className="w-12 h-12 rounded-md object-cover border"
                        fallbackSrc={`https://api.dicebear.com/9.x/initials/svg?seed=${d.label}`}
                      />

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem
                          value={`item-${d.id}`}
                          className="border-none"
                        >
                          <AccordionTrigger className="p-0 hover:no-underline [&>svg]:hidden flex justify-between w-full">
                            <div className="flex flex-col items-start text-left">
                              <span className="text-sm font-medium max-w-[150px]">
                                {d.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {d.sku}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                สินค้าคงเหลือ : {d.quantity} ชิ้น
                              </span>
                            </div>

                            <div className="flex flex-col items-end text-right mr-10 text-blue-500">
                              {d.price || 0} บาท
                            </div>
                          </AccordionTrigger>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </CommandItem>

                  <Separator className="my-2" />
                </React.Fragment>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
