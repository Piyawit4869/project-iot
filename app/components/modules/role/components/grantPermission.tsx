import React from "react";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { useParams } from "react-router";
import {
  useGetAllPermission,
  useGetRoles,
  useGrantPermission,
} from "~/api/client/role/useGetRole";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

type PermissionItem = {
  id: string;
  feature: string;
  action: string;
  code: string;
};

const ACTION_LABEL: Record<string, string> = {
  get_all: "ดูรายการทั้งหมด",
  get_single: "ดูรายละเอียด",
  create: "เพิ่มข้อมูล",
  update: "แก้ไขข้อมูล",
  delete: "ลบข้อมูล",
};

const ACTION_ORDER = ["get_all", "get_single", "create", "update", "delete"];
const FEATURE_LABEL: Record<string, string> = {
  home: "หน้าหลัก",
  chat: "แชท",
  customer: "ลูกค้า",
  order: "ออเดอร์",
  inventory: "คลังสินค้า",
  product: "สินค้า",
  user: "พนักงาน",
  login_log: "ประวัติการเข้าสู่ระบบ",
  on_boarding: "On Boarding",
  organization: "องค์กร",
  roles: "บทบาท",
  branch: "สาขา",
  setting: "ตั้งค่า",
};

const featureTH = (feature?: string) => {
  const key = (feature ?? "").trim().toLowerCase();
  return FEATURE_LABEL[key] ?? feature ?? "-";
};

