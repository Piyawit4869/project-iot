import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import type { UsersFormValues } from "~/schemas/users/user";
import { UserProfileView } from "../componentsview/formInformation";
import { UserCompensation } from "../componentsview/formCompensation";
import { UserSkills } from "../componentsview/formSkills";
import { UserWorkExperience } from "../componentsview/formworkExperiences";
import { UserStudy } from "../componentsview/formStudy";
import { UserSocalmedias } from "../componentsview/formSocalmedia";
import { UserDocuments } from "../componentsview/formDocuments";
import { GlobalImage } from "~/components/shared/global-image";
import { UserProfileViewNew } from "../componentsview/single-view-new/formInformation-new";

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
  return (
    <>
      <div className="mt-2 flex flex-col md:flex-row gap-5">
        <div className="md:w-[35%] h-[50%] w-full">
          <Card className="p-2 pt-4 h-full">
            <UserProfileView data={data} loading={loading} />
          </Card>
        </div>

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

          {/* <Card className="p-2">
            <WorkingHours data={data} loading={loading} />
          </Card> */}
        </div>
      </div>
    </>
  );
};
