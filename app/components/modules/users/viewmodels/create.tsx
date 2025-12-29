import React from "react";
import GlobalButton from "~/components/shared/global-button";
import { Form } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ArrowBigLeftDash, ArrowBigRightDash, Save } from "lucide-react";
import { StepsVertical } from "~/components/shared/global-step";
import { calculateProgress } from "../../customer/create-customer";
import { Button } from "~/components/ui/button";
import { useGetAllRoles } from "~/api/client/role/useGetRole";
import { Card } from "~/components/ui/card";

export default function CreateUsers() {
  const navigate = useNavigate();
  const { data } = useGetAllDepartments(true);
  const { data: roles } = useGetAllRoles();

  const [current, setCurrent] = React.useState(0);

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
      organizationRoleId: "",
      permissions: [],
    },
  });

  const { isSubmitting } = formCreate.formState;
  const { mutate, isPending } = useCreateUsers();

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
            console.log("Created user:", data);

            navigate(`/users/${data?.id}`);
          },
          onError: (error) => {
            toast.error("เกิดข้อผิดพลาดขณะสร้างพนักงาน", { id: toastId });
            console.log("Error creating user", error);
          },
        });
      },
    });
  };

  const requiredUserFields = [
    "email",
    "password",
    "confirmPassword",
    "organizationRoleId",
    "active",
    "profile.firstName",
    "profile.lastName",
  ];

  // const values = formCreate.getValues();
  const values = formCreate.watch();
  const totalSteps = 6;

  const progressUserData = calculateProgress(values, requiredUserFields);
  const stepProgressMap = [progressUserData, 100, 100];

  const next = () => {
    setCurrent((c) => Math.min(c + 1, totalSteps - 1));
  };

  const prev = () => {
    setCurrent((c) => Math.max(c - 1, 0));
  };

  return (
    <div className="flex flex-col space-y-3 p-8">
      <TabControl
        title="สร้างพนักงาน"
        backpath="/users"
        // buttons={[
        //   <GlobalButton
        //     label={
        //       <>
        //         <Save /> สร้าง
        //       </>
        //     }
        //     key="create-button"
        //     type="submit"
        //     loading={isSubmitting}
        //     form="users"
        //   />,
        // ]}
      />

      <Form {...formCreate}>
        <form
          id="users"
          onSubmit={formCreate.handleSubmit(onSubmit, (Onerrors) => {
            const count = Object.keys(Onerrors).length;
            if (count > 0) {
              toast.error(`กรอกข้อมูลไม่ครบหรือไม่ถูกต้อง (${count} จุด)`);
            }
            console.log("errors", Onerrors);
          })}
        >
          <StepsVertical
            current={current}
            onChange={setCurrent}
            prev={prev}
            next={next}
            formName="users"
            disableBtn={stepProgressMap[current] < 100}
            finalButtonText="สร้างผู้ใช้งาน"
            classNameContent="w-full"
            totalSteps={totalSteps}
            steps={[
              {
                title: "ข้อมูลพนักงาน",
                descriptions:
                  "กรอกข้อมูลพื้นฐานของพนักงาน เช่น ชื่อ ตำแหน่ง แผนก",
                progress: progressUserData,
                content: (
                  <UserProfileCreate
                    form={formCreate}
                    data={data}
                    roles={roles}
                  />
                ),
              },

              {
                title: "ข้อมูลด้านค่าตอบแทน",
                descriptions:
                  "กรอกรายละเอียดเกี่ยวกับเงินเดือน สวัสดิการ และรูปแบบค่าตอบแทน",
                content: (
                  <Card>
                    <UserCompensation form={formCreate} />
                  </Card>
                ),
              },

              {
                title: "คุณสมบัติ & ความสามารถ",
                descriptions: "กรอกทักษะ ความสามารถ และข้อมูลด้านการศึกษา",
                content: (
                  <Card className="flex flex-col gap-2">
                    <UserSkills form={formCreate} />
                    <UserStudy form={formCreate} />
                  </Card>
                ),
              },

              {
                title: "ประสบการณ์ทำงาน",
                descriptions:
                  "กรอกประวัติการทำงานก่อนหน้า รวมถึงหน้าที่และระยะเวลา",
                content: (
                  <Card>
                    <UserWorkExperience form={formCreate} />
                  </Card>
                ),
              },

              {
                title: "โซเชียลมีเดีย",
                descriptions:
                  "กรอกช่องทางติดต่อต่าง ๆ ผ่านโซเชียลมีเดียหรือโปรไฟล์ออนไลน์",
                content: (
                  <Card>
                    <UserSocalmedias form={formCreate} />
                  </Card>
                ),
              },

              {
                title: "เอกสารแนบ",
                descriptions:
                  "อัปโหลดเอกสารที่เกี่ยวข้อง เช่น สำเนาบัตร Resume หรือใบรับรองต่าง ๆ",
                content: (
                  <Card>
                    <UserDocuments form={formCreate} />
                  </Card>
                ),
              },
            ]}
            // buttonBottom={
            //   <div className="flex gap-3 justify-end w-full">
            //     <Button
            //       className="w-25 bg-white border border-gray-300 text-black hover:bg-gray-100
            //                       group transition-all duration-200 hover:shadow-md"
            //       onClick={prev}
            //       type="button"
            //       disabled={current === 0}
            //     >
            //       <ArrowBigLeftDash className="transition-all duration-200 group-hover:-translate-x-1" />
            //       กลับไป
            //     </Button>

            //     {current < 5 && (
            //       <Button
            //         type="button"
            //         onClick={next}
            //         className="w-25 group transition-all duration-200 hover:shadow-md"
            //       >
            //         ถัดไป
            //         <ArrowBigRightDash className=" transition-all duration-200 group-hover:translate-x-1" />
            //       </Button>
            //     )}

            //     {current === 5 && (
            //       <Button
            //         type="submit"
            //         form="users"
            //         className="w-35 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm"
            //       >
            //         <Save /> สร้างผู้ใช้งาน
            //       </Button>
            //     )}
            //   </div>
            // }
          />

          {/* <Stepper
            initialStep={1}
            onStepChange={(step) => {
              console.log(step);
            }}
            backButtonText="Previous"
            nextButtonText="Next"
            className="w-full"
          >
            <Step>
              <UserProfileCreate form={form} data={data} />,
            </Step>
            <Step>
              <UserCompensation form={form} />
            </Step>
            <Step>
              <div className="flex flex-col gap-2">
                <UserSkills form={form} />
                <UserStudy form={form} />
              </div>
            </Step>
            <Step>
              <UserWorkExperience form={form} />
            </Step>
            <Step>
              <UserSocalmedias form={form} />
            </Step>
            <Step>
              <UserDocuments form={form} />
            </Step>
          </Stepper> */}

          {/* <div className="mt-2 flex flex-col md:flex-row gap-5">
            <div className="md:w-[35%] h-[50%] w-full">
              <Card className="p-4 h-full"></Card>
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

              <Card className="p-2">
                <PermissionControl />
              </Card>

              <Card className="p-2"><<OrgEmployeeTree /> /></Card>
            </div>
          </div> */}
        </form>
      </Form>
    </div>
  );
}
