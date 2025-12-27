import {
  Briefcase,
  BrushCleaning,
  MapPinCheck,
  Settings,
  User,
  X,
} from "lucide-react";
import React from "react";

import { Card } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import type { TabKey } from "~/types/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetBranchesDetail,
  useGetBranchesOrganization,
  useGetOrganization,
  useGetOrganizations,
  useGetOrganizationsPaginate,
  useUpdateAddress,
  useUpdateAddressBranches,
  useUpdateBranchesOrganization,
  useUpdateOrganization,
  useUpdateSettingBranches,
  useUpdateSettings,
} from "~/api/client/settings";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import {
  addressSchema,
  OrganizationSchema,
  organizationSchema,
  SettingSchema,
  SettingThemeSchema,
  type AddressSchemaValues,
  type BranchesOrganization,
  type OrganizationFormValues,
  type SettingSchemaValues,
  type settingTheme,
} from "~/schemas/settings";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { SettingOrganizationForm } from "./components/setting-organization-form";
import { RenderHeaderButtons } from "./components/render-header-buttons";
import {
  Link,
  useLocation,
  useNavigate,
  useRouteLoaderData,
  useSearchParams,
} from "react-router";
import { SettingAddressForm } from "./components/setting-address-form";
import { SettingForm } from "./components/setting-setting-form";
import { TabControl } from "~/components/shared/tab-control";
import { DataTable } from "~/components/shared/data-table";
import { useOrganizationColumns } from "./components/org-columns";
import { OrgSelectorDropdown } from "./components/org-selector-dropdown";
import GlobalButton from "~/components/shared/global-button";
import { useDebounce } from "~/hooks/use-debounce";
import { useSearchUserOrgs } from "~/api/client/user";
import { OrganizationContactCard } from "./components/create-organization/organization-contact-card";
import { Button } from "~/components/ui/button";
import { mapOpenDaysToApi } from "./viewmodels/useOrganizationAction";

interface SettingsPageProps {}

export const getMainItem = <T extends { isMain?: boolean }>(
  single?: T | null,
  list?: T[] | null
): T | undefined => {
  if (single) return single;
  return list?.find((item) => item.isMain === true);
};

