import { useParams, useSearchParams } from "react-router";
import { useCustomer } from "~/api/client/customer/useCustomer";
import { FormTextRow } from "~/components/shared/formTextRow";
import { GlobalImage } from "~/components/shared/global-image";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { FormField, FormItem } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import type { CustomerFormCreateProps } from "~/schemas/customer/customer";

export const ViewCustomerInfoCard: React.FC<CustomerFormCreateProps> = ({
  form,
  loading = false,
}) => {
  const params = useParams();
  const id = params?.id as string;

  const { data: customer } = useCustomer(id);

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2">
          <CardTitle className="text-base font-bold">ข้อมูลลูกค้า</CardTitle>
        </div>
      </CardHeader>

      {loading ? (
        <CardContent className="space-y-4 ">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <CardContent className="space-y-4">
          {/* Activity Name */}

          <div className="md:grid-cols-2 gap-7  flex  ">
            <GlobalImage
              src={customer?.profile?.imageUrl}
              width={140}
              height={140}
              className="rounded-xl object-contain object-center  "
              fallbackSrc={`https://api.dicebear.com/9.x/initials/svg?seed=${customer.name}`}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 pt-4">
            <FormTextRow
              control={form.control}
              name="profile.prefix"
              label="คำนำหน้า"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <FormTextRow
              control={form.control}
              name="profile.firstName"
              label="ชื่อ"
            />
            <FormTextRow
              control={form.control}
              name="profile.lastName"
              label="นามสกุล"
            />
            {/* <FormTextRow
              control={form.control}
              name="profile.firstNameTh"
              label="ชื่อจริง (ภาษาไทย)"
            />
            <FormTextRow
              control={form.control}
              name="profile.lastNameTh"
              label="นามสกุล (ภาษาไทย)"
            /> */}
            <FormTextRow
              control={form.control}
              name="profile.nickName"
              label="ชื่อเล่น"
            />

            <FormTextRow
              control={form.control}
              name="profile.gender"
              label="เพศ"
            />
            <FormTextRow
              control={form.control}
              name="profile.birthDate"
              label="วัน/เดือน/ปี เกิด"
              type="dateFull"
            />

            <FormTextRow
              control={form.control}
              name="profile.age"
              label="อายุ"
            />
          </div>
          <div className="grid grid-cols-1 py-4 md:grid-cols-2 gap-7">
            <FormField
              control={form.control}
              name="consentPii"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-full">
                    <div className="flex items-center gap-3 pointer-events-none">
                      <Checkbox id="agree" />
                      <Label {...field} htmlFor="agree">
                        การอนุญาตให้เก็บข้อมูลความลับ
                      </Label>
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-2">
            <FormTextRow
              control={form.control}
              name="profile.taxId"
              label="เลขประจำตัวผู้เสียภาษี"
            />

            <FormTextRow
              control={form.control}
              name="customerType"
              label="ประเภทผู้ติดต่อ"
            />

            <FormTextRow
              control={form.control}
              name="profile.phone"
              label="เบอร์โทรศัพท์"
              type="phone"
            />
            <FormTextRow
              control={form.control}
              name="profile.position"
              label="ตำแหน่ง"
            />

            <FormTextRow
              control={form.control}
              name="profile.lineName"
              label="ไอดีไลน์"
            />
            <FormTextRow
              control={form.control}
              name="profile.faceBookName"
              label="ชื่อ Facebook"
            />

            <FormTextRow
              control={form.control}
              name="status"
              label="สถานะบัญชี"
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
};
