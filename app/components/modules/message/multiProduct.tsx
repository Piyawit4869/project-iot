import React from "react";
import { Check, ChevronDown, ChevronUp, Search } from "lucide-react";
import { cn } from "~/lib/utils";
import { GlobalImage } from "~/components/shared/global-image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

type Option = { value: string; label: string };

type MultiSelectSimpleProps = {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
};

export function MultiSelectOnModalProduct({
  options,
  selected,
  onChange,
  placeholder = "เลือก...",
  searchPlaceholder = "ค้นหา...",
}: MultiSelectSimpleProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const scrollPositionRef = React.useRef<number>(0);

  const toggleValue = (value: string | undefined) => {
    if (!value) return;
    const container = scrollRef.current;
    if (container) {
      scrollPositionRef.current = container.scrollTop;
    }

    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const filteredOptions = React.useMemo(() => {
    const filtered = options.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const aSelected = selected.includes(a.value);
      const bSelected = selected.includes(b.value);
      if (aSelected === bSelected) return 0;
      return aSelected ? -1 : 1;
    });
  }, [options, search, selected]);

  React.useEffect(() => {
    const container = scrollRef.current;
    if (container && scrollPositionRef.current) {
      container.scrollTop = scrollPositionRef.current;
    }
  });

  React.useEffect(() => {
    if (!open) {
      const container = scrollRef.current;
      if (container) {
        container.scrollTop = 0;
        scrollPositionRef.current = 0;
      }
    }
  }, [open]);

  return (
    <div className="relative w-full">
      {/* Toggle button */}
      <button
        type="button"
        className="w-full text-left font-normal flex justify-between items-center border rounded px-3 py-2"
        onClick={() => setOpen(!open)}
      >
        {selected.length > 0
          ? options
              .filter((o) => selected.includes(o.value))
              .map((o) => o.label)
              .join(", ")
          : placeholder}

        {open ? (
          <ChevronUp className="ml-2 h-4 w-4 opacity-70" />
        ) : (
          <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
        )}
      </button>

      {open && (
        <div
          ref={scrollRef}
          className="absolute z-[9999] w-full max-h-100 overflow-auto bg-white dark:bg-gray-800 rounded-md border mt-1 shadow-lg"
        >
          {/* Search bar */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b p-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent outline-none text-sm text-gray-700 dark:text-gray-100"
            />
          </div>

          {filteredOptions.length === 0 && (
            <div className="p-3 text-center text-sm text-gray-500">
              ไม่พบข้อมูล
            </div>
          )}

          {filteredOptions.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              // <div
              //   key={option.value}
              //   className={cn(
              //     "cursor-pointer select-none px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
              //     isSelected && "bg-blue-50 dark:bg-blue-900/30"
              //   )}
              //   onClick={() => toggleValue(option.value)}
              // >
              //   <div
              //     className={cn(
              //       "w-4 h-4 border rounded-sm flex items-center justify-center",
              //       isSelected
              //         ? "bg-blue-600 border-blue-600 text-white"
              //         : "border-gray-300"
              //     )}
              //   >
              //     {isSelected && <Check className="w-3 h-3" />}
              //   </div>
              //   <span
              //     className={cn(
              //       "text-sm",
              //       isSelected
              //         ? "font-medium text-blue-600 dark:text-blue-400"
              //         : "text-gray-700 dark:text-gray-200"
              //     )}
              //   >
              //     {option.label}
              //   </span>
              // </div>

              <ul className="space-y-2">
                <li
                  key={option.value}
                  className="flex items-center justify-between gap-4 p-3 hover:bg-muted/60 transition-colors"
                  onClick={() => toggleValue(option.value)}
                >
                  {option.value && (
                    <div
                      className="flex gap-2 cursor-pointer w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // toggleCartItem(item);
                      }}
                    >
                      <div
                        className={cn(
                          "w-4 h-4 border rounded-sm flex items-center justify-center",
                          isSelected
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-gray-300"
                        )}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <div className="flex items-center justify-between gap-2 w-full">
                        <div className="flex items-center gap-3">
                          <GlobalImage
                            src={option.label}
                            alt="user-image"
                            width={60}
                            height={60}
                            className="w-12 h-12 rounded-md object-cover border"
                            fallbackSrc={`https://api.dicebear.com/9.x/initials/svg?seed=${option.label}`}
                          />

                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem
                              value={`item-${option.value}`}
                              className="border-none"
                            >
                              <AccordionItem
                                value={`item-${option.value}`}
                                className="border-none"
                              >
                                <AccordionTrigger className="p-0 hover:no-underline [&>svg]:hidden">
                                  <div className="flex flex-col items-start text-left">
                                    <span className="text-sm font-medium max-w-[150px]">
                                      {option.label}
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

                        <div className="flex flex-col items-end gap-1">
                          <span className="font-semibold text-sm text-blue-600">
                            {/* {option.salePrice} ฿ */}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
}
