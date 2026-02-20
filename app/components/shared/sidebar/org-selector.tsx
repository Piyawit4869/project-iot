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
import logoIoT from "/assets/images/logoIoT.png";

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

  return (
    <Button
      variant="outline"
      className="group h-10 w-full justify-between rounded-md "
      aria-label="Switch organization"
    >
      <div className="flex items-center gap-2 min-w-0 group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:gap-0">
        <Avatar className="h-6 w-6">
          <AvatarImage
            src={current?.logoUrl}
            alt={current?.nameTh ?? "Organization"}
          />
          <AvatarFallback className="text-black">
            <img
              src={logoIoT}
              alt="placeholder"
              className="h-full w-full object-cover "
            />
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 text-left data-[state=collapsed]:hidden">
          <div className="truncate text-sm font-medium text-black">
            Smart AI Access Control System
          </div>
        </div>
      </div>
    </Button>
  );
}
