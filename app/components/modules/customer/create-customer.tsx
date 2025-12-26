import { useNavigate } from "react-router";
import { useCustomerViewModel } from "./viewmodels/useCustomerViewModel";

import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { useModalStore } from "~/components/shared/modal/modal-controller";
import { CustomerProvider } from "~/hooks/customer/useCustomerStore";
import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import { ArrowBigLeftDash, ArrowBigRightDash, Save } from "lucide-react";
import { Form } from "~/components/ui/form";
import { useCreateCustomer } from "~/api/client/customer/useCustomer";
import { CustomerInfoCard } from "./components/customer-info";
import { CustomerDeatailCard } from "./components/customer-detail-card";
import { CustomerTagAndAI } from "./components/customer-tag-ai";
import type { CustomerValues } from "~/schemas/customer/customer-form";
import { StepsVertical } from "~/components/shared/global-step";
import { OtherDetatil } from "./components/other-detatil";
import React from "react";
import { Button } from "~/components/ui/button";

export function calculateProgress(formValues: any, requiredFields: string[]) {
  let filled = 0;

  requiredFields.forEach((field) => {
    const value = field
      .split(".")
      .reduce((obj: any, key: string) => obj?.[key], formValues);

    if (value !== undefined && value !== null && value !== "") {
      filled += 1;
    }
  });

  return Math.round((filled / requiredFields.length) * 100);
}

export type ProgressConfig = {
  [stepKey: string]: string[]; // array ของ required fields ในแต่ละ step
};

export default function CreateCustomer() {
  const navigate = useNavigate();

  const {
    state: { formCreate, isCreating },
  } = useCustomerViewModel();
  const { mutate: creation, isPending } = useCreateCustomer();

  const { isDirty } = formCreate.formState;

  const phoneContact = formCreate.watch("contacts.0.phone");
  const nameContact = formCreate.watch("contacts.0.name");

  const isDisabled =
    !!isPending ||
    ((!!phoneContact?.trim() || !!nameContact?.trim()) &&
      (!phoneContact?.trim() || !nameContact?.trim()));

  const [current, setCurrent] = React.useState(0);
  const totalSteps = 4;

  const next = () => {
    setCurrent((c) => Math.min(c + 1, totalSteps - 1));
  };

  const prev = () => {
    setCurrent((c) => Math.max(c - 1, 0));
  };

  const onCreate = (values: CustomerValues) => {
    const payload = Object.assign({}, values);
    const contact = payload?.contacts?.[0];

    if (
      contact &&
      !contact.name &&
      !contact.phone &&
      !contact.position &&
      !contact.department &&
      !contact.email
    ) {
      payload.contacts = [];
    }

    GlobalModal.info({
      title: "ยืนยันการสร้างข้อมูลลูกค้า",
      description: "คุณต้องการสร้างข้อมูลลูกค้านี้หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังบันทึกข้อมูลลูกค้า...", {
          position: "bottom-right",
        });
        creation(payload, {
          onSuccess: (data) => {
            toast.success("บันทึกข้อมูลลูกค้าสำเร็จ !", {
              id: toastId,
              duration: 2500,
              position: "bottom-right",
            });
            navigate(`/customer/${data.id}`);
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดในการสร้างลูกค้า", {
              id: toastId,

              duration: 3000,
              position: "bottom-right",
            });
          },
        });
      },
    });
  };

  const cancelCreate = () => {
    if (!isDirty) {
      navigate("/customer");
    } else {
      GlobalModal.info({
        title: "ยืนยันการออกจากหน้าสร้างลูกค้า",
        description:
          "ข้อมูลที่กรอกไว้ยังไม่ได้ถูกบันทึก หากออกจากหน้านี้ ข้อมูลเหล่านี้จะไม่ถูกบันทึก",
        confirmText: "ยืนยัน",
        cancelText: "ยกเลิก",
        onConfirm: () => {
          navigate("/customer");
        },
        onCancel: () => {
          useModalStore.getState().hide();
        },
      });
    }
  };

  const requiredCustomerFields = [
    // "profile.imageUrl",
    "status",
    "profile.firstName",
    // "profile.lastName",
    // "profile.gender",
    // "profile.birthDate",
    // "profile.age",
    // "customerType",
    // "profile.phone",
  ];

  const requiredOrganizationFields = [
    "organizationDetails.businessName",
    "organizationDetails.fromType",
    // "organizationDetails.branchCode",
    // "organizationDetails.businessPhone",
    // "organizationDetails.businessFax",
    // "organizationDetails.businessEmail",
    // "organizationDetails.importantDate",
    // "organizationDetails.openingDate",
    // "organizationDetails.orgType",
    // "organizationDetails.websiteUrl",
    // "organizationDetails.note",
    // "organizationDetails.descriptions",
  ];

  const values = formCreate.getValues();
  const progressCustomerData = calculateProgress(
    values,
    requiredCustomerFields
  );

  const progressOrganizationData = calculateProgress(
    values,
    requiredOrganizationFields
  );

  const stepProgressMap = [
    progressCustomerData,
    progressOrganizationData,
    100,
    100,
  ];

  return (
    <CustomerProvider>
      <div className="flex flex-col space-y-3 p-4    ">
        <TabControl
          title="สร้างลูกค้า"
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
                  prev={prev}
                  next={next}
                  stepProgressMap={stepProgressMap}
                  isDisabled={isDisabled}
                  isCreating={isCreating}
                  finalButtonText="สร้างลูกค้า"
                  classNameContent="w-full"
                  steps={[
                    {
                      title: "ข้อมูลลูกค้า",
                      descriptions:
                        "กรุณากรอกข้อมูลลูกค้าให้ครบถ้วนเพื่อใช้ในการดำเนินงาน",
                      progress: progressCustomerData,
                      content: (
                        <CustomerInfoCard form={formCreate} customer={null} />
                      ),
                    },

                    {
                      title: "ข้อมูลบริษัท",
                      descriptions:
                        "กรอกข้อมูลบริษัทเพื่อใช้ในการติดต่อและดำเนินงาน",
                      progress: progressOrganizationData,
                      content: <OtherDetatil form={formCreate} />,
                    },
                    {
                      title: "หมายเหตุ/Tags ลูกค้า",
                      descriptions:
                        "สามารถเพิ่มหมายเหตุหรือแท็กเพื่อจัดหมวดหมู่ลูกค้าได้",
                      content: <CustomerTagAndAI form={formCreate} />,
                    },
                    {
                      title: "ข้อมูลผู้ติดต่อ (ไม่บังคับ)",
                      descriptions:
                        "กรอกผู้ติดต่อเพิ่มเติมหากมี ในกรณีที่ผู้ที่ต้องติดต่อไม่ใช่ลูกค้าโดยตรง",
                      content: <CustomerDeatailCard form={formCreate} />,
                    },
                  ]}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </CustomerProvider>
  );
}
