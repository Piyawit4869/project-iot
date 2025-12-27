"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import { useForm, type Resolver } from "react-hook-form";
import { useParams, useSearchParams } from "react-router";
import {
  OrganizationSchema,
  type BranchesOrganization,
} from "~/schemas/settings";

export const useOrganizationSetup = () => {
  const formCreate = useForm<BranchesOrganization>({
    resolver: zodResolver(OrganizationSchema) as Resolver<BranchesOrganization>,
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      code: null,
      active: true,
      isMain: true,

      status: "newly_registered",
      fromType: "ordinary_person",
      taxId: null,
      branchType: "taxpayer",

      openingDate: null,

      nameTh: null,
      nameEn: null,
      descriptionsTh: null,
      descriptionsEn: null,
      websiteUrl: null,

      registerVat: false,

      logoUrl: null,

      contactName: null,
      contactEmail: null,
      contactPhone: null,
      contactLine: null,
      contactFacebook: null,
      contactWhatsapp: null,
      contactWebsite: null,
      contactNote: null,

      setting: {
        isMain: true,
        active: true,
        theme: "light",
        textDisplay: null,
        defaultLanguage: "TH",
        openDays: {
          Monday: { open: "", close: "" },
          Tuesday: { open: "", close: "" },
          Wednesday: { open: "", close: "" },
          Thursday: { open: "", close: "" },
          Friday: { open: "", close: "" },
          Saturday: { open: "", close: "" },
          Sunday: { open: "", close: "" },
        },
      },

      address: {
        isMain: true,
        active: true,
        building: null,
        roomNo: null,
        floorNo: null,
        village: null,
        villageNo: 0,
        houseNo: null,
        alley: null,
        road: null,
        nation: "ประเทศไทย",
        subDistrict: null,
        city: null,
        province: null,
        postalCode: null,
        note: null,
      },
    },
  });
  const {
    isSubmitting: isCreating,
    isDirty: isDirtyCreate,
    errors,
  } = formCreate.formState;

  console.log({ errors });

  return {
    formCreate,

    isCreating,
  };
};
