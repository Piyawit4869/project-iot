import * as React from "react";
import { CheckIcon } from "lucide-react";

import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Item {
  id: string;
  name: string;
}

interface MultiSelectProps {
  options: {
    id: string;
    name: string;
  }[];
  onChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  values: string | undefined;
  className?: string;
}

export const Combobox = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  ({
    options,
    placeholder,
    modalPopover = false,
    values,
    onChange,
    className,
  }) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [value, setValue] = React.useState(values);

    const selectedItem = options?.find((item: Item) => item.id === value);

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isPopoverOpen}
            className={cn("w-full justify-between", className)}
          >
            {selectedItem ? selectedItem.name : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="ค้นหา..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {(options ?? []).map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setIsPopoverOpen(false);
                      onChange?.(currentValue);
                    }}
                    className="cursor-pointer"
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

Combobox.displayName = "Combobox";
