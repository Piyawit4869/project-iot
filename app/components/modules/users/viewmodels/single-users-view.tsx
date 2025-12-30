import React from "react";
import { Card } from "~/components/ui/card";
import type { UsersFormValues } from "~/schemas/users/user";
import { UserProfileView } from "../componentsview/formInformation";
import { UserCompensation } from "../componentsview/formCompensation";
import { UserSkills } from "../componentsview/formSkills";
import { UserWorkExperience } from "../componentsview/formworkExperiences";
import { UserStudy } from "../componentsview/formStudy";
import { UserSocalmedias } from "../componentsview/formSocalmedia";
import { UserDocuments } from "../componentsview/formDocuments";
import { UserPersonality } from "../componentsview/formPesonality";
import type { UseFormReturn } from "react-hook-form";

type EditUsersViewProps = {
  data?: Partial<UsersFormValues>;
  loading?: boolean;

  onEdit?: () => void;
  onDelete?: () => void;
};

export const SingleUsersView: React.FC<EditUsersViewProps> = ({
  data = {},

  loading = false,
}) => {
  // const profile: Partial<UsersFormValues["profile"]> = data?.profile ?? {};
  // const firstWorkExp = profile.workExperiences?.[0];

  return (
    <>
      {/* <Card className="p-4 mt-5">
        <div className="flex flex-row items-start gap-6">
          <div className="flex flex-col gap-2">
            {profile.imageUrl ? (
              <GlobalImage
                src={profile.imageUrl}
                alt="profile"
                className="h-28 w-28 object-cover rounded-md border"
              />
            ) : (
              <div className="h-28 w-28 rounded-md border bg-muted flex items-center justify-center text-sm text-muted-foreground">
                ไม่มีรูป
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 flex-1">
            <InfoRow
              label="ชื่อ"
              value={
                <span className="font-semibold text-lg">{data?.userName}</span>
              }
            />
            <InfoRow
              label="ตำแหน่ง"
              value={
                <span className="font-semibold text-lg">
                  {firstWorkExp?.position ?? "-"}
                </span>
              }
            />
            <InfoRow
              label=""
              value={
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 " />
                  <span>{data?.email}</span>
                </div>
              }
            />
            <InfoRow
              label=""
              value={
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 " />
                  <span>{profile.phone} </span>
                </div>
              }
            />
            <InfoRow
              label="วันที่เริ่ม"
              value={profile.birthDate ?? null}
              format={(v) => (v ? dayjs(v).format("DD MMMM YYYY") : "-")}
            />
          </div>
        </div>
      </Card> */}
      {/* <Card className="p-2 pt-4 h-full">
        <UserProfileView data={data} loading={loading} />
      </Card>
      <div className="mt-2 flex flex-col md:flex-row gap-5">
        <div className="md:w-[35%] h-[50%] w-full"></div>

        <div className="md:w-[65%] w-full flex flex-col gap-5">
          <Card className="p-2p py-8">
            <UserCompensation data={data} loading={loading} />
          </Card>

          <Card className="p-2 py-8">
            <UserSkills data={data} loading={loading} />
          </Card>

          <Card className="p-2 py-8">
            <UserWorkExperience data={data} loading={loading} />
          </Card>

          <Card className="p-2 py-8">
            <UserStudy data={data} loading={loading} />
          </Card>

          <Card className="p-2 py-8">
            <UserSocalmedias data={data} loading={loading} />
          </Card>

          <Card className="p-2 py-8">
            <UserDocuments data={data} loading={loading} />
          </Card>
        </div>
      </div> */}
      <div className="mt-2 flex flex-col md:flex-row gap-5">
        <div className="md:w-[45%] h-[50%] w-full flex flex-col gap-5">
          <Card className="p-2 pt-2 h-full">
            <UserProfileView data={data} loading={loading} />
          </Card>

          <Card className="p-4 py-6 gap-2">
            <UserSkills data={data} loading={loading} />
          </Card>
          <Card className="p-4 py-6 gap-2">
            <UserPersonality data={data} loading={loading} />
          </Card>
        </div>

        <div className="md:w-[55%] w-full flex flex-col gap-5">
          <Card className="p-4 py-6 gap-2">
            <UserCompensation data={data} loading={loading} />
          </Card>

          <Card className="p-4 py-6 gap-2">
            <UserWorkExperience data={data} loading={loading} />
          </Card>

          <Card className="p-4 py-6 gap-2">
            <UserStudy data={data} loading={loading} />
          </Card>

          <Card className="p-4 py-6 gap-2">
            <UserSocalmedias data={data} loading={loading} />
          </Card>

          <Card className="p-4 py-6 gap-2">
            <UserDocuments data={data} loading={loading} />
          </Card>

          {/* <Card className="p-2">
            <WorkingHours data={data} loading={loading} />
          </Card> */}
        </div>
      </div>
    </>
  );
};
