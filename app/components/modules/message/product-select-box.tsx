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

type Props = {
  data: { value: string; label: string }[];
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between">
          {value
            ? data.find((d) => d.value === value)?.label // ← FIXED
            : "เลือกรายการสินค้า..."}

          {open ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput
            placeholder="ค้นหารายการสินค้า..."
            className="h-9"
            onValueChange={(val) => setSearch(val)}
          />

          <CommandList key={debouncedSearch}>
            {filteredData.length === 0 && (
              <CommandEmpty>ไม่พบข้อมูล</CommandEmpty>
            )}

            <CommandGroup>
              {filteredData.map((d) => (
                <CommandItem
                  key={d.value}
                  value={JSON.stringify({ label: d.label, value: d.value })}
                  onSelect={(currentValue) => {
                    const item = JSON.parse(currentValue);
                    setValue(item.value);
                    onSelect(item.value);
                    setOpen(false);
                    setSearch("");
                  }}>
                  <div className="flex items-center gap-3">
                    <GlobalImage
                      src={d.label}
                      alt="user-image"
                      width={60}
                      height={60}
                      className="w-12 h-12 rounded-md object-cover border"
                      fallbackSrc={`https://api.dicebear.com/9.x/initials/svg?seed=${d.label}`}
                    />

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem
                        value={`item-${d.value}`}
                        className="border-none">
                        <AccordionItem
                          value={`item-${d.value}`}
                          className="border-none">
                          <AccordionTrigger className="p-0 hover:no-underline [&>svg]:hidden">
                            <div className="flex flex-col items-start text-left">
                              <span className="text-sm font-medium max-w-[150px]">
                                {d.label}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {/* {item.sku} */}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                สินค้าคงเหลือ : ชิ้น
                              </span>
                            </div>
                          </AccordionTrigger>
                        </AccordionItem>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  {/* {d.label} */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
