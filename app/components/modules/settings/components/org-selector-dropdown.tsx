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
import { Link, useNavigate, useSearchParams } from "react-router";
import PlaceholderImage from "/assets/images/placeholder.webp";

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
  const [searchParams] = useSearchParams();

  const selectedOrgId = searchParams.get("organizationId") || "";
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
      ? (orgs.find((o: any) => o.id === selectedOrgId) ?? selectedOrgId)
      : currentOrganization;
  }, [orgs, selectedOrgId, currentOrganization]);

  const currentBranchData = React.useMemo(() => {
    if (!currentBranchId) return null;
    return (
      (branches && branches.find((b: any) => b.id === currentBranchId)) ?? null
    );
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
        <div className=" flex-row flex items-center gap-3 cursor-pointer rounded-md border border-border px-5 py-2 hover:bg-muted transition">
          <div className="flex items-center gap-2 min-w-0">
            {backIcon && (
              <Link to="/setting-organization">
                <ChevronLeft className="h-6 w-6" />
              </Link>
            )}

            <div className="min-w-30">
              <div className="truncate text-sm font-semibold">{topic}</div>

              <div className="truncate ">
                {showName?.nameTh ?? (
                  <span className="text-muted-foreground">
                    กรุณาเลือกองค์กร
                  </span>
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
                const selected = org.id === selectedOrgId;

                return (
                  <CommandItem
                    key={org.id}
                    value={org.id}
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
                        <img
                          src={PlaceholderImage}
                          alt="placeholder"
                          className="h-full w-full object-cover"
                        />
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
