import React, { useState } from "react";
import type { PermissionControlFormCreateProps } from "../type";
import {
  PermissionAction,
  PermissionActionLabel,
  permissions,
} from "../iniData";
import { Input } from "~/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Switch } from "~/components/ui/switch";
import { Checkbox } from "~/components/ui/checkbox";
// import { useGetAllUsers } from "@/actions/permission-control/client/useGetPermissionControl";
// import { StarRating } from "@/components/shared/StarRating";

export const AddPermission: React.FC<PermissionControlFormCreateProps> = ({
  form,
}) => {
  const [allSelected, setAllSelected] = useState(false);
  const [clickPermission, setClickPermission] = React.useState<any[]>([]);
  const actions = Object.values(PermissionAction);

  const handleToggleSelectAll = () => {
    const next = !allSelected;

    const updated: Record<string, Record<string, boolean>> = {};
    const setMenu = (name: string) => {
      const perms: Record<string, boolean> = {};
      actions.forEach((ac) => (perms[ac] = next));
      updated[name] = perms;
    };

    permissions.forEach((m) => {
      setMenu(m.name);
      m.children?.forEach(setMenu);
    });

    // อัปเดต state allSelected
    setAllSelected(next);
  };

  const handleCheck = (menuName: string, action: string, checked: boolean) => {
    setClickPermission((prev) =>
      prev.map((m) =>
        m.nameTh === menuName
          ? { ...m, allowed: { ...m.allowed, [action]: checked } }
          : m
      )
    );
  };
  return (
    <div className="space-y-4">
      <div className="space-y-4 px-4 py-3 bg-background rounded-t-md border-b">
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium">
            ชื่อตำแหน่ง <span className="text-red-500">*</span>
          </label>
          <Input
            name="name"
            placeholder="ชื่อตำแหน่ง"
            // value={formUpdate.watch("name")}
            // onChange={(e) => form.setValue("name", e.target.value)}
            className="h-8 w-[300px]"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium">รายละเอียด</label>
          <Input
            name="description"
            placeholder="รายละเอียด"
            // value={formUpdate.watch("description")}
            // onChange={(e) => form.setValue("description", e.target.value)}
            className="h-8 w-[300px]"
          />
        </div>
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex items-center gap-x-4 mt-1">
              <label className="w-32 text-sm font-medium">สถานะ</label>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="border rounded-b-md overflow-x-auto">
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="w-full table-auto min-w-[700px]">
            <thead className="bg-black text-white sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-center w-12">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={handleToggleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 text-left">สิทธิ์การเข้าถึง</th>
                {actions.map((ac) => (
                  <th key={ac} className="px-4 py-3 text-center">
                    {PermissionActionLabel[ac]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clickPermission.map((menu: any) => {
                const isRowAll = actions.every((ac) => menu.allowed?.[ac]);
                const toggleRow = (checked: boolean) =>
                  actions.forEach((ac) =>
                    handleCheck(menu.nameTh, ac, checked)
                  );

                return (
                  <tr key={menu.id} className="border-t bg-background">
                    <td className="text-center px-4 py-3">
                      <Checkbox
                        checked={isRowAll}
                        onCheckedChange={toggleRow}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {menu.nameTh}
                    </td>
                    {actions.map((ac) => (
                      <td key={ac} className="text-center px-4 py-3">
                        <Checkbox
                          checked={menu.allowed?.[ac] ?? false}
                          onCheckedChange={(ck) =>
                            handleCheck(menu.nameTh, ac, !!ck)
                          }
                        />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
