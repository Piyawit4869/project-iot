import { Briefcase, MapPinCheck, Settings } from "lucide-react";
import React from "react";

import { Card } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import type { TabKey } from "~/types/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetOrganization,
  useGetOrganizations,
  useGetOrganizationsPaginate,
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
import { useNavigate, useRouteLoaderData, useSearchParams } from "react-router";
import { SettingAddressForm } from "./components/setting-address-form";
import { SettingForm } from "./components/setting-setting-form";
import { TabControl } from "~/components/shared/tab-control";
import { DataTable } from "~/components/shared/data-table";
import { useOrganizationColumns } from "./components/org-columns";
import { OrgSelectorDropdown } from "./components/org-selector-dropdown";
import { useChangeActiveOrg } from "~/api/client/user";
import GlobalButton from "~/components/shared/global-button";

interface SettingsPageProps {}

export const Setting: React.FC<SettingsPageProps> = (props) => {
  const {} = props;

  const { user_data, user } = useRouteLoaderData("root");

  const [searchParams] = useSearchParams();

  const selectedOrgId = searchParams.get("organizationId") || "";

  const isSingleOrg = !user?.organizationGroupId || selectedOrgId;

  const [activeTab, setActiveTab] = React.useState<TabKey>(
    "SettingOrganization"
  );
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  // const [selectedOrgId, setSelectedOrgId] = React.useState<string>("");

  const { data: organization } = useGetOrganizations();
  const {
    data: org,
    isRefetching,
    refetch,
  } = useGetOrganization(selectedOrgId);

  console.log({ isRefetching });

  const columns = useOrganizationColumns();

  const paginate = useGetOrganizationsPaginate;
  const organizationId =
    selectedOrgId ??
    org?.id ??
    organization?.organization?.id ??
    organization?.id ??
    "";

  const settingAddressId =
    org?.address?.id ?? organization?.address?.id ?? organization?.id ?? "";

  const settingId =
    org?.settings?.id ?? organization?.settings?.id ?? organization?.id ?? "";

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

  const orgSource = org ?? organization;

  const orgForm = useForm<OrganizationFormValues>({
    resolver: zodResolver(
      organizationSchema
    ) as Resolver<OrganizationFormValues>,
    values: {
      nameTh: orgSource?.nameTh ?? "",
      nameEn: orgSource?.nameEn ?? "",
      contactEmail: orgSource?.contactEmail ?? "",
      websiteUrl: orgSource?.websiteUrl ?? "",
      status: orgSource?.status ?? "",
      openingDate: orgSource?.openingDate ?? "",
      descriptionsEn: orgSource?.descriptionsEn ?? "",
      descriptionsTh: orgSource?.descriptionsTh ?? "",
      fromType: orgSource?.fromType ?? "ordinary_person",
      taxId: orgSource?.taxId ?? "",
      registerVat: orgSource?.registerVat ?? false,
      active: orgSource?.active ?? false,
      isMain: orgSource?.isMain ?? false,
      branchType: orgSource?.branchType ?? "taxpayer",
      domainName: orgSource?.domainName ?? "",
      contactName: orgSource?.contactName ?? "",
      contactPhone: orgSource?.contactPhone ?? "",
      contactLine: orgSource?.contactLine ?? "",
      contactFacebook: orgSource?.contactFacebook ?? "",
      contactWhatsapp: orgSource?.contactWhatsapp ?? "",
      contactWebsite: orgSource?.contactWebsite ?? "",
      logoUrl: orgSource?.logoUrl ?? "",
      contactNote: orgSource?.contactNote ?? "",
    },
  });

  const addressForm = useForm<AddressSchemaValues>({
    resolver: zodResolver(addressSchema) as Resolver<AddressSchemaValues>,
    values: {
      id: orgSource?.address?.id ?? "",
      name: orgSource?.address?.name ?? "",
      building: orgSource?.address?.building ?? "",
      village: orgSource?.address?.village ?? "",
      roomNo: orgSource?.address?.roomNo ?? "",
      floorNo: orgSource?.address?.floorNo ?? "",
      villageNo: orgSource?.address?.villageNo ?? "",
      houseNo: orgSource?.address?.houseNo ?? "",
      alley: orgSource?.address?.alley ?? "",
      road: orgSource?.address?.road ?? "",
      subDistrict: orgSource?.address?.subDistrict ?? "",
      city: orgSource?.address?.city ?? "",
      province: orgSource?.address?.province ?? "",
      nation: orgSource?.address?.nation ?? "",
      postalCode: orgSource?.address?.postalCode ?? "",
      note: orgSource?.address?.note ?? "",
      isMain: orgSource?.address?.isMain ?? false,
    },
  });

  const settingForm = useForm<SettingSchemaValues>({
    resolver: zodResolver(SettingSchema) as Resolver<SettingSchemaValues>,
    values: {
      id: orgSource?.setting?.id ?? "",
      theme: orgSource?.setting?.theme ?? "",
      textDisplay: orgSource?.setting?.textDisplay ?? "",
      defaultLanguage: orgSource?.setting?.defaultLanguage ?? "",
      active: orgSource?.setting?.active ?? false,
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

  const handleChangeActiveOrg = (organizationId: string) => {
    window.location.href = `/setting-organization?organizationId=${organizationId}`;

    refetch();
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => setActiveTab(v as TabKey)}
      className="w-full"
    >
      <div className="mb-4">
        <TabControl
          title={
            selectedOrgId ? (
              <OrgSelectorDropdown
                currentOrgId={organizationId}
                currentOrganization={user?.organization}
                onChangeOrg={handleChangeActiveOrg}
                refetch={refetch}
              />
            ) : (
              "องค์กรทั้งหมด"
            )
          }
          buttons={
            selectedOrgId
              ? RenderHeaderButtons({
                  isEditing,
                  handleClickEditButton,
                  handleClickCancleButton: handleCancel,
                  activeTab,
                })
              : [
                  <GlobalButton
                    label="เพิ่ม"
                    key="add-btn"
                    disabled
                    // type="submit"
                    // form={activeTab}
                  />,
                ]
          }
          noneSticky={true}
        />
      </div>

      {!isSingleOrg ? (
        <DataTable queryFunction={paginate} columns={columns} />
      ) : (
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
                  ทั่วไป
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
                  <SettingForm
                    form={settingForm}
                    organization
                    isEditing={isEditing}
                  />
                </fieldset>
              </form>
            </TabsContent>
          </Card>
        </div>
      )}
    </Tabs>
  );
};
