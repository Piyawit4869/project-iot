"use client";

import { useCallback, useMemo, useState } from "react";

import { DataTable } from "~/components/shared/data-table";

import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { useSidebar } from "~/components/ui/sidebar";
import { useUserColumns } from "../component/columns";
import { useAllUserSummary } from "~/api/client/user";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { TabControl } from "~/components/shared/tab-control";
import { TabIndexTableUser, UserFilterFields } from "~/types/user/init-data";
import {
  parseDateRangeParam,
  pickSearchParams,
} from "../../customer/utils/search-params";
import { usePaginate } from "~/api/client/role/useGetRole";
import { RolesFilterFields } from "~/types/roles/init-data";

export default function Roles() {
  const { data: user, isLoading } = useAllUserSummary();
  const paginate = usePaginate;

  const columns = useUserColumns();
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const [sp, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState("all");
  const [tableKey, setTableKey] = useState(0);

  const filters = useMemo(
    () =>
      pickSearchParams(sp, [
        "userName",
        "fullname",
        "email",
        "status",
        "emId",
        "active",
        "phone",
        "gender",
        "updatedBy",
      ]),
    [sp]
  );

  const created = parseDateRangeParam(sp, "createdAt") ?? {};
  const updated = parseDateRangeParam(sp, "updatedAt") ?? {};
  const createdFrom = created.fromDate;
  const createdTo = created.toDate;
  const updatedFrom = updated.fromDate;
  const updatedTo = updated.toDate;

  const items = TabIndexTableUser(user);
  const clearAllFilters = useCallback(() => {
    setSearchParams({});

    navigate(location.pathname, { replace: true });
  }, [setSearchParams, navigate, location.pathname]);

  const handleChangeTab = (val: string) => {
    const hadQuery = sp.toString().length > 0;
    setStatus(val);
    clearAllFilters();
    if (hadQuery) {
      setTableKey((k) => k + 1);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-8 p-8 dark:bg-background">
      <TabControl
        title="ตำแหน่ง"
        buttons={[
          <Link to={`/roles/create`} key="create-link">
            <Button
              key="create-button"
              className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">&nbsp;สร้าง</span>
            </Button>
          </Link>,
        ]}
      />

      <DataTable
        key={tableKey}
        queryFunction={(res) =>
          paginate({
            pageIndex: res.pageIndex,
            status: status === "all" ? "" : status,
            limit: res.pageSize,
            ...filters,
            createdFrom,
            createdTo,
            updatedFrom,
            updatedTo,
          } as any)
        }
        columns={columns}
        customerFilterFields={RolesFilterFields}
        isCustomLoading={isLoading}
      />
    </div>
  );
}
