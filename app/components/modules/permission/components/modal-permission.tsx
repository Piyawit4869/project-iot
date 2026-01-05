"use client";

import React, { useState } from "react";
import type { ModelPermissionControlProps } from "../type";
import { actions, permissions } from "../iniData";
import type { PermissionControlValues } from "~/schemas/permission-control/PermissionControl";
import { FormProvider } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ChevronDown, ChevronRight, Pencil } from "lucide-react";
import { FormControl, FormField, FormItem } from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";

export default function ModelPermissionControl({
  form,
  roles,
  initialName,
  onSaveName,
  onClose,
}: ModelPermissionControlProps) {
  const [formData, setFormData] = React.useState<
    Record<string, Record<string, boolean>>
  >({});
  const [roleName, setRoleName] = React.useState(initialName);
  const [editing, setEditing] = React.useState(true);
  const [expandedMenus, setExpandedMenus] = React.useState<
    Record<string, boolean>
  >({});
  const [allSelected, setAllSelected] = React.useState(false);
  const [description, setDescription] = React.useState("");

  // const { mutate: createPerm } = useCreatePermissionControl();

  // const {} = useGetAllEmployeeRole();

  const [roleSearchTerm, setRoleSearchTerm] = useState("");

  const handleToggleSelectAll = () => {
    setAllSelected((prev) => {
      const next = !prev;
      setFormData(() => {
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
        return updated;
      });
      return next;
    });
  };

  React.useEffect(() => {
    form.clearErrors();
  }, [form]);

  const handleCheck = (menu: string, action: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [menu]: { ...prev[menu], [action]: checked },
    }));
  };

  const handleSaveName = () => {
    const trimmed = roleName.trim();
    if (!trimmed) return;
    setEditing(false);
  };

  // const handleSubmitPermissions = (values: PermissionControlValues) => {
  //   createPerm({ ...values, description });
  //   onSaveName(roleName.trim() || "New Role");
  //   onClose();
  // };

  return (
    <FormProvider {...form}>
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4 pt-5">
          <div className="flex items-center gap-2">
            {editing ? (
              <>
                <Input
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="w-[150px] h-8"
                  placeholder="กรอกชื่อตำแหน่ง"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleSaveName}
                  className="h-8 px-3"
                >
                  บันทึกชื่อ
                </Button>
              </>
            ) : (
              <>
                <span className="text-xl font-bold">{roleName}</span>
                <Pencil
                  className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-black"
                  onClick={() => setEditing(true)}
                />
              </>
            )}
          </div>
          <div />
        </div>

        <div className="flex items-center gap-6 px-4 py-3 bg-background rounded-t-md border-b">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">
              เลือกเทมเพลตบทบาท
            </label>
            <div className="h-8 w-60">
              <FormField
                control={form.control}
                name="mainRoleId"
                render={({ field }) => (
                  <FormItem className="m-0">
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <SelectTrigger className="w-full h-8">
                          <SelectValue placeholder="เลือกเทมเพลต" />
                        </SelectTrigger>
                        <SelectContent className="w-full max-h-60 overflow-y-auto">
                          <Input
                            placeholder="Search เทมเพลต"
                            value={roleSearchTerm}
                            onChange={(e) => setRoleSearchTerm(e.target.value)}
                            className="mb-2"
                          />
                          {roles
                            .filter((role) =>
                              role.name
                                .toLowerCase()
                                .includes(roleSearchTerm.toLowerCase())
                            )
                            .map((role) => (
                              <SelectItem key={role.id} value={role.id ?? ""}>
                                {role.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">รายละเอียด</label>
            <Input
              placeholder="รายละเอียด..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-8 w-60"
            />
          </div>
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
                      {ac}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissions.map((menu) => {
                  const expandable = !!menu.children;
                  const expanded = expandedMenus[menu.name];
                  const isRowAll = actions.every(
                    (ac) => formData?.[menu.name]?.[ac]
                  );
                  const toggleRow = (checked: boolean) =>
                    actions.forEach((ac) =>
                      handleCheck(menu.name, ac, checked)
                    );

                  return (
                    <React.Fragment key={menu.name}>
                      <tr className="border-t bg-background">
                        <td className="text-center px-4 py-3">
                          <Checkbox
                            checked={isRowAll}
                            onCheckedChange={toggleRow}
                          />
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">
                          <div className="flex items-center gap-2">
                            {expandable && (
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedMenus((prev) => ({
                                    ...prev,
                                    [menu.name]: !prev[menu.name],
                                  }))
                                }
                                className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-white"
                              >
                                {expanded ? (
                                  <ChevronDown size={16} />
                                ) : (
                                  <ChevronRight size={16} />
                                )}
                              </button>
                            )}
                            {menu.name}
                          </div>
                        </td>
                        {actions.map((ac) => (
                          <td key={ac} className="text-center px-4 py-3">
                            <Checkbox
                              checked={!!formData?.[menu.name]?.[ac]}
                              onCheckedChange={(ck) =>
                                handleCheck(menu.name, ac, !!ck)
                              }
                            />
                          </td>
                        ))}
                      </tr>

                      {expandable &&
                        expanded &&
                        menu.children!.map((child) => {
                          const isChildAll = actions.every(
                            (ac) => formData?.[child]?.[ac]
                          );
                          const toggleChild = (checked: boolean) =>
                            actions.forEach((ac) =>
                              handleCheck(child, ac, checked)
                            );

                          return (
                            <tr key={child} className="border-t bg-white">
                              <td className="text-center px-4 py-3">
                                <Checkbox
                                  checked={isChildAll}
                                  onCheckedChange={toggleChild}
                                />
                              </td>
                              <td className="px-8 py-3 text-sm text-muted-foreground">
                                └ {child}
                              </td>
                              {actions.map((ac) => (
                                <td key={ac} className="text-center px-4 py-3">
                                  <Checkbox
                                    checked={!!formData?.[child]?.[ac]}
                                    onCheckedChange={(ck) =>
                                      handleCheck(child, ac, !!ck)
                                    }
                                  />
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end px-4 py-3 border-t">
          <Button
            size="sm"
            onClick={form.handleSubmit((values) => {
              const trimmed = roleName.trim();
              if (trimmed) onSaveName(trimmed);
              // handleSubmitPermissions(values);
            })}
            className="h-8 px-4"
          >
            บันทึก
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
