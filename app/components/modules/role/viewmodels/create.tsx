"use client";

import GlobalButton from "~/components/shared/global-button";
import { Form } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "~/components/ui/card";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { TabControl } from "~/components/shared/tab-control";
import { Save } from "lucide-react";
import { RolesFormSchema, type RolesFormValues } from "~/schemas/roles/roles";
import { useCreateRoles } from "~/api/client/role/useGetRole";
import { getRequiredPaths } from "~/utils/form-adapter";
import { GlobalFormField } from "~/components/shared/global-form";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function CreateRoles() {
  const navigate = useNavigate();
  const checkFields = new Set(getRequiredPaths(RolesFormSchema as any));

  const form = useForm<RolesFormValues>({
    resolver: zodResolver(RolesFormSchema as any),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { isSubmitting } = form.formState;
  const { mutate } = useCreateRoles();

  const onSubmit = (values: RolesFormValues) => {
    GlobalModal.info({
      title: "สร้างตำแหน่ง",
      description: "คุณต้องการสร้างตำแหน่งนี้ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังสร้างตำแหน่ง...");
        mutate(values, {
          onSuccess: (data) => {
            toast.success("สร้างตำแหน่งเรียบร้อยแล้ว!", { id: toastId });
            navigate(`/roles/${data?.id}`);
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดขณะสร้างตำแหน่ง", { id: toastId });
          },
        });
      },
    });
  };

  return (
    <div className="flex flex-col space-y-3 p-8">
      <TabControl
        title="สร้างตำแหน่ง"
        backpath="/roles"
        buttons={[
          <GlobalButton
            label={
              <>
                <Save /> สร้าง
              </>
            }
            key="create-button"
            type="submit"
            loading={isSubmitting}
            form="roles"
          />,
        ]}
      />

      <Form {...form}>
        <form
          id="roles"
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            const count = Object.keys(errors).length;
            if (count > 0) {
              toast.error(`กรอกข้อมูลไม่ครบหรือไม่ถูกต้อง (${count} จุด)`);
            }
          })}
        >
          <div className="mt-2 flex flex-col md:flex-row gap-5">
            <div className="w-full">
              <Card className="p-4 h-full">
                <CardHeader>
                  <div className="flex gap-2">
                    <CardTitle className="text-base font-bold">
                      ข้อมูลตำแหน่ง
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className=" w-full">
                    <div className="lg:col-span-1 flex flex-col gap-3">
                      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-1 md:col-start-1">
                          <GlobalFormField
                            control={form.control}
                            name="name"
                            label="ชื่อตำแหน่ง"
                            type="input"
                            checkFields={checkFields}
                            placeholder="กรอกชื่อตำแหน่ง"
                          />
                        </div>
                        <div className="md:col-span-1 md:col-start-1">
                          <GlobalFormField
                            control={form.control}
                            name="description"
                            label="รายละเอียด"
                            type="textarea"
                            checkFields={checkFields}
                            placeholder="กรอกรายละเอียด"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
