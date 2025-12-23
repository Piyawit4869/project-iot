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
      <Card className="p-4">
        <Card>
          <UserProfileViewNew data={data} loading={loading} />
        </Card>
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-4">
            <Card className="w-full shadow-lg">
              <CardHeader>ข้อมูลส่วนตัว</CardHeader>
            </Card>
            <Card className="w-full shadow-lg">
              <CardHeader>ทักษะ</CardHeader>
            </Card>
            <Card className="w-full shadow-lg">
              <CardHeader>ภาพรวมบุค</CardHeader>
            </Card>
          </div>
          <div className="flex flex-2 flex-col gap-4">
            <Card className="w-full shadow-lg">
              <CardHeader>การศึกษา</CardHeader>
            </Card>
            <Card className="w-full shadow-lg">
              <CardHeader>ประสบการณ์ทำงาน</CardHeader>
            </Card>
            <Card className="w-full shadow-lg">
              <CardHeader>โซเชียลมีเดีย</CardHeader>
            </Card>
          </div>
        </div>
      </Card>
    </>
  );
};
