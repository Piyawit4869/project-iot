import { CirclePlus } from "lucide-react";
import { GlobalImage } from "~/components/shared/global-image";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

interface AddParticipantPopoverProps {
  open?: boolean;
  setOpen: any;
  search?: string;
  setSearch: any;
  filteredUser: any;
  supportedUserIds?: Set<string>;
  isLoading?: boolean;
  disabled?: boolean;
  onSelect: (id: string) => void;
}

export const AddParticipantPopover: React.FC<AddParticipantPopoverProps> = (
  props
) => {
  const {
    open,
    setOpen,
    search,
    setSearch,
    filteredUser,
    supportedUserIds,
    isLoading,
    disabled,
    onSelect,
  } = props;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button disabled={disabled}>
          <CirclePlus className="w-9 h-9 text-gray-300" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-95">
        <Command>
          <CommandInput
            placeholder="ค้นหาชื่อผู้รับผิดชอบ"
            value={search}
            onValueChange={setSearch}
          />

          <CommandList>
            {isLoading ? (
              <div className="p-5 text-gray-400 text-sm">กำลังโหลด...</div>
            ) : filteredUser && filteredUser.length > 0 ? (
              filteredUser
                .filter(
                  (u: any) => supportedUserIds && !supportedUserIds.has(u.id)
                )
                .map((u: any) => (
                  <CommandItem
                    key={(u && u.id) || ""}
                    onSelect={() => onSelect((u && u.id) || "")}
                    className="flex gap-2"
                  >
                    <GlobalImage
                      src={
                        u.profile?.imageUrl ||
                        `https://api.dicebear.com/9.x/initials/svg?seed=${(u && u.userName) || ""}`
                      }
                      className="w-10 h-10 rounded-2xl"
                    />
                    <div className="text-sm">
                      <div>{(u && u.userName) || ""}</div>
                      <div className="text-gray-400">
                        {(u && u.email) || ""}
                      </div>
                    </div>
                  </CommandItem>
                ))
            ) : (
              <div className="p-5 text-gray-400 text-sm">
                ไม่มีข้อมูลผู้รับผิดชอบ
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