export const GrantPermission: React.FC = () => {
  const params = useParams<{ id: string }>();
  const roleId = params.id ?? "";

  const { data: allPermissionData, isLoading: isPermLoading } =
    useGetAllPermission();
  const { data: role, isLoading: isRoleLoading } = useGetRoles(roleId);
  const { mutate, isPending } = useGrantPermission(roleId);

  const [search, setSearch] = React.useState("");
  const [selectedPermissionIds, setSelectedPermissionIds] = React.useState<
    string[]
  >([]);

  // ------- normalize permissions list -------
  const permissions: PermissionItem[] = React.useMemo(() => {
    const raw = Array.isArray(allPermissionData) ? allPermissionData : [];
    return raw
      .filter(Boolean)
      .map((p: any) => ({
        id: String(p?.id ?? ""),
        feature: String(p?.feature ?? ""),
        action: String(p?.action ?? ""),
        code: String(p?.code ?? ""),
      }))
      .filter((p) => p.id && p.feature && p.action);
  }, [allPermissionData]);

  React.useEffect(() => {
    const ids = Array.isArray(role?.permissions)
      ? role.permissions
          .map((x: any) => x?.id)
          .filter(
            (id: any): id is string => typeof id === "string" && id.length > 0
          )
      : [];

    setSelectedPermissionIds(ids);
  }, [role?.permissions]);

  const safeSearch = (search ?? "").toLowerCase();

  // ------- actions list for columns -------
  const actions = React.useMemo(() => {
    const set = new Set<string>();
    for (const p of permissions) set.add(p.action);

    const arr = Array.from(set);

    arr.sort((a, b) => {
      const ia = ACTION_ORDER.indexOf(a);
      const ib = ACTION_ORDER.indexOf(b);
      if (ia !== -1 || ib !== -1)
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
      return a.localeCompare(b);
    });

    return arr;
  }, [permissions]);

  // ------- group by feature: feature -> (action -> permission) -------
  const featureRows = React.useMemo(() => {
    const map = new Map<string, Record<string, PermissionItem>>();

    for (const p of permissions) {
      if (!map.has(p.feature)) map.set(p.feature, {});
      map.get(p.feature)![p.action] = p;
    }

    const features = Array.from(map.keys()).filter((f) => {
      const en = f.toLowerCase();
      const th = featureTH(f).toLowerCase();
      return en.includes(safeSearch) || th.includes(safeSearch);
    });

    features.sort((a, b) => a.localeCompare(b));

    return features.map((feature) => ({ feature, cells: map.get(feature)! }));
  }, [permissions, safeSearch]);

  const isChecked = (permissionId?: string) =>
    !!permissionId && selectedPermissionIds.includes(permissionId);

  const toggleOne = (permissionId?: string) => {
    if (!permissionId) return;
    setSelectedPermissionIds((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  // select all in a row (one feature)
  const toggleRow = (feature: string, checked: boolean) => {
    const row = featureRows.find((r) => r.feature === feature);
    if (!row) return;

    const ids = actions
      .map((a) => row.cells[a]?.id)
      .filter((id): id is string => typeof id === "string" && id.length > 0);

    setSelectedPermissionIds((prev) => {
      if (checked) return Array.from(new Set([...prev, ...ids]));
      return prev.filter((id) => !ids.includes(id));
    });
  };

  // select all in a column (one action)
  const toggleColumn = (action: string, checked: boolean) => {
    const ids = featureRows
      .map((r) => r.cells[action]?.id)
      .filter((id): id is string => typeof id === "string" && id.length > 0);

    setSelectedPermissionIds((prev) => {
      if (checked) return Array.from(new Set([...prev, ...ids]));
      return prev.filter((id) => !ids.includes(id));
    });
  };

  const triState = (ids: string[]) => {
    if (ids.length === 0) return false as const;
    const count = ids.filter((id) => selectedPermissionIds.includes(id)).length;
    if (count === 0) return false as const;
    if (count === ids.length) return true as const;
    return "indeterminate" as const;
  };

  const onSubmit = () => {
    GlobalModal.info({
      title: "เพิ่ม permission ในตำแหน่ง",
      description: "คุณต้องการบันทึก permission ของตำแหน่งนี้ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังบันทึก permission...");
        mutate(
          { permissionIds: selectedPermissionIds },
          {
            onSuccess: () =>
              toast.success("บันทึก permission เรียบร้อยแล้ว!", {
                id: toastId,
              }),
            onError: () =>
              toast.error("เกิดข้อผิดพลาดขณะบันทึก permission", {
                id: toastId,
              }),
          }
        );
      },
    });
  };

  const loading = isPermLoading || isRoleLoading;

  return (
    <>
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-base font-bold">
            ตาราง Permission
          </CardTitle>

          <div className="flex gap-2">
            <Input
              placeholder="ค้นหา feature เช่น order, user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-72"
            />
            <Button
              type="button"
              size="sm"
              onClick={onSubmit}
              disabled={isPending}
            >
              บันทึก
            </Button>
          </div>
        </div>
      </CardHeader>

      {loading ? (
        <CardContent className="space-y-4">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <CardContent className="space-y-4">
          <div className="w-full overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="sticky top-0 bg-sidebar p-2 text-left text-white min-w-[220px]">
                    Feature
                  </th>

                  {actions.map((action) => {
                    const colIds = featureRows
                      .map((r) => r.cells[action]?.id)
                      .filter(
                        (id): id is string =>
                          typeof id === "string" && id.length > 0
                      );

                    const colState = triState(colIds);

                    return (
                      <th
                        key={action}
                        className="sticky top-0 bg-sidebar p-2 text-center text-white min-w-[120px]"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs font-medium">
                            {ACTION_LABEL[action] ?? action}
                          </span>
                          <Checkbox
                            checked={colState}
                            onCheckedChange={(checked) =>
                              toggleColumn(action, checked === true)
                            }
                          />
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {featureRows.map((row) => {
                  const rowIds = actions
                    .map((a) => row.cells[a]?.id)
                    .filter(
                      (id): id is string =>
                        typeof id === "string" && id.length > 0
                    );

                  const rowState = triState(rowIds);

                  return (
                    <tr key={row.feature} className="border-b">
                      <td className="p-2 font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={rowState}
                            onCheckedChange={(checked) =>
                              toggleRow(row.feature, checked === true)
                            }
                          />
                          <span>{featureTH(row.feature)}</span>
                        </div>
                      </td>

                      {actions.map((action) => {
                        const perm = row.cells[action];
                        const hasCell = !!perm?.id;

                        return (
                          <td
                            key={`${row.feature}-${action}`}
                            className="p-2 text-center"
                          >
                            {hasCell ? (
                              <Checkbox
                                checked={isChecked(perm.id)}
                                onCheckedChange={() => toggleOne(perm.id)}
                              />
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {featureRows.length === 0 && (
                  <tr>
                    <td
                      className="p-4 text-center text-muted-foreground"
                      colSpan={1 + actions.length}
                    >
                      ไม่พบ feature ที่ค้นหา
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      )}
    </>
  );
};
