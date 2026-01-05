import { CirclePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import PlaceholderImage from "/assets/images/placeholder.webp";

interface AddParticipantPopoverProps {
  open?: boolean;
  setOpen: any;
  search?: string;
  setSearch: any;
  filteredUser: any;
  supportedUserIds?: Set<string>;
  isLoading?: boolean;
  isFetching?: boolean;
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
    isFetching,
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
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="ค้นหาชื่อผู้รับผิดชอบ"
            value={search}
            onValueChange={setSearch}
          />

          <CommandList>
            <CommandEmpty>
              {isFetching ? "กำลังโหลด..." : "ไม่มีข้อมูลผู้รับผิดชอบ"}
            </CommandEmpty>
            <CommandGroup>
              {!isLoading &&
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
                      {/* <GlobalImage
                        src={
                          u.profile?.imageUrl ||
                          `https://api.dicebear.com/9.x/initials/svg?seed=${(u && u.userName) || ""}`
                        }
                        className="w-10 h-10 rounded-2xl"
                      /> */}

                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={u.profile?.imageUrl}
                          alt={u.profile?.imageUrl ?? "Profile Image"}
                        />
                        <AvatarFallback className="text-black">
                          <img
                            src={PlaceholderImage}
                            alt="placeholder"
                            className="h-full w-full object-cover"
                          />
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col text-sm">
                        <span>
                          ชื่อ :{" "}
                          {u?.profile?.firstName ||
                            "-" + u?.profile?.lastName ||
                            "-"}
                        </span>
                        <span>อีเมล : {u.email || "-"}</span>
                        <span>
                          ตำแหน่ง : {u?.organizationRoles?.name || "-"}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
