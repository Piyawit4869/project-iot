"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
  PermissionControlSchema,
  type PermissionValuesData,
} from "~/schemas/permission-control/PermissionControl";
import type { PermissionAction } from "../iniData";
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
import { Switch } from "~/components/ui/switch";
import { Badge } from "~/components/ui/badge";
import { PermissionDataTable } from "../components/permissionDataTable";

export default function Page() {
  // const { PermissionControlPaginate } = usePermissionControlViewModel();

  // const params = useParams<{ id: string }>();
  // const router = useRouter();

  // const { data } = useGetPermission(params.id);
  // const { data: dataPermission } = useGetAllPermissions(params.id);
  const [clickPermission, setClickPermission] = React.useState<any[]>([]);
  // const actions = Object.values(PermissionAction);
  // const dataItems = dataPermission?.department ?? [];

  // useEntityBreadcrumb({
  //   feature: "permission-control",
  //   entity: dataPermission
  //     ? {
  //         id: dataPermission.department.id,
  //         name: dataPermission.department.name ?? dataPermission.id,
  //       }
  //     : undefined,
  //   base: dataPermission && {
  //     href: `/permission-control/${dataPermission?.department.id}`,
  //     label: dataPermission.department.name,
  //     uuid: dataPermission?.department.id,
  //   },
  // });

  const form = useForm<PermissionValuesData>({
    resolver: zodResolver(PermissionControlSchema as any),
    mode: "onSubmit",
    // values: {
    //   // scope: "user",
    //   // subjectId: params.id ?? "",
    //   // mode: "replace",
    //   // enabled: true,
    //   // active: data?.active ?? true,
    //   // note: "",
    //   // permissions:
    //   //   dataItems?.items?.map((item: any) => ({
    //   //     coreFeatureId: item.id,
    //   //     effect: "allow",
    //   //     actions: Object.keys(item.allowed || {}).filter(
    //   //       (ac) => ac in PermissionAction
    //   //     ) as PermissionAction[],
    //   //   })) ?? [],
    // },
  });

  // React.useEffect(() => {
  //   if (dataPermission) {
  //     form.reset({
  //       name: dataPermission.department.name,
  //       description: dataPermission.department.description,
  //       status: dataPermission.department.status,
  //       active: dataPermission.department.active,

  //       scope: dataPermission.scope ?? "user",
  //       subjectId: dataPermission.subjectId ?? params.id,
  //       mode: dataPermission.mode ?? "replace",
  //       enabled: dataPermission.enabled ?? true,
  //       note: dataPermission.note ?? "",
  //       permissions: dataPermission.permissions ?? [],
  //     });
  //   }
  // }, [dataPermission]);

  const { isSubmitting } = form.formState;

  const getSelectedPermissions = () => {
    return clickPermission
      .filter((menu) => Object.values(menu.allowed ?? {}).some(Boolean))
      .map((menu) => ({
        coreFeatureId: String(menu.id),
        effect: "allow" as const,
        actions: Object.entries(menu.allowed ?? {})
          .filter(([_, v]) => v)
          .map(([k]) => k as PermissionAction),
      }));
  };

  const permissionsForSubmit = getSelectedPermissions();
  form.setValue("permissions", permissionsForSubmit);

  const payload = {
    enabled: true,
    active: true,
    scope: "user",
    // subjectId: params.id ?? "",
    mode: "replace",
    permissions: permissionsForSubmit,
  } as PermissionValuesData;

  // const { mutate } = useUpdatePermissionControl(params.id ?? "");
  // const onSubmit = () => {
  //   GlobalModal.info({
  //     title: "แก้ไขสิทธิ์การเข้าถึง",
  //     description: "คุณต้องการแก้ไขสิทธิ์การเข้าถึงนี้ใช่หรือไม่",
  //     confirmText: "ยืนยัน",
  //     cancelText: "ยกเลิก",
  //     onConfirm: () => {
  //       const toastId = toast.loading("กำลังแก้ไขสิทธิ์การเข้าถึง...");
  //       mutate(payload, {
  //         onSuccess: () => {
  //           toast.success("แก้ไขสิทธิ์การเข้าถึงเรียบร้อยแล้ว!", {
  //             id: toastId,
  //           });
  //           router.push("/organization/setting-organization/permission");
  //         },
  //         onError: () => {
  //           toast.error("เกิดข้อผิดพลาดขณะแก้ไขสิทธิ์การเข้าถึง", {
  //             id: toastId,
  //           });
  //         },
  //       });
  //     },
  //   });
  // };

  // const { mutate: DeletePerm } = useDeletePermissionControl();
  // const handleDelete = (id: string) => {
  //   GlobalModal.warning({
  //     title: "ลบสิทธิ์การเข้าถึง",
  //     description: "คุณต้องการลบสิทธิ์การเข้าถึงนี้ใช่หรือไม่",
  //     confirmText: "ยืนยัน",
  //     cancelText: "ยกเลิก",
  //     onConfirm: () => {
  //       const toastId = toast.loading("กำลังลบสิทธิ์การเข้าถึง...");
  //       DeletePerm(id, {
  //         onSuccess: () => {
  //           toast.success("ลบสิทธิ์การเข้าถึงเรียบร้อยแล้ว!", { id: toastId });
  //           router.push("/organization/setting-organization/permission");
  //         },
  //         onError: () => {
  //           toast.error("เกิดข้อผิดพลาดขณะลบสิทธิ์การเข้าถึง", { id: toastId });
  //         },
  //       });
  //     },
  //   });
  // };

  const handleCheck = (menuName: string, action: string, checked: boolean) => {
    setClickPermission((prev) =>
      prev.map((menu) =>
        menu.id === menuName
          ? {
              ...menu,
              allowed: { ...menu.allowed, [action]: checked },
            }
          : menu
      )
    );
  };

  React.useEffect(() => {
    form.clearErrors();
  }, [form]);

  // React.useEffect(() => {
  //   if (dataPermission?.items) {
  //     setClickPermission(dataPermission.items);
  //   }
  // }, [dataPermission]);

  return (
    <div className="flex-1 flex-col space-y-3 p-8 md:flex sm:flex">
      <TabControl
        title="แก้ไขสิทธิ์การเข้าถึง"
        backpath="/organization/setting-organization/permission"
        buttons={[
          <GlobalButton
            key="save"
            label="บันทึก"
            type="submit"
            loading={isSubmitting}
            form="permission"
          />,
          <GlobalButton key="delete" label="ลบ" variant="outline" />,
        ]}
      />

      <Form {...form}>
        {/* <form id="permission" onSubmit={form.handleSubmit(onSubmit)}> */}
        <form id="permission">
          <div className="text-lg font-semibold">เพิ่มสิทธิ์การใช้งาน</div>{" "}
          <div className="space-y-4">
            <div className="space-y-4 px-4 py-3 bg-background rounded-t-md border-b">
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm font-medium">
                  ชื่อตำแหน่ง <span className="text-red-500">*</span>
                </label>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-x-4 mt-1">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="ชื่อตำแหน่ง"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            form.setValue("name", e.target.value)
                          }
                          className="h-8 w-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="w-32 text-sm font-medium">รายละเอียด</label>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-x-4 mt-1">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="รายละเอียด"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            form.setValue("description", e.target.value)
                          }
                          className="h-8 w-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-x-4 mt-1">
                    <label className="w-32 text-sm font-medium">
                      สถานะเปิดใช้งาน
                    </label>
                    <FormControl>
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-x-4 mt-1">
                    <label className="w-32 text-sm font-medium">สถานะ</label>
                    <FormControl>
                      <Badge variant="secondary">{field.value}</Badge>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border rounded-b-md overflow-x-auto">
              <div className="max-h-[60vh] overflow-y-auto">
                {/* <PermissionDataTable
                  queryFunction={({ pageIndex, pageSize }) =>
                    PermissionControlPaginate({
                      pageIndex,
                      pageSize,
                      id: params.id,
                    })
                  }
                  actions={actions}
                  handleCheck={handleCheck}
                  clickPermission={clickPermission}
                /> */}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
