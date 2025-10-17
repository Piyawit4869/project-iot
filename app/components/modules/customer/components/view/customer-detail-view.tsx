import { useParams, useSearchParams } from "react-router";
import { useCustomer } from "~/api/client/customer/useCustomer";
import { FormTextRow } from "~/components/shared/formTextRow";
import { GlobalImage } from "~/components/shared/global-image";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { StarRating } from "~/components/shared/StarRating";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FormField } from "~/components/ui/form";
import type { CustomerFormCreateProps } from "~/schemas/customer/customer";

export const ViewCustomerDeatailCard: React.FC<CustomerFormCreateProps> = ({
  customer,
  form,
  loading = false,
}) => {
  const params = useParams();
  const id = params?.id as string;

  const mainSupport = customer?.supports?.find((s: any) => s.isMain);
  const secondarySupports = customer?.supports?.filter((s: any) => !s.isMain);

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2">
          <CardTitle className="text-base font-bold">รายละเอียด</CardTitle>
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
          <GlobalStatusBadge value={customer?.active} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <FormTextRow
              control={form.control}
              name="contacts.0.name"
              label="ผู้ติดต่อ"
            />
          </div>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-4 my-7">
            <FormField
              control={form.control}
              name={"priority"}
              render={({ field }) => (
                <>
                  <div className="flex flex-col w-full">
                    <span className="mb-2">ความสำคัญ</span>
                    <StarRating rating={field.value} interactive={false} />
                  </div>
                </>
              )}
            />
          </div>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-7">
            <FormTextRow
              control={form.control}
              name="contacts.0.email"
              label="อีเมลผู้ติดต่อ"
            />

            <FormTextRow
              control={form.control}
              name="contacts.0.phone"
              label="เบอร์โทรศัพท์ผู้ติดต่อ"
              type="phone"
            />

            <FormTextRow
              control={form.control}
              name="contacts.0.department"
              label="แผนกผู้ติดต่อ"
            />

            <FormTextRow
              control={form.control}
              name="contacts.0.position"
              label="ตำแหน่งผู้ติดต่อ"
            />
          </div>

          <div className="grid grid-cols-1  md:grid-cols-2 gap-7">
            <div className="flex flex-col w-full">
              <span>ผู้รับผิดชอบหลัก</span>
              <span className="mt-2 text-sm text-[#71717A]">
                {mainSupport ? (
                  <div className="flex items-center gap-2">
                    <GlobalImage
                      src={
                        mainSupport.imageUrl ||
                        `https://api.dicebear.com/9.x/initials/svg?seed=${mainSupport.fullName}`
                      }
                      alt={mainSupport.fullName}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{mainSupport.fullName}</span>
                  </div>
                ) : (
                  <span>ยังไม่ได้เลือกผู้รับผิดชอบ</span>
                )}
              </span>
            </div>

            <div className="flex flex-col w-full">
              <span>ผู้รับผิดชอบรอง</span>
              <span className=" text-sm text-[#71717A]">
                {secondarySupports && secondarySupports.length > 0 ? (
                  secondarySupports.map((s: any) => (
                    <div key={s.id} className="flex items-center mt-2 gap-2">
                      <GlobalImage
                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${s.fullName}`}
                        fallbackSrc={`https://api.dicebear.com/9.x/initials/svg?seed=${s.fullName}`}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{s.fullName}</span>
                    </div>
                  ))
                ) : (
                  <span>ยังไม่ได้เลือกผู้รับผิดชอบ</span>
                )}
              </span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
