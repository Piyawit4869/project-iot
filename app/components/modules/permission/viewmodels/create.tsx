"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
  PermissionControlFormSchema,
  type PermissionControlValues,
} from "~/schemas/permission-control/PermissionControl";
import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { Switch } from "~/components/ui/switch";

export default function Page() {
  const [formData, setFormData] = useState<
    Record<string, Record<string, boolean>>
  >({});
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );
  const [allSelected, setAllSelected] = useState(false);

  // const params = useParams<{ id: string }>();
  // const router = useRouter();

  const form = useForm<PermissionControlValues>({
    resolver: zodResolver(PermissionControlFormSchema as any),
    mode: "onSubmit",
    values: {
      id: "",
      name: "",
      firstName: "",
      lastName: "",
      description: "",
      photoUrl: "",
      status: "",
      active: true,
      mainSupportId: "",
      mainRoleId: "",
      SelectedUsers: [],
    },
  });

  React.useEffect(() => {
    form.clearErrors();
  }, [form]);

  // const handleToggleSelectAll = () => {
  //   setAllSelected((prev) => {
  //     const next = !prev;
  //     setFormData(() => {
  //       const updated: Record<string, Record<string, boolean>> = {};
  //       const setMenu = (name: string) => {
  //         const perms: Record<string, boolean> = {};
  //         actions.forEach((ac) => (perms[ac] = next));
  //         updated[name] = perms;
  //       };
  //       permissions.forEach((m) => {
  //         setMenu(m.name);
  //         m.children?.forEach(setMenu);
  //       });
  //       return updated;
  //     });
  //     return next;
  //   });
  // };

  const handleCheck = (menu: string, action: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [menu]: { ...prev[menu], [action]: checked },
    }));
  };

  const { isSubmitting } = form.formState;
  // const { mutate } = useUpdatePermissionControl(params.id ?? "");

  // const onSubmit = (values: PermissionControlValues) => {
  //   GlobalModal.info({
  //     title: "สร้างสิทธิ์การเข้าถึง",
  //     description: "คุณต้องการสร้างสิทธิ์การเข้าถึงนี้ใช่หรือไม่",
  //     confirmText: "ยืนยัน",
  //     cancelText: "ยกเลิก",
  //     onConfirm: () => {
  //       const toastId = toast.loading("กำลังสร้างสิทธิ์การเข้าถึง...");
  //       mutate(values, {
  //         onSuccess: (data) => {
  //           toast.success("สร้างสิทธิ์การเข้าถึงเรียบร้อยแล้ว!", {
  //             id: toastId,
  //           });
  //           router.push(`/organization/permission-control/${data.data.id}`);
  //         },
  //         onError: () => {
  //           toast.error("เกิดข้อผิดพลาดขณะสร้างสิทธิ์การเข้าถึง", {
  //             id: toastId,
  //           });
  //         },
  //       });
  //     },
  //   });
  // };

  return (
    <div className="flex-1 flex-col space-y-3 p-8 md:flex sm:flex">
      <TabControl
        title="สร้างสิทธิ์การเข้าถึง"
        backpath="/organization/permission-control"
        buttons={[
          <GlobalButton
            key="save"
            label="บันทึก"
            type="submit"
            loading={isSubmitting}
            form="permission"
          />,
        ]}
      />

      <Form {...form}>
        {/* <form id="permission" onSubmit={form.handleSubmit(onSubmit)}> */}
        <form id="permission">
          <div className="text-lg font-semibold">เพิ่มสิทธิ์การใช้งาน</div>
          <div className="space-y-4">
            <div className="space-y-4 px-4 py-3 bg-background rounded-t-md border-b">
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm font-medium">
                  ชื่อตำแหน่ง <span className="text-red-500">*</span>
                </label>
                <Input
                  name="name"
                  placeholder="ชื่อตำแหน่ง"
                  value={form.watch("name")}
                  onChange={(e) => form.setValue("name", e.target.value)}
                  className="h-8 w-[300px]"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="w-32 text-sm font-medium">รายละเอียด</label>
                <Input
                  name="description"
                  placeholder="รายละเอียด"
                  value={form.watch("description")}
                  onChange={(e) => form.setValue("description", e.target.value)}
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
                          // onCheckedChange={handleToggleSelectAll}
                        />
                      </th>
                      <th className="px-4 py-3 text-left">สิทธิ์การเข้าถึง</th>
                      {/* {actions.map((ac) => (
                        <th key={ac} className="px-4 py-3 text-center">
                          {ac}
                        </th>
                      ))} */}
                    </tr>
                  </thead>
                  {/* <tbody>
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
                                    <td
                                      key={ac}
                                      className="text-center px-4 py-3"
                                    >
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
                  </tbody> */}
                </table>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
