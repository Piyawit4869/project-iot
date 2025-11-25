"use client";

import GlobalButton from "~/components/shared/global-button";
import { Form } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "~/components/ui/card";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { TabControl } from "~/components/shared/tab-control";
import { Save } from "lucide-react";
import { RolesFormSchema, type RolesFormValues } from "~/schemas/roles/roles";
import { useGetRoles, useUpdateRoles } from "~/api/client/role/useGetRole";
import { getRequiredPaths } from "~/utils/form-adapter";
import ModalUser from "../../permission/components/modal-select-user";
import { useGetAllUsers } from "~/api/client/user";
import React from "react";
import { FormRolesSingle } from "../components/fromSingle";
import { GrantUser } from "../components/grantUser";

export default function SingleRoles() {
  const navigate = useNavigate();
  const checkFields = new Set(getRequiredPaths(RolesFormSchema as any));
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetRoles(params.id ?? "");

  const form = useForm<RolesFormValues>({
    resolver: zodResolver(RolesFormSchema as any),
    values: {
      name: data?.name || "",
      description: data?.description || "",
    },
  });

  const { isSubmitting } = form.formState;
  const { mutate } = useUpdateRoles(params.id ?? "");

  const onSubmit = (values: RolesFormValues) => {
    GlobalModal.info({
      title: "แก้ไขตำแหน่ง",
      description: "คุณต้องการแก้ไขตำแหน่งนี้ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังแก้ไขตำแหน่ง...");
        mutate(values, {
          onSuccess: (data) => {
            toast.success("แก้ไขตำแหน่งเรียบร้อยแล้ว!", { id: toastId });
            navigate(`//${data?.id}`);
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดขณะแก้ไขตำแหน่ง", { id: toastId });
          },
        });
      },
    });
  };

  return (
    <div className="flex flex-col space-y-3 p-8">
      <TabControl
        title={`แก้ไขตำแหน่ง ${data?.name}`}
        backpath="/roles"
        buttons={[
          <GlobalButton
            label={
              <>
                <Save /> บันทึก
              </>
            }
            key="edit-button"
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
            <div className="md:w-[35%] h-[50%] w-full">
              <Card className="p-4 h-full">
                <FormRolesSingle form={form} data={data} />
              </Card>
            </div>

            <div className="md:w-[65%] w-full flex flex-col gap-5">
              <Card className="p-2 py-8">
                <GrantUser form={form} data={data} />
              </Card>

              {/* <Card className="p-2 py-8">
                <UserCompensation form={form} data={data} />
              </Card> */}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