export const Setting: React.FC<SettingsPageProps> = (props) => {
  // route & url
  const { user_data, user } = useRouteLoaderData("root");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedOrgId = searchParams.get("organizationId") || "";
  const selectedBranchId = searchParams.get("branchId") || "";

  // ui state
  const [activeTab, setActiveTab] = React.useState<TabKey>(
    "SettingOrganization"
  );
  const [isEditing, setIsEditing] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const debouncedSearch = useDebounce(search);

  // selected ids
  const [orgId, setOrgId] = React.useState<string>(selectedOrgId);
  const [branchId, setBranchId] = React.useState<string>(selectedBranchId);

  // search
  const { data, isLoading } = useSearchUserOrgs(debouncedSearch);

  // organization
  const { data: organization } = useGetOrganizations();
  const {
    data: org,
    isLoading: isLoadingOrganization,
    isRefetching,
    refetch,
  } = useGetOrganization(selectedOrgId ?? orgId);

  // branches
  const { data: branches } = useGetBranchesOrganization(orgId);
  const {
    data: branchesDetail,
    refetch: refetchBranch,
    isLoading: isLoadingBranch,
  } = useGetBranchesDetail(branchId);
  const columns = useOrganizationColumns();
  const paginate = useGetOrganizationsPaginate;

  const isSingleOrg = !user?.organizationGroupId || selectedOrgId;

  const branchesData = branches?.branches?.items || [];

  // ids
  const organizationId =
    orgId ??
    org?.id ??
    organization?.organization?.id ??
    organization?.id ??
    "";

  const userId = user_data?.profile?.id ?? "";

  const orgSource = selectedBranchId
    ? branchesDetail
    : selectedOrgId
      ? org
      : organization;

  const mainAddress = selectedBranchId
    ? getMainItem(branchesDetail?.address)
    : selectedOrgId
      ? getMainItem(org?.address, org?.addresses)
      : getMainItem(organization?.address, organization?.addresses);

  const mainSetting = selectedBranchId
    ? getMainItem(branchesDetail?.setting, branchesDetail?.settings)
    : selectedOrgId
      ? getMainItem(org?.setting, org?.settings)
      : getMainItem(organization?.setting, organization?.settings);

  const settingAddressId = mainAddress?.id ?? "";
  const settingId = mainSetting?.id ?? mainSetting?.id ?? "";

  // main org
  const { mutate: updateOrganization } = useUpdateOrganization(
    selectedOrgId,
    userId
  );

  const { mutate: updateSettingAddress } = useUpdateAddress(
    settingAddressId,
    orgId
  );

  const { mutate: updateSetting } = useUpdateSettings(settingId, orgId);

  // brach
  const { mutate: updateBranch } =
    useUpdateBranchesOrganization(selectedBranchId);

  const { mutate: updateAddressBranches } =
    useUpdateAddressBranches(selectedBranchId);

  const { mutate: updateSettingBranches } =
    useUpdateSettingBranches(selectedBranchId);
  //----------------
  const openDays = {
    Monday: { open: "", close: "" },
    Tuesday: { open: "", close: "" },
    Wednesday: { open: "", close: "" },
    Thursday: { open: "", close: "" },
    Friday: { open: "", close: "" },
    Saturday: { open: "", close: "" },
    Sunday: { open: "", close: "" },
  };

  // format date to form
  mainSetting?.openDays?.forEach((item: any) => {
    const day = item.day[0] as keyof typeof openDays;
    openDays[day] = { open: item.open, close: item.close };
  });

  const orgForm = useForm<OrganizationFormValues>({
    resolver: zodResolver(
      organizationSchema
    ) as Resolver<OrganizationFormValues>,
    defaultValues: {},
  });

  const addressForm = useForm<AddressSchemaValues>({
    resolver: zodResolver(addressSchema) as Resolver<AddressSchemaValues>,
    defaultValues: {
      villageNo: undefined,
    },
  });

  const settingForm = useForm<settingTheme>({
    resolver: zodResolver(SettingThemeSchema) as Resolver<settingTheme>,
    defaultValues: {},
  });

  const handleChangeActiveOrg = (id: string) => {
    setOrgId(id);
    navigate(`/setting-organization?organizationId=${id}`);
  };

  const handleChangeBranch = (id: string) => {
    setBranchId(id);
    navigate(
      `/setting-organization?organizationId=${organizationId}&branchId=${id}`
    );
  };

  const handleOpenCreate = (orgId: string) => {
    navigate(`/setting-organization/${orgId}/branches/create`);
  };

  const handleClickEditButton = () => setIsEditing(true);

  const handleOrgOnSubmit = (values: any) => {
    GlobalModal.info({
      title: "แก้ไขข้อมูลองค์กร",
      description: "คุณต้องการบันทึกการแก้ไขข้อมูลองค์กรใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังบันทึกข้อมูลองค์กร...");

        const mutate = selectedBranchId ? updateBranch : updateOrganization;

        mutate(values, {
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

  const handleAddressOnSubmit = (values: any) => {
    GlobalModal.info({
      title: "แก้ไขที่อยู่ติดต่อ",
      description: "คุณต้องการบันทึกการแก้ไขที่อยู่ติดต่อใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังบันทึกที่อยู่ติดต่อ...");

        const mutate = selectedBranchId
          ? updateAddressBranches
          : updateSettingAddress;
        mutate(values, {
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

  const handleSettingOnSubmit = (values: settingTheme) => {
    const payload = {
      ...values,
      openDays: mapOpenDaysToApi(values.openDays),
    };
    GlobalModal.info({
      title: "แก้ไขการตั้งค่า",
      description: "คุณต้องการบันทึกการตั้งค่าใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังบันทึกการตั้งค่า...");
        const mutate = selectedBranchId ? updateSettingBranches : updateSetting;

        mutate(payload, {
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

  const clearSearch = () => {
    const params = new URLSearchParams(location.search);

    params.delete("branchId");

    const query = params.toString();
    navigate(query ? `${location.pathname}?${query}` : location.pathname, {
      replace: true,
    });
    setBranchId("");
  };

  React.useEffect(() => {
    if (!orgSource) return;

    orgForm.reset({
      isMain: true,
      code: orgSource?.code ?? "",
      nameTh: orgSource?.nameTh ?? "",
      nameEn: orgSource?.nameEn ?? "",
      contactEmail: orgSource?.contactEmail ?? "",
      websiteUrl: orgSource?.websiteUrl ?? "",

      openingDate: orgSource?.openingDate ?? "",

      orgType: orgSource?.orgType,
      fromType: orgSource?.fromType,
      status: orgSource?.status,

      descriptionsEn: orgSource?.descriptionsEn ?? "",
      descriptionsTh: orgSource?.descriptionsTh ?? "",

      taxId: orgSource?.taxId ?? "",
      registerVat: orgSource?.registerVat ?? false,
      active: orgSource?.active ?? false,
      branchType: orgSource?.branchType ?? "",
      domainName: orgSource?.domainName ?? "",
      contactName: orgSource?.contactName ?? "",
      contactPhone: orgSource?.contactPhone ?? "",
      contactLine: orgSource?.contactLine ?? "",
      contactFacebook: orgSource?.contactFacebook ?? "",
      contactWhatsapp: orgSource?.contactWhatsapp ?? "",
      contactWebsite: orgSource?.contactWebsite ?? "",
      logoUrl: orgSource?.logoUrl ?? "",
      contactNote: orgSource?.contactNote ?? "",
    });

    addressForm.reset({
      isMain: true,
      id: mainAddress?.id ?? "",
      name: mainAddress?.name ?? "",
      building: mainAddress?.building ?? "",
      village: mainAddress?.village ?? "",
      roomNo: mainAddress?.roomNo ?? "",
      floorNo: mainAddress?.floorNo ?? "",
      villageNo: mainAddress?.villageNo ?? "",
      houseNo: mainAddress?.houseNo ?? "",
      alley: mainAddress?.alley ?? "",
      road: mainAddress?.road ?? "",
      subDistrict: mainAddress?.subDistrict ?? "",
      city: mainAddress?.city ?? "",
      province: mainAddress?.province ?? "",
      nation: mainAddress?.nation ?? "",
      postalCode: mainAddress?.postalCode ?? "",
      note: mainAddress?.note ?? "",
    });

    settingForm.reset({
      isMain: true,
      id: mainSetting?.id ?? "",
      theme: mainSetting?.theme ?? "",
      textDisplay: mainSetting?.textDisplay ?? "",
      defaultLanguage: mainSetting?.defaultLanguage ?? "",
      active: mainSetting?.active ?? false,
      openDays: openDays,
    });
  }, [orgId, isLoadingOrganization, isLoadingBranch, orgSource?.id]);

  React.useEffect(() => {
    if (!selectedBranchId) return;
    refetchBranch();
  }, [selectedBranchId]);

  const onError = (errors: any) => {
    console.log("❌ submit errors:", errors);
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
              <div className="flex flex-row gap-2">
                <OrgSelectorDropdown
                  topic="บริษัท/องค์กร"
                  currentOrgId={selectedOrgId ?? organizationId}
                  currentOrganization={user?.organization}
                  onChangeOrg={handleChangeActiveOrg}
                  refetch={refetch}
                  setSearch={setSearch}
                  data={data}
                  backIcon={true}
                />
                <OrgSelectorDropdown
                  topic="สาขา"
                  currentBranchId={selectedBranchId ?? branchId}
                  currentOrganization={user?.organization}
                  onChangeOrg={handleChangeBranch}
                  branches={branchesData}
                  onOpenCreate={() => handleOpenCreate(selectedOrgId)}
                />
                <Button
                  onClick={clearSearch}
                  variant="secondary"
                  className=" flex flex-row items-center gap-2 text-sm"
                >
                  <BrushCleaning className="w-4" /> ล้างค่า
                </Button>
              </div>
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
                  // <Link to="/setting-organization/create" key="create-link">
                  //   <GlobalButton label="สร้างองค์กร" key="add-btn" />
                  // </Link>,
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

              {/* <Card className="p-0 overflow-hidden bg-background">
                <TabsTrigger
                  value="contactPerson"
                  className="flex w-full justify-start text-left px-4 py-3 text-base h-12 rounded-none data-[state=active]:bg-secondary data-[state=active]:text-foreground"
                >
                  <User className="w-5 h-5 mr-3" />
                  ผู้ติดต่อ
                </TabsTrigger>
              </Card> */}
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
                  className={!isEditing ? "opacity-80 pointer-events-none" : ""}
                >
                  <SettingOrganizationForm
                    form={orgForm}
                    editable={isEditing}
                    isLoading={isLoadingOrganization || isLoadingBranch}
                  />
                </fieldset>
              </form>
            </TabsContent>

            {/* <TabsContent value="contactPerson">
              <FormProvider {...contactPersonForm}>
                <form
                  id="contactPerson"
                  onSubmit={contactPersonForm.handleSubmit(
                    handleBrachesOnSubmit
                  )}
                >
                  <fieldset
                    disabled={!isEditing}
                    className={!isEditing ? "opacity-70" : ""}
                  >
                    <OrganizationContactCard
                      form={contactPersonForm}
                      isEdit={isEditing}
                      isLoading={isLoadingOrganization && isLoadingBranch}
                    />
                  </fieldset>
                </form>
              </FormProvider>
            </TabsContent> */}

            <TabsContent value="SettingAddress">
              <form
                id="SettingAddress"
                onSubmit={addressForm.handleSubmit(
                  handleAddressOnSubmit,
                  onError
                )}
              >
                <fieldset
                  disabled={!isEditing}
                  className={!isEditing ? "opacity-80" : ""}
                >
                  <SettingAddressForm
                    form={addressForm}
                    editable={isEditing}
                    isLoading={isLoadingOrganization || isLoadingBranch}
                    // isLoading={isRefetching}
                  />
                </fieldset>
              </form>
            </TabsContent>

            <TabsContent value="Setting">
              <fieldset
                disabled={!isEditing}
                className={!isEditing ? "opacity-80" : ""}
              >
                <form
                  id="Setting"
                  onSubmit={settingForm.handleSubmit(handleSettingOnSubmit)}
                >
                  <SettingForm
                    form={settingForm}
                    isEditing={isEditing}
                    isLoading={isLoadingOrganization || isLoadingBranch}
                  />
                </form>
              </fieldset>
            </TabsContent>
          </Card>
        </div>
      )}
    </Tabs>
  );
};
