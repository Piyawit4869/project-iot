import { useSession } from "next-auth/react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchMe,
  fetchOrganization,
  fetchCreateOrganization,
  fetchUpdateOrganization,
} from "../server/organizations";
import {
  cre_OrganizationFormValues,
  up_OrganizationFormValues,
} from "@/schemas/super-organization/organization";
import { Branch, Organization } from "./interface";

export const useGetMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

export const usePaginate = ({
  pageIndex,
  pageSize = 10,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useQuery({
    queryKey: ["paginate", pageIndex, pageSize],
    queryFn: () =>
      fetchOrganization(
        { page: pageIndex, itemsPerPage: pageSize },
        accessToken
      ),
    placeholderData: keepPreviousData,
    enabled: !!pageIndex && !!pageSize && !!accessToken,
  });
};
export const useCreateOrganization = () => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useMutation({
    mutationFn: (values: cre_OrganizationFormValues) => {
      const org: Organization = {
        active: values.organization?.active,
        status: values.organization?.status,
        fromType: values.organization?.fromType,
        taxId: values.organization?.taxId,
        type: values.organization?.type,
        openingDate: values.organization?.openingDate,
        nameEn: values.organization?.nameEn,
        nameTh: values.organization?.nameTh,
        descriptionsTh: values.organization?.descriptionsTh,
        descriptionsEn: values.organization?.descriptionsEn,
        websiteUrl: values.organization?.websiteUrl,
        registerVat: values.organization?.registerVat,
        contactName: values.organization?.contactName,
        contactEmail: values.organization?.contactEmail,
        contactPhone: values.organization?.contactPhone,
        contactLine: values.organization?.contactLine,
        contactFacebook: values.organization?.contactFacebook,
        contactWhatsapp: values.organization?.contactWhatsapp,
        contactWebsite: values.organization?.contactWebsite,
        contactNote: values.organization?.contactNote,
        logoUrl: values.organization?.logoUrl,
        domainName: values.organization?.domainName,
        user: {
          active: values.organization?.user?.active,
          status: values.organization?.user?.status,
          email: values.organization?.user?.email,
          password: values.organization?.user?.password,
          userName: values.organization?.user?.userName,
          profile: {
            prefix: values.organization?.user?.profile?.prefix,
            firstName: values.organization?.user?.profile?.firstName,
            lastName: values.organization?.user?.profile?.lastName,
            birthDate: values.organization?.user?.profile?.birthDate,
            photoUrl: values.organization?.user?.profile?.photoUrl,
            isMobile: values.organization?.user?.profile?.isMobile,
            deviceToken: values.organization?.user?.profile?.deviceToken,
            phone: values.organization?.user?.profile?.phone,
          },
        },
        setting: {
          active: values.organization?.setting?.active,
          theme: values.organization?.setting?.theme,
          textDisplay: values.organization?.setting?.textDisplay,
          domainName: values.organization?.setting?.domainName,
          defaultLanguage: values.organization?.setting?.defaultLanguage,
          openDays: [],
        },
        address: {
          active: values.organization?.address?.active,
          language: values.organization?.address?.language,
          isMain: values.organization?.address?.isMain,
          name: values.organization?.address?.name,
          building: values.organization?.address?.building,
          roomNo: values.organization?.address?.roomNo,
          floorNo: values.organization?.address?.floorNo,
          village: values.organization?.address?.village,
          villageNo: values.organization?.address?.villageNo,
          houseNo: values.organization?.address?.houseNo,
          alley: values.organization?.address?.alley,
          road: values.organization?.address?.road,
          nation: values.organization?.address?.nation,
          subDistrict: values.organization?.address?.subDistrict,
          city: values.organization?.address?.city,
          province: values.organization?.address?.province,
          postalCode: values.organization?.address?.postalCode,
          note: values.organization?.address?.note,
        },
      };
      const branch: Branch = {
        isMain: values.branch?.isMain,
        active: values.branch?.active,
        status: values.branch?.status,
        fromType: values.branch?.fromType,
        taxId: values.branch?.taxId,
        type: values.branch?.type,
        openingDate: values.branch?.openingDate,
        nameEn: values.branch?.nameEn,
        nameTh: values.branch?.nameTh,
        descriptionsTh: values.branch?.descriptionsTh,
        descriptionsEn: values.branch?.descriptionsEn,
        websiteUrl: values.branch?.websiteUrl,
        registerVat: values.branch?.registerVat,
        contactName: values.branch?.contactName,
        contactEmail: values.branch?.contactEmail,
        contactPhone: values.branch?.contactPhone,
        contactLine: values.branch?.contactLine,
        contactFacebook: values.branch?.contactFacebook,
        contactWhatsapp: values.branch?.contactWhatsapp,
        contactWebsite: values.branch?.contactWebsite,
        contactNote: values.branch?.contactNote,
        logoUrl: values.branch?.logoUrl,
        user: {
          active: values.branch?.user?.active,
          status: values.branch?.user?.status,
          email: values.branch?.user?.email,
          password: values.branch?.user?.password,
          userName: values.branch?.user?.userName,
          profile: {
            prefix: values.branch?.user?.profile?.prefix,
            firstName: values.branch?.user?.profile?.firstName,
            lastName: values.branch?.user?.profile?.lastName,
            birthDate: values.branch?.user?.profile?.birthDate,
            photoUrl: values.branch?.user?.profile?.photoUrl,
            isMobile: values.branch?.user?.profile?.isMobile,
            deviceToken: values.branch?.user?.profile?.deviceToken,
            phone: values.branch?.user?.profile?.phone,
          },
        },
        setting: {
          active: values.branch?.setting?.active,
          theme: values.branch?.setting?.theme,
          textDisplay: values.branch?.setting?.textDisplay,
          domainName: values.branch?.setting?.domainName,
          defaultLanguage: values.branch?.setting?.defaultLanguage,
          openDays: [],
        },
        address: {
          active: values.branch?.address?.active,
          language: values.branch?.address?.language,
          isMain: values.branch?.address?.isMain,
          name: values.branch?.address?.name,
          building: values.branch?.address?.building,
          roomNo: values.branch?.address?.roomNo,
          floorNo: values.branch?.address?.floorNo,
          village: values.branch?.address?.village,
          villageNo: values.branch?.address?.villageNo,
          houseNo: values.branch?.address?.houseNo,
          alley: values.branch?.address?.alley,
          road: values.branch?.address?.road,
          nation: values.branch?.address?.nation,
          subDistrict: values.branch?.address?.subDistrict,
          city: values.branch?.address?.city,
          province: values.branch?.address?.province,
          postalCode: values.branch?.address?.postalCode,
          note: values.branch?.address?.note,
        },
      };
      const payload = {
        organization: org,
        branch: branch,
      };

      return fetchCreateOrganization(payload, accessToken);
    },
  });
};

