import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlobalModal } from "~/components/shared/modal/modal";
import { useCreateUsers, useGetAllDepartments } from "~/api/client/user";
import { useNavigate } from "react-router";
import { TabControl } from "~/components/shared/tab-control";
import { UsersFormSchema, type UsersFormValues } from "~/schemas/users/user";
import { useModalStore } from "~/components/shared/modal/modal-controller";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { toast } from "sonner";
import { StepsVertical } from "~/components/shared/global-step";
import { UserProfileCreate } from "../components/formInformationCreate";
import { Card, CardContent } from "~/components/ui/card";
import ImageUpload from "~/components/shared/image-upload";
import { Input } from "~/components/ui/input";

type FormValues = {
  faceImage: File | null;
  name: string;
  email: string;
};

export function calculateProgress(
  values: any,
  requiredFields: string[],
  errors?: any,
) {
  let completed = 0;

  requiredFields.forEach((field) => {
    const value = field.split(".").reduce((o, k) => o?.[k], values);
    const hasError = field.split(".").reduce((o, k) => o?.[k], errors);

    if (value !== undefined && value !== null && value !== "" && !hasError) {
      completed += 1;
    }
  });

  return Math.round((completed / requiredFields.length) * 100);
}

export default function CreateUsers() {
  const navigate = useNavigate();

  const formCreate = useForm<UsersFormValues>({
    resolver: zodResolver(UsersFormSchema as any),
    defaultValues: {
      userName: null,
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
        emId: "",
        gender: "",
        birthDate: null,
        phone: "",
        age: undefined,
        imageUrl: "",
        photoUrl: "",
        taxId: "",
        nickName: "",
        nationality: "",
        religion: "",
        weight: undefined,
        height: undefined,
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
      organizationRoleId: "",
      permissions: [],
    },
  });

  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      faceImage: null,
      name: "",
      email: "",
    },
  });

  const { isDirty } = formCreate.formState;

  React.useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const cancelCreate = () => {
    if (!isDirty) {
      navigate("/users");
    } else {
      GlobalModal.info({
        title: "ยืนยันการออกจากหน้าสร้างพนักงาน",
        description:
          "ข้อมูลที่กรอกไว้ยังไม่ได้ถูกบันทึก หากออกจากหน้านี้ ข้อมูลเหล่านี้จะไม่ถูกบันทึก",
        confirmText: "ยืนยัน",
        cancelText: "ยกเลิก",
        onConfirm: () => {
          navigate("/users");
        },
        onCancel: () => {
          useModalStore.getState().hide();
        },
      });
    }
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    if (data.faceImage) {
      formData.append("files", data.faceImage);
    }

    formData.append("name", data.name);

    console.log("formData", formData);

    await fetch("http://127.0.0.1:9000/faces/upload", {
      method: "POST",
      headers: {
        "x-agent-token": "supersecret",
      },
      body: formData,
    });
  };

  return (
    <div className="flex flex-col space-y-3 p-8">
      <TabControl
        title="สร้างข้อมูลบุคคล"
        backpath={() => cancelCreate()}
        buttons={[
          <Button
            type="submit"
            form="users"
            className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="hidden sm:inline">สร้าง</span>
          </Button>,
        ]}
      />
      <Form {...formCreate}>
        <form id="users" onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardContent className="space-y-4">
              <div className=" w-full">
                <div className="lg:col-span-2 flex flex-col gap-3">
                  <FormField
                    control={formCreate.control}
                    name="profile.imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>รูปบุคคล</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value || ""}
                            onChange={field.onChange}
                            className="object-contain"
                            onFileChange={(file) => setValue("faceImage", file)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormItem>
                      <FormLabel>ชื่อบุคคล</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="กรอกชื่อบุคคล"
                          {...register("name", { required: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
