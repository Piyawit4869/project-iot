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
import { RoleCreate } from "../components/formInformationCreate";

export default function CreateRoles() {
  const navigate = useNavigate();

  const form = useForm<RolesFormValues>({
    resolver: zodResolver(RolesFormSchema as any),
    defaultValues: {
      id: "",
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
            navigate(`/users/${data?.id}`);
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
                <RoleCreate form={form} />
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