export const useUpdateOrganization = (id: string) => {
  const data = useSession();
  const userDetails = data.data?.user;

  const user = userDetails as { user: { auth: { accessToken: string } } };
  const accessToken = user?.user?.auth?.accessToken;

  return useMutation({
    mutationFn: (values: up_OrganizationFormValues) => {
      const org: Organization = {
        active: values.organization?.active,
        status: values.organization?.status,
        fromType: values.organization?.fromType,
        taxId: values.organization?.taxId,
        type: values.organization?.type,
        openingDate: values.organization?.openingDate,
        nameEn: values.organization?.nameEn,
        nameTh: values.organization?.nameTh,
        descriptionsTh: values.organization?.descriptionsTh,
        descriptionsEn: values.organization?.descriptionsEn,
        websiteUrl: values.organization?.websiteUrl,
        registerVat: values.organization?.registerVat,
        contactName: values.organization?.contactName,
        contactEmail: values.organization?.contactEmail,
        contactPhone: values.organization?.contactPhone,
        contactLine: values.organization?.contactLine,
        contactFacebook: values.organization?.contactFacebook,
        contactWhatsapp: values.organization?.contactWhatsapp,
        contactWebsite: values.organization?.contactWebsite,
        contactNote: values.organization?.contactNote,
        logoUrl: values.organization?.logoUrl,
        domainName: values.organization?.domainName,
        user: {
          active: values.organization?.user?.active,
          status: values.organization?.user?.status,
          email: values.organization?.user?.email,
          password: values.organization?.user?.password,
          userName: values.organization?.user?.userName,
          profile: {
            prefix: values.organization?.user?.profile?.prefix,
            firstName: values.organization?.user?.profile?.firstName,
            lastName: values.organization?.user?.profile?.lastName,
            birthDate: values.organization?.user?.profile?.birthDate,
            photoUrl: values.organization?.user?.profile?.photoUrl,
            isMobile: values.organization?.user?.profile?.isMobile,
            deviceToken: values.organization?.user?.profile?.deviceToken,
            phone: values.organization?.user?.profile?.phone,
          },
        },
        setting: {
          active: values.organization?.setting?.active,
          theme: values.organization?.setting?.theme,
          textDisplay: values.organization?.setting?.textDisplay,
          domainName: values.organization?.setting?.domainName,
          defaultLanguage: values.organization?.setting?.defaultLanguage,
          openDays: [],
        },
        address: {
          active: values.organization?.address?.active,
          language: values.organization?.address?.language,
          isMain: values.organization?.address?.isMain,
          name: values.organization?.address?.name,
          building: values.organization?.address?.building,
          roomNo: values.organization?.address?.roomNo,
          floorNo: values.organization?.address?.floorNo,
          village: values.organization?.address?.village,
          villageNo: values.organization?.address?.villageNo,
          houseNo: values.organization?.address?.houseNo,
          alley: values.organization?.address?.alley,
          road: values.organization?.address?.road,
          nation: values.organization?.address?.nation,
          subDistrict: values.organization?.address?.subDistrict,
          city: values.organization?.address?.city,
          province: values.organization?.address?.province,
          postalCode: values.organization?.address?.postalCode,
          note: values.organization?.address?.note,
        },
      };
      const branch: Branch = {
        isMain: values.branch?.isMain,
        active: values.branch?.active,
        status: values.branch?.status,
        fromType: values.branch?.fromType,
        taxId: values.branch?.taxId,
        type: values.branch?.type,
        openingDate: values.branch?.openingDate,
        nameEn: values.branch?.nameEn,
        nameTh: values.branch?.nameTh,
        descriptionsTh: values.branch?.descriptionsTh,
        descriptionsEn: values.branch?.descriptionsEn,
        websiteUrl: values.branch?.websiteUrl,
        registerVat: values.branch?.registerVat,
        contactName: values.branch?.contactName,
        contactEmail: values.branch?.contactEmail,
        contactPhone: values.branch?.contactPhone,
        contactLine: values.branch?.contactLine,
        contactFacebook: values.branch?.contactFacebook,
        contactWhatsapp: values.branch?.contactWhatsapp,
        contactWebsite: values.branch?.contactWebsite,
        contactNote: values.branch?.contactNote,
        logoUrl: values.branch?.logoUrl,
        user: {
          active: values.branch?.user?.active,
          status: values.branch?.user?.status,
          email: values.branch?.user?.email,
          password: values.branch?.user?.password,
          userName: values.branch?.user?.userName,
          profile: {
            prefix: values.branch?.user?.profile?.prefix,
            firstName: values.branch?.user?.profile?.firstName,
            lastName: values.branch?.user?.profile?.lastName,
            birthDate: values.branch?.user?.profile?.birthDate,
            photoUrl: values.branch?.user?.profile?.photoUrl,
            isMobile: values.branch?.user?.profile?.isMobile,
            deviceToken: values.branch?.user?.profile?.deviceToken,
            phone: values.branch?.user?.profile?.phone,
          },
        },
        setting: {
          active: values.branch?.setting?.active,
          theme: values.branch?.setting?.theme,
          textDisplay: values.branch?.setting?.textDisplay,
          domainName: values.branch?.setting?.domainName,
          defaultLanguage: values.branch?.setting?.defaultLanguage,
          openDays: [],
        },
        address: {
          active: values.branch?.address?.active,
          language: values.branch?.address?.language,
          isMain: values.branch?.address?.isMain,
          name: values.branch?.address?.name,
          building: values.branch?.address?.building,
          roomNo: values.branch?.address?.roomNo,
          floorNo: values.branch?.address?.floorNo,
          village: values.branch?.address?.village,
          villageNo: values.branch?.address?.villageNo,
          houseNo: values.branch?.address?.houseNo,
          alley: values.branch?.address?.alley,
          road: values.branch?.address?.road,
          nation: values.branch?.address?.nation,
          subDistrict: values.branch?.address?.subDistrict,
          city: values.branch?.address?.city,
          province: values.branch?.address?.province,
          postalCode: values.branch?.address?.postalCode,
          note: values.branch?.address?.note,
        },
      };
      const payload = {
        organization: org,
        branch: branch,
      };

      return fetchUpdateOrganization(id, payload, accessToken);
    },
  });
};
