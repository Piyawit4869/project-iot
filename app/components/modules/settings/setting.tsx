import { Briefcase, MapPinCheck, Settings } from "lucide-react";
import React from "react";

import { Card } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import type { TabKey } from "~/types/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetOrganizations,
  useUpdateAddress,
  useUpdateOrganization,
  useUpdateSettings,
} from "~/api/client/settings";
import { useForm, type Resolver } from "react-hook-form";
import {
  addressSchema,
  organizationSchema,
  SettingSchema,
  type AddressSchemaValues,
  type OrganizationFormValues,
  type SettingSchemaValues,
} from "~/schemas/settings";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { SettingOrganizationForm } from "./components/setting-organization-form";
import { RenderHeaderButtons } from "./components/render-header-buttons";
import { useRouteLoaderData } from "react-router";
import { SettingAddressForm } from "./components/setting-address-form";
import { SettingForm } from "./components/setting-setting-form";
import { TabControl } from "~/components/shared/tab-control";

interface SettingsPageProps {}

export const Setting: React.FC<SettingsPageProps> = (props) => {
  const {} = props;

  const { user_data } = useRouteLoaderData("root");

  const [activeTab, setActiveTab] = React.useState<TabKey>(
    "SettingOrganization"
  );
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const { data: organization } = useGetOrganizations();

  const organizationId =
    organization?.res?.data?.organization?.id ?? organization?.id ?? "";

  const settingAddressId =
    organization?.res?.data?.address?.id ?? organization?.id ?? "";

  const settingId =
    organization?.res?.data?.settings?.id ?? organization?.id ?? "";

  const userId = user_data?.profile?.id ?? "";

  const { mutate: updateOrganization } = useUpdateOrganization(
    organizationId,
    userId
  );

  const { mutate: updateSettingAddress } = useUpdateAddress(
    settingAddressId || "",
    userId
  );

  const { mutate: updateSetting } = useUpdateSettings(settingId || "", userId);

  const orgForm = useForm<OrganizationFormValues>({
    resolver: zodResolver(
      organizationSchema
    ) as Resolver<OrganizationFormValues>,
    values: {
      nameTh: organization?.nameTh ?? "",
      nameEn: organization?.nameEn ?? "",
      contactEmail: organization?.contactEmail ?? "",
      websiteUrl: organization?.websiteUrl ?? "",
      status: organization?.status ?? "",
      openingDate: organization?.openingDate ?? "",
      descriptionsEn: organization?.descriptionsEn ?? "",
      descriptionsTh: organization?.descriptionsTh ?? "",
      fromType: organization?.fromType ?? "ordinary_person",
      taxId: organization?.taxId ?? "",
      registerVat: organization?.registerVat ?? false,
      active: organization?.active ?? false,
      isMain: organization?.isMain ?? false,
      branchType: organization?.branchType ?? "taxpayer",
      domainName: organization?.domainName ?? "",
      contactName: organization?.contactName ?? "",
      contactPhone: organization?.contactPhone ?? "",
      contactLine: organization?.contactLine ?? "",
      contactFacebook: organization?.contactFacebook ?? "",
      contactWhatsapp: organization?.contactWhatsapp ?? "",
      contactWebsite: organization?.contactWebsite ?? "",
      logoUrl: organization?.logoUrl ?? "",
      contactNote: organization?.contactNote ?? "",
    },
  });

  const addressForm = useForm<AddressSchemaValues>({
    resolver: zodResolver(addressSchema) as Resolver<AddressSchemaValues>,
    values: {
      id: organization?.address?.id ?? "",
      name: organization?.address?.name ?? "",
      building: organization?.address?.building ?? "",
      village: organization?.address?.village ?? "",
      roomNo: organization?.address?.roomNo ?? "",
      floorNo: organization?.address?.floorNo ?? "",
      villageNo: organization?.address?.villageNo ?? "",
      houseNo: organization?.address?.houseNo ?? "",
      alley: organization?.address?.alley ?? "",
      road: organization?.address?.road ?? "",
      subDistrict: organization?.address?.subDistrict ?? "",
      city: organization?.address?.city ?? "",
      province: organization?.address?.province ?? "",
      nation: organization?.address?.nation ?? "",
      postalCode: organization?.address?.postalCode ?? "",
      note: organization?.address?.note ?? "",
      isMain: organization?.address?.isMain ?? false,
    },
  });

  const settingForm = useForm<SettingSchemaValues>({
    resolver: zodResolver(SettingSchema),
    values: {
      id: organization?.setting?.id ?? "",
      theme: organization?.setting?.theme ?? "",
      textDisplay: organization?.setting?.textDisplay ?? "",
      defaultLanguage: organization?.setting?.defaultLanguage ?? "",
      active: organization?.setting?.active ?? false,
    },
  });

  const handleOrgOnSubmit = (values: OrganizationFormValues) => {
    // if (!organizationId || !userId) {
    //   toast.error("ไม่พบ ID องค์กร หรือ ไม่พบ id ของผู้ใช้งาน");
    //   return;
    // }
    GlobalModal.info({
      title: "แก้ไขข้อมูลองค์กร",
      description: "คุณต้องการบันทึกการแก้ไขข้อมูลองค์กรใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังบันทึกข้อมูลองค์กร...");
        updateOrganization(values, {
          onSuccess: () => {
            toast.success("บันทึกข้อมูลองค์กรสำเร็จ", { id: toastId });
            setIsEditing(false);
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดขณะบันทึกข้อมูลองค์กร", {
              id: toastId,
            });
          },
        });
      },
    });
  };

  const handleAddressOnSubmit = (values: AddressSchemaValues) => {
    GlobalModal.info({
      title: "แก้ไขที่อยู่ติดต่อ",
      description: "คุณต้องการบันทึกการแก้ไขที่อยู่ติดต่อใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังบันทึกที่อยู่ติดต่อ...");
        updateSettingAddress(values, {
          onSuccess: () => {
            toast.success("บันทึกที่อยู่ติดต่อสำเร็จ", { id: toastId });

            setIsEditing(false);
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดขณะบันทึกที่อยู่ติดต่อ", {
              id: toastId,
            });
          },
        });
      },
    });
  };

  const handleSettingOnSubmit = (values: SettingSchemaValues) => {
    GlobalModal.info({
      title: "แก้ไขการตั้งค่า",
      description: "คุณต้องการบันทึกการตั้งค่าใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังบันทึกการตั้งค่า...");
        updateSetting(values, {
          onSuccess: () => {
            toast.success("บันทึกการตั้งค่าสำเร็จ", { id: toastId });

            setIsEditing(false);
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดขณะบันทึกการตั้งค่า", { id: toastId });
          },
        });
      },
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    orgForm.reset();
    addressForm.reset();
    settingForm.reset();
  };

  const handleClickEditButton = () => setIsEditing(true);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => setActiveTab(v as TabKey)}
      className="w-full"
    >
      <div className="mb-4">
        <TabControl
          title="องค์กร"
          buttons={RenderHeaderButtons({
            isEditing,
            handleClickEditButton,
            handleClickCancleButton: handleCancel,
            activeTab,
          })}
          noneSticky={true}
        />
      </div>

      <div className="grid grid-cols-[19%_80%] gap-4">
        <Card className="p-4 space-y-3">
          <TabsList className="flex flex-col w-full bg-transparent p-0 space-y-3">
            <Card className="p-0 overflow-hidden bg-background">
              <TabsTrigger
                value="SettingOrganization"
                className="flex w-full justify-start text-left px-4 py-3 text-base h-12 rounded-none data-[state=active]:bg-secondary data-[state=active]:text-foreground"
              >
                <Briefcase className="w-5 h-5 mr-3" />
                ข้อมูลองค์กร
              </TabsTrigger>
            </Card>

            <Card className="p-0 overflow-hidden bg-background">
              <TabsTrigger
                value="SettingAddress"
                className="flex w-full justify-start text-left px-4 py-3 text-base h-12 rounded-none data-[state=active]:bg-secondary data-[state=active]:text-foreground"
              >
                <MapPinCheck className="w-5 h-5 mr-3" />
                ที่อยู่ติดต่อ
              </TabsTrigger>
            </Card>

            <Card className="p-0 overflow-hidden bg-background">
              <TabsTrigger
                value="Setting"
                className="flex w-full justify-start text-left px-4 py-3 text-base h-12 rounded-none data-[state=active]:bg-secondary data-[state=active]:text-foreground"
              >
                <Settings className="w-5 h-5 mr-3" />
                ตั้งค่า
              </TabsTrigger>
            </Card>
          </TabsList>
        </Card>

        <Card>
          <TabsContent value="SettingOrganization">
            <form
              id="SettingOrganization"
              onSubmit={orgForm.handleSubmit(handleOrgOnSubmit)}
            >
              <fieldset
                disabled={!isEditing}
                className={!isEditing ? "opacity-70" : ""}
              >
                <SettingOrganizationForm form={orgForm} />
              </fieldset>
            </form>
          </TabsContent>

          <TabsContent value="SettingAddress">
            <form
              id="SettingAddress"
              onSubmit={addressForm.handleSubmit(handleAddressOnSubmit)}
            >
              <fieldset
                disabled={!isEditing}
                className={!isEditing ? "opacity-70" : ""}
              >
                <SettingAddressForm form={addressForm} />
              </fieldset>
            </form>
          </TabsContent>

          <TabsContent value="Setting">
            <form
              id="Setting"
              onSubmit={settingForm.handleSubmit(handleSettingOnSubmit)}
            >
              <fieldset
                disabled={!isEditing}
                className={!isEditing ? "opacity-70" : ""}
              >
                <SettingForm form={settingForm} organization isEditing />
              </fieldset>
            </form>
          </TabsContent>
        </Card>
      </div>
    </Tabs>
  );
};
