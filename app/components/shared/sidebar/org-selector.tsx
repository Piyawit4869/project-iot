import * as React from "react";
import { Check, ChevronsUpDown, Settings, Plus } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";
import { useSearchUserOrgs } from "~/api/client/user";

type Org = {
  id: string;
  nameTh: string;
  nameEn: string;
  logoUrl?: string;
  status?: "active" | "inactive";
};

type OrgSwitcherProps = {
  currentOrganization: Org;
  currentOrgId: string;
  onChangeOrg: (orgId: string) => void;
  onOpenManage?: () => void;
  onOpenCreate?: () => void;
};

export function OrgSelector({
  currentOrgId,
  currentOrganization,
  onChangeOrg,
  onOpenManage,
  onOpenCreate,
}: OrgSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  // const debouncedSearch = useDebounce(search);
  const { data } = useSearchUserOrgs();

  const orgs = data?.organizations;

  React.useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const current = React.useMemo(() => {
    return orgs && orgs.length
      ? (orgs.find((o: Org) => o.id === currentOrgId) ?? orgs[0])
      : currentOrganization;
  }, [orgs, currentOrgId]);

  console.log({ current, currentOrgId });

  const initials = (name?: string) =>
    (name ?? "")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "OR";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-full justify-between rounded-md"
          aria-label="Switch organization"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={current?.logoUrl}
                alt={current?.nameTh ?? "Organization"}
              />
              <AvatarFallback>{initials(current?.nameTh)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 text-left">
              <div className="truncate text-sm font-medium text-black">
                {current?.nameTh ?? "-"}
              </div>
              <div className="text-xs text-muted-foreground">เปลี่ยนองค์กร</div>
            </div>
          </div>

          <ChevronsUpDown className="h-4 w-4 opacity-60" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-2" align="end">
        <Command className="w-full">
          <CommandInput
            placeholder="ค้นหารายชื่อ เช่น องค์กร A"
            value={search}
            onValueChange={(val) => setSearch(val)}
          />

          <CommandList className="pt-2 max-h-[320px]">
            <CommandEmpty>ไม่พบองค์กร</CommandEmpty>

            <CommandGroup heading="รายชื่อองค์กร">
              {orgs && orgs.length ? (
                orgs.map((org: Org) => {
                  const selected = org.id === currentOrgId;

                  return (
                    <CommandItem
                      key={org.id}
                      value={org.nameTh}
                      onSelect={() => {
                        !selected && onChangeOrg(org.id);
                        setOpen(false);
                      }}
                      className="rounded-lg h-[45px] cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={org.logoUrl} alt={org.nameTh} />
                          <AvatarFallback>
                            {initials(org.nameTh)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <div className="truncate text-sm">{org.nameTh}</div>
                          <div className="text-xs text-muted-foreground">
                            {/* {org.status === "inactive" ? "Inactive" : "Active"} */}

                            {selected ? "เลือกอยู่" : ""}
                          </div>
                        </div>
                      </div>

                      <Check
                        className={cn(
                          "h-4 w-4",
                          selected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })
              ) : (
                <></>
              )}
            </CommandGroup>

            {(onOpenManage || onOpenCreate) && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                  {onOpenManage && (
                    <CommandItem
                      onSelect={() => {
                        onOpenManage();
                        setOpen(false);
                      }}
                      className="rounded-lg"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Manage organizations
                    </CommandItem>
                  )}

                  {onOpenCreate && (
                    <CommandItem
                      onSelect={() => {
                        onOpenCreate();
                        setOpen(false);
                      }}
                      className="rounded-lg"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create new organization
                    </CommandItem>
                  )}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
