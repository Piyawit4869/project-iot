"use client";

import GlobalButton from "~/components/shared/global-button";
import { Form } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "~/components/ui/card";

import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";

import { useCreateUsers, useGetAllDepartments } from "~/api/client/user";
import { useNavigate } from "react-router";
import { TabControl } from "~/components/shared/tab-control";
import { UsersFormSchema, type UsersFormValues } from "~/schemas/users/user";
import { UserProfileCreate } from "../components/formInformationCreate";
import { UserCompensation } from "../components/formCompensation";
import { UserSkills } from "../components/formSkills";
import { UserWorkExperience } from "../components/formworkExperiences";
import { UserStudy } from "../components/formStudy";
import { UserSocalmedias } from "../components/formSocalmedia";
import { UserDocuments } from "../components/formDocuments";

export const CreateUsers = () => {
  const navigate = useNavigate();
  const { data } = useGetAllDepartments(true);

  const form = useForm<UsersFormValues>({
    resolver: zodResolver(UsersFormSchema as any),
    defaultValues: {
      id: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      status: "active",
      active: true,
      activate: true,
      profile: {
        prefix: "",
        firstName: "",
        lastName: "",
        firstNameTh: "",
        lastNameTh: "",
        gender: "",
        birthDate: null,
        phone: "",
        age: 0,
        imageUrl: "",
        photoUrl: "",
        taxId: "",
        nickName: "",
        nationality: "",
        religion: "",
        weight: 0,
        height: 0,
        startWorkDate: null,
        endWorkDate: null,
        isMobile: false,
        deviceToken: "",

        educationInformations: [],
        socialMedia: [],
        skills: [],
        workExperiences: [],
        compensationConfigs: [],
        documents: [],
      },
      userDepartments: [],
      permissions: [],
    },
  });

  const { isSubmitting } = form.formState;
  const { mutate } = useCreateUsers();

  const onSubmit = (values: UsersFormValues) => {
    GlobalModal.info({
      title: "สร้างพนักงาน",
      description: "คุณต้องการสร้างพนักงานนี้ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังสร้างพนักงาน...");
        mutate(values, {
          onSuccess: (data) => {
            toast.success("สร้างพนักงานเรียบร้อยแล้ว!", { id: toastId });
            navigate(`/organization/user/${data?.id}`);
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดขณะสร้างพนักงาน", { id: toastId });
          },
        });
      },
    });
  };

  return (
    <div className="flex flex-col space-y-3 p-8">
      <TabControl
        title="สร้างพนักงาน"
        backpath="/users"
        buttons={[
          <GlobalButton
            label="สร้าง"
            key="create-button"
            type="submit"
            loading={isSubmitting}
            form="users"
          />,
        ]}
      />

      <Form {...form}>
        <form
          id="users"
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
                <UserProfileCreate form={form} data={data} />
              </Card>
            </div>

            <div className="md:w-[65%] w-full flex flex-col gap-5">
              <Card className="p-2">
                <UserCompensation form={form} />
              </Card>

              <Card className="p-2">
                <UserSkills form={form} />
              </Card>

              <Card className="p-2">
                <UserWorkExperience form={form} />
              </Card>

              <Card className="p-2">
                <UserStudy form={form} />
              </Card>

              <Card className="p-2">
                <UserSocalmedias form={form} />
              </Card>

              <Card className="p-2">
                <UserDocuments form={form} />
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
