import { useNavigate } from "react-router";

import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { useModalStore } from "~/components/shared/modal/modal-controller";
import { CustomerProvider } from "~/hooks/customer/useCustomerStore";
import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import { ArrowBigLeftDash, ArrowBigRightDash, Save } from "lucide-react";
import { Form } from "~/components/ui/form";
import { useCreateCustomer } from "~/api/client/customer/useCustomer";

import type { CustomerValues } from "~/schemas/customer/customer-form";
import { StepsVertical } from "~/components/shared/global-step";

import React from "react";
import { Button } from "~/components/ui/button";
import { calculateProgress } from "../customer/create-customer";
import { useCustomerViewModel } from "../customer/viewmodels/useCustomerViewModel";
import { CustomerInfoCard } from "../customer/components/customer-info";
import { OrganizationDetailCard } from "./components/create-organization/organization-detail-card";
import type { UseFormReturn } from "react-hook-form";
import type { BranchesOrganization } from "~/schemas/settings";

import { OrganizationAddressCard } from "./components/create-organization/organization-address";
import { SettingForm } from "./components/setting-setting-form";
import { Card, CardContent } from "~/components/ui/card";
import { OrganizationContactCard } from "./components/create-organization/organization-contact-card";
import { useBranchesOrganizationViewModel } from "./viewmodels/useBranchesOrganizationViewModel";

export type ProgressConfig = {
  [stepKey: string]: string[]; // array ของ required fields ในแต่ละ step
};

export interface CreateOrganizationFormCreateProps {
  form: UseFormReturn<BranchesOrganization>;
  isLoading?: boolean;
  // dataFromAI?: any;
  // disabled?: boolean;
  isEdit?: boolean;
  // setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  // mode?: string;

  // onClick?: (values: CustomerValues) => void;

  onCancel?: (key: string) => void;
  onEditForm?: (key: string) => void;
  fetchCustomer?: () => void;
}

export default function CreateOrganization() {
  const navigate = useNavigate();

  const {
    state: { formCreate, isCreating },
    actions: { onCreate },
  } = useBranchesOrganizationViewModel();

  const { isDirty } = formCreate.formState;

  const [current, setCurrent] = React.useState(0);
  const totalSteps = 4;

  const next = () => {
    setCurrent((c) => Math.min(c + 1, totalSteps - 1));
  };

  const prev = () => {
    setCurrent((c) => Math.max(c - 1, 0));
  };

  const cancelCreate = () => {
    if (!isDirty) {
      navigate("/setting-organization");
    } else {
      GlobalModal.info({
        title: "ยืนยันการออกจากหน้าสร้างสาขาขององค์กร",
        description:
          "ข้อมูลที่กรอกไว้ยังไม่ได้ถูกบันทึก หากออกจากหน้านี้ ข้อมูลเหล่านี้จะไม่ถูกบันทึก",
        confirmText: "ยืนยัน",
        cancelText: "ยกเลิก",
        onConfirm: () => {
          navigate("/setting-organization");
        },
        onCancel: () => {
          useModalStore.getState().hide();
        },
      });
    }
  };

  const requiredDetailFields = [
    "nameTh",
    "taxId",
    "status",
    "fromType",
    "branchType",
  ];

  const requiredAddressFields = [
    "address.name",
    "address.houseNo",
    "address.subDistrict",
    "address.city",
    "address.province",
    "address.nation",
    "address.postalCode",
  ];

  const requiredSettingFields = [
    "setting.openDays",
    "theme",
    "textDisplay",
    "defaultLanguage",
    "branchType",
  ];

  const values = formCreate.getValues();
  const progressDetailData = calculateProgress(values, requiredDetailFields);
  const progressAddressData = calculateProgress(values, requiredAddressFields);

  const progressSettingData = calculateProgress(values, requiredSettingFields);
  // const progressOrganizationData = calculateProgress(
  //   values,
  //   requiredOrganizationFields
  // );

  return (
    <div className="flex flex-col space-y-3 p-4    ">
      <TabControl
        title="สร้างสาขาขององค์กร"
        backpath={() => cancelCreate()}
        // buttons={[
        //   <>

        //   </>,
        // ]}
      />

      <Form {...formCreate}>
        <form id="customer" onSubmit={formCreate.handleSubmit(onCreate)}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="  w-full">
              <StepsVertical
                current={current}
                onChange={setCurrent}
                classNameContent="w-full"
                steps={[
                  {
                    title: "ข้อมูลสาขาขององค์กร",
                    descriptions:
                      "กรุณากรอกข้อมูลสาขาขององค์กรให้ครบถ้วนเพื่อใช้ในการดำเนินงาน",
                    progress: progressDetailData,
                    content: <OrganizationDetailCard form={formCreate} />,
                  },

                  {
                    title: "ข้อมูลที่อยู่สาขา",
                    descriptions:
                      "กรอกข้อมูลที่อยู่สาขาเพื่อใช้ในการติดต่อและดำเนินงาน",
                    progress: progressAddressData,
                    content: <OrganizationAddressCard form={formCreate} />,
                  },

                  {
                    title: "ตั้งค่าสาขา",
                    descriptions:
                      "กรอกข้อมูลที่อยู่สาขาเพื่อใช้ในการติดต่อและดำเนินงาน",
                    progress: progressSettingData,
                    content: (
                      <Card>
                        <CardContent className="p-0">
                          <SettingForm
                            form={formCreate}
                            isCreate={true}
                            isEditing={true}
                          />
                        </CardContent>
                      </Card>
                    ),
                  },

                  {
                    title: "ข้อมูลผู้ติดต่อ (ไม่บังคับ)",
                    descriptions:
                      "กรอกผู้ติดต่อเพิ่มเติมหากมี ในกรณีที่ผู้ที่ต้องติดต่อไม่ใช่สาขาขององค์กรโดยตรง",
                    content: (
                      <Card>
                        <CardContent className="p-0">
                          <OrganizationContactCard
                            form={formCreate}
                            isEdit={true}
                          />
                        </CardContent>
                      </Card>
                    ),
                  },
                ]}
                buttonBottom={
                  <div className="flex gap-3 justify-end w-full">
                    <Button
                      className="w-25 bg-white border border-gray-300 text-black hover:bg-gray-100 
                        group transition-all duration-200 hover:shadow-md"
                      onClick={prev}
                      type="button"
                      disabled={current === 0}
                    >
                      <ArrowBigLeftDash className="transition-all duration-200 group-hover:-translate-x-1" />
                      กลับไป
                    </Button>

                    {current < 3 && (
                      <Button
                        type="button"
                        onClick={next}
                        className="w-25 group transition-all duration-200 hover:shadow-md"
                      >
                        ถัดไป
                        <ArrowBigRightDash className=" transition-all duration-200 group-hover:translate-x-1" />
                      </Button>
                    )}

                    {current === 3 && (
                      <Button
                        type="submit"
                        // disabled={isDisabled || isCreating}
                        form="customer"
                        className="w-30 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm"
                      >
                        <Save /> สร้างสาขา
                      </Button>
                    )}
                  </div>
                }
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
