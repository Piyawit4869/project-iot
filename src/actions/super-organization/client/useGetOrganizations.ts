import { useSession } from "next-auth/react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchMe,
  fetchOrganization,
  fetchCreateOrganization,
} from "../server/organizations";
import { CreateFormValues } from "@/schemas/super-organization/organization";
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
    mutationFn: (values: CreateFormValues) => {
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
          openDays: undefined,
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
          openDays: undefined,
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
        isMain: undefined,
      };
      console.log("name1: ", branch);
      console.log("name2: ", org);

      return fetchCreateOrganization(branch && org, accessToken);
    },
  });
};
