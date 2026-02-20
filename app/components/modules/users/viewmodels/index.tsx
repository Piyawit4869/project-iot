import { DataTable } from "~/components/shared/data-table";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { userColumns } from "../component/columns";
import { useDeleteFace, useFacesTableQuery } from "~/api/client/user";
import { Link, useRouteLoaderData } from "react-router";
import { TabControl } from "~/components/shared/tab-control";
import { getUserActionByPermission } from "~/utils/permission";
import { PermissionBaseAction } from "~/types/roles/permission";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";

export default function Users() {
  const { permission } = useRouteLoaderData("root");
  const tabControlButtons = [];

  if (
    getUserActionByPermission(permission, "user", PermissionBaseAction.CREATE)
  ) {
    tabControlButtons.push(
      <Link to={`/users/create`} key="create-link">
        <Button
          key="create-button"
          className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">&nbsp;สร้าง</span>
        </Button>
      </Link>,
    );
  }

  return (
    <div className="flex flex-col w-full space-y-8 p-8 dark:bg-background">
      <TabControl title="พนักงาน" buttons={tabControlButtons} />

      <DataTable
        columns={userColumns}
        queryFunction={({ pageIndex, pageSize }) =>
          useFacesTableQuery({
            pageIndex,
            pageSize,
          })
        }
      />
    </div>
  );
}
