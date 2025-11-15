"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import { useForm, type Resolver } from "react-hook-form";
import { useParams, useSearchParams } from "react-router";
import {
  useContact,
  useCustomer,
  useCustomerAiSetting,
  useCustomerNote,
} from "~/api/client/customer/useCustomer";
import { usePaginateUsers } from "~/api/client/customer/useGetUsers";
import {
  CustomerSchema,
  type CustomerValues,
} from "~/schemas/customer/customer-form";

export const useCustomerSetup = () => {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: customer,
    isLoading: loadCustomer,
    refetch: fetchCustomer,
  } = useCustomer(id);
  const {
    data: customerNote,
    isLoading: loadCustomerNote,
    refetch: fetchCustomerNote,
  } = useCustomerNote(id);

  const {
    data: customerAISetting,
    isLoading: loadCustomerAISetting,
    refetch: fetchCustomercAISetting,
  } = useCustomerAiSetting(id);

  const { data: users, isLoading: loadingUser } = usePaginateUsers({
    pageIndex: 1,
    status: "",
    limit: 10,
  });

  const formCreate = useForm<CustomerValues>({
    resolver: zodResolver(CustomerSchema) as Resolver<CustomerValues>,
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      active: true,
      status: "newly_registered",
      customerType: "ordinary_person",
      customerPlatform: "backoffice",
      lineSubId: null,
      customerCode: null,
      refCode: null,
      branchId: null,
      consentPii: false,
      priority: 0,
      remark: null,
      note: [],

      profile: {
        name: null,
        imageUrl: null,

        prefix: null,
        taxId: null,
        position: null,
        country: "ไทย",
        nation: "ไทย",
        lineName: null,
        faceBookName: null,
        nickName: null,
        firstName: "",
        lastName: null,
        // firstNameTh: "",
        // lastNameTh: "",
        birthDate: null,
        phone: null,
        gender: null,
        age: null,
      },

      organizationDetails: {
        fromType: "ordinary_person",
        orgType: "ordinary_partnership",
        // taxId: "",
        branchCode: null,
        businessName: null,
        businessPhone: null,
        businessFax: null,
        businessEmail: null,
        registerVat: false,
        importantDate: null,
        openingDate: null,
        note: null,
        websiteUrl: null,
        descriptions: null,
      },

      contacts: [
        // {
        //   name: null,
        //   phone: null,
        //   position: null,
        //   department: null,
        //   email: null,
        //   contactPlatform: "backoffice",
        //   platformId: "backoffice",
        //   isPrimary: true,
        // },
      ],

      tags: [],

      supports: [
        /* { userId: "", isMain: true } */
      ],
    },
  });
  const { isSubmitting: isCreating, isDirty: isDirtyCreate } =
    formCreate.formState;

  const formUpdate = useForm<CustomerValues>({
    resolver: zodResolver(CustomerSchema) as Resolver<CustomerValues>,
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      active: customer?.active ?? true,
      status: customer?.status ?? "newly_registered",
      customerType: customer?.customerType ?? "ordinary_person",
      customerPlatform: customer?.customerPlatform ?? "backoffice",
      lineSubId: customer?.lineSubId ?? null,
      customerCode: customer?.customerCode ?? null,
      refCode: customer?.refCode ?? null,
      branchId: customer?.branchId ?? null,
      // progressPercentage: customer?.progressPercentage ?? 0,
      // aiReplyResponseDuration: customer?.aiReplyResponseDuration ?? "",
      // isAiReply: customer?.isAiReply ?? false,
      consentPii: customer?.consentPii ?? false,
      priority: customer?.priority ?? 0,
      remark: customer?.remark ?? null,

      profile: {
        // name: customer?.profile?.name ?? "",
        imageUrl: customer?.profile?.imageUrl ?? null,
        prefix: customer?.profile?.prefix ?? null,
        taxId: customer?.profile?.taxId ?? null,
        position: customer?.profile?.position ?? null,
        country: customer?.profile?.country ?? "ประเทศไทย",
        nation: customer?.profile?.nation ?? "ไทย",
        lineName: customer?.profile?.lineName ?? null,
        faceBookName: customer?.profile?.faceBookName ?? null,
        nickName: customer?.profile?.nickName ?? null,
        firstName: customer?.profile?.firstName ?? null,
        lastName: customer?.profile?.lastName ?? null,
        // firstNameTh: customer?.profile?.firstNameTh ?? "",
        // lastNameTh: customer?.profile?.lastNameTh ?? "",
        birthDate: customer?.profile?.birthDate ?? null,
        phone: customer?.profile?.phone ?? null,
        gender: customer?.profile?.gender ?? null,
        age: customer?.profile?.age ?? 0,
      },

      organizationDetails: {
        fromType: customer?.organizationDetails?.fromType ?? "ordinary_person",
        orgType:
          customer?.organizationDetails?.orgType ?? "ordinary_partnership",
        // taxId: customer?.organizationDetails?.taxId ?? null,
        branchCode: customer?.organizationDetails?.branchCode ?? null,
        businessName: customer?.organizationDetails?.businessName ?? null,
        businessPhone: customer?.organizationDetails?.businessPhone ?? null,
        businessFax: customer?.organizationDetails?.businessFax ?? null,
        businessEmail: customer?.organizationDetails?.businessEmail ?? null,
        registerVat: customer?.organizationDetails?.registerVat ?? false,
        importantDate: customer?.organizationDetails?.importantDate ?? null,
        openingDate: customer?.organizationDetails?.openingDate ?? null,
        note: customer?.organizationDetails?.note ?? null,
        websiteUrl: customer?.organizationDetails?.websiteUrl ?? null,
        descriptions: customer?.organizationDetails?.descriptions ?? null,
      },

      contacts: customer?.contacts ?? [],
      supports: customer?.supports ?? [],
      tags: customer?.tags ?? [],
    },
  });

  const { isSubmitting: isUpdating, isDirty: isDirtyUpdate } =
    formUpdate.formState;

  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const [contactId, setContactId] = React.useState<string>("");

  const { data: contact, isLoading: loadContact } = useContact(contactId);

  const [expandedCreate, setExpandedCreate] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirtyCreate) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirtyCreate]);

  React.useEffect(() => {
    if (customer) {
      formUpdate.reset({
        active: customer?.active ?? true,
        status: customer?.status ?? "newly_registered",
        customerType: customer?.customerType ?? "ordinary_person",
        customerPlatform: customer?.customerPlatform ?? "backoffice",
        lineSubId: customer?.lineSubId ?? null,
        customerCode: customer?.customerCode ?? null,
        refCode: customer?.refCode ?? null,
        branchId: customer?.branchId ?? null,
        // isAiReply: customer?.isAiReply ?? false,
        consentPii: customer?.consentPii ?? false,
        priority: customer?.priority ?? 0,
        // aiReplyResponseDuration: customer?.aiReplyResponseDuration ?? {},
        remark: customer?.remark ?? null,
        // note: customer?.note
        //   ? Array.isArray(customer?.note)
        //     ? customer?.note
        //     : [customer?.note]
        //   : [],
        profile: {
          name: customer?.profile?.name ?? null,
          imageUrl: customer?.profile?.imageUrl ?? null,
          prefix: customer?.profile?.prefix ?? null,
          taxId: customer?.profile?.taxId ?? null,
          position: customer?.profile?.position ?? null,
          nickName: customer?.profile?.nickName ?? null,
          firstName: customer?.profile?.firstName ?? null,
          lastName: customer?.profile?.lastName ?? null,
          // firstNameTh: customer?.profile?.firstNameTh ?? null,
          // lastNameTh: customer?.profile?.lastNameTh ?? null,
          birthDate: customer?.profile?.birthDate ?? null,
          phone: customer?.profile?.phone ?? null,
          gender: customer?.profile?.gender ?? null,
          age: customer?.profile?.age ?? null,
          ...customer?.profile,
        },
        organizationDetails: {
          fromType:
            customer?.organizationDetails?.fromType ?? "ordinary_person",
          orgType:
            customer?.organizationDetails?.orgType ?? "ordinary_partnership",
          ...customer?.organizationDetails,
        },
        contacts: customer?.contacts
          ? Array.isArray(customer?.contacts)
            ? customer?.contacts
            : [customer?.contacts]
          : [],
        supports: customer?.supports
          ? Array.isArray(customer?.supports)
            ? customer?.supports
            : [customer?.supports]
          : [],
        tags: Array.isArray(customer?.tags)
          ? customer?.tags
          : customer?.tags
            ? Object.values(customer?.tags)
            : [],
      });
    }
  }, [customer]);

  React.useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirtyCreate || isDirtyUpdate) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirtyCreate, isDirtyUpdate]);

  return {
    formCreate,
    isCreating,

    formUpdate,
    isUpdating,

    expandedIndex,
    setExpandedIndex,
    expandedCreate,
    setExpandedCreate,
    customer,
    fetchCustomer,
    loadCustomer,
    contactId,
    setContactId,
    contact,
    loadContact,

    users,
    loadingUser,
    customerAISetting,
    loadCustomerAISetting,
    fetchCustomercAISetting,
    customerNote,
    loadCustomerNote,
    fetchCustomerNote,
  };
};
