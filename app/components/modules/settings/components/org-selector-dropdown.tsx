import * as React from "react";
import { Settings, Plus, ChevronDown, ChevronLeft } from "lucide-react";

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
import { useSearchUserOrgs } from "~/api/client/user";
import { useDebounce } from "~/hooks/use-debounce";
import { Link } from "react-router";

type Org = {
  id: string;
  nameTh: string;
  nameEn: string;
  logoUrl?: string;
  status?: "active" | "inactive";
};

type OrgSwitcherProps = {
  currentOrganization: Org;
  currentOrgId?: string;
  currentBranchId?: string;
  currentBranch?: string;
  onChangeOrg: (orgId: string) => void;
  onOpenManage?: () => void;
  onOpenCreate?: () => void;
  refetch?: () => void;
  data?: any;
  branches?: any;
  setSearch?: any;
  backIcon?: boolean;
  topic?: string;
};

export function OrgSelectorDropdown({
  currentOrgId,
  currentOrganization,
  onChangeOrg,
  onOpenManage,
  currentBranchId,
  onOpenCreate,
  refetch,
  data,

  topic,
  branches,
  backIcon,
}: OrgSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const orgs = data?.organizations ?? [];

  const filteredOrgs = React.useMemo(() => {
    if (!search) return orgs;
    return orgs.filter((o: any) =>
      o.nameTh?.toLowerCase().includes(search.toLowerCase())
    );
  }, [orgs, search]);

  const currentOrg = React.useMemo(() => {
    return orgs.length
      ? (orgs.find((o: any) => o.id === currentOrgId) ?? orgs[0])
      : currentOrganization;
  }, [orgs, currentOrgId, currentOrganization]);

  const currentBranchData = React.useMemo(() => {
    if (!currentBranchId) return null;
    return branches?.find((b: any) => b.id === currentBranchId) ?? null;
  }, [branches, currentBranchId]);

  const showData = branches ? branches : filteredOrgs;
  const showName = branches ? currentBranchData : currentOrg;

  const initials = (name?: string) =>
    (name ?? "")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "OR";

  React.useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-row gap-3 items-center cursor-pointer">
          <div className="flex items-center gap-2 min-w-0">
            {backIcon && (
              <Link to="/setting-organization">
                <ChevronLeft className="h-6 w-6" />
              </Link>
            )}

            <div className="min-w-45">
              <span className="truncate text-base font-medium">{topic}</span>
              <div className="truncate text-md font-medium">
                {showName?.nameTh ?? (
                  <span className="text-muted-foreground">กรุณาเลือกสาขา</span>
                )}
              </div>
            </div>
          </div>

          <ChevronDown className="h-4 w-4 opacity-60" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[280px] p-0" align="start">
        <Command className="w-full">
          {/* 🔍 Search */}
          <div className=" px-2">
            <CommandInput
              placeholder="ค้นหาองค์กร..."
              value={search}
              onValueChange={setSearch}
            />
          </div>

          {/* 📋 List */}
          <CommandList className="max-h-[260px] overflow-y-auto">
            <CommandEmpty>ไม่พบสาขา</CommandEmpty>

            <CommandGroup>
              {showData.map((org: Org) => {
                const selected = org.id === currentOrgId;

                return (
                  <CommandItem
                    key={org.id}
                    value={org.nameTh}
                    onSelect={() => {
                      if (!selected) {
                        onChangeOrg(org.id);
                        refetch?.();
                      }
                      setOpen(false);
                    }}
                    className="rounded-lg"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={org.logoUrl} alt={org.nameTh} />
                        <AvatarFallback>{initials(org.nameTh)}</AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <div className="truncate text-sm">{org.nameTh}</div>
                        {selected && (
                          <div className="text-xs text-muted-foreground">
                            เลือกอยู่
                          </div>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>

          {/* ➕ Footer */}
          {(onOpenManage || onOpenCreate) && (
            <div className="border-t p-2 space-y-1">
              {onOpenCreate && (
                <button
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                  onClick={() => {
                    onOpenCreate();
                    setOpen(false);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  เพิ่มสาขาใหม่
                </button>
              )}
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
