import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ContactCustomer } from "../components/form-view/contact-customer";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/shared/data-table";
import { useOrdersPaginateFilter } from "~/api/client/order/useGetOrder";
import { PieChart } from "~/components/shared/charts/pie-chart";

export function DashboardTabContent({
  isLoading,
  customer,
  formUpdate,
  loadCustomer,
  onUpdate,
  isPending,
  handleCancel,
  handleEditForm,
  columns,
  id,
  customerForms,
  analyzeCustomer,
  loadAnalyzeCustomer,
  setTab,
}: any) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-[50%] h-auto">
          {isLoading ? (
            <>
              <Card className="py-4 h-full p-5">
                <div className="flex justify-between ">
                  <div className="flex flex-col gap-2">
                    <SkeletonLoading className="w-20 h-4  " />
                    <SkeletonLoading className="w-25 h-4 " />
                    <SkeletonLoading className="w-40 h-10  " />
                  </div>

                  <div>
                    <SkeletonLoading className="w-10 h-10" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <SkeletonLoading className="w-20 h-4  " />
                  <SkeletonLoading className="w-40 h-10  " />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonLoading
                      key={i}
                      className={`h-7 ${i % 4 < 2 ? "w-30" : ""}`}
                    />
                  ))}
                </div>
              </Card>
            </>
          ) : (
            <ContactCustomer
              customer={customer}
              form={formUpdate}
              loading={loadCustomer}
              onClick={onUpdate}
              disabled={isLoading || isPending}
              mode={
                customerForms.find((f: any) => f.key === "contact_detail")?.mode
              }
              onCancel={handleCancel}
              onEditForm={handleEditForm}
            />
          )}
        </div>

        <Card className="w-full md:w-[50%]  ">
          <CardHeader>
            <CardTitle className="text-base font-bold">
              ความสัมพันธ์ลูกค้า
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 w-full">
            {loadAnalyzeCustomer ? (
              <>
                <div className="flex justify-center">
                  <SkeletonLoading
                    shape="rounded"
                    width="w-[200px]"
                    height="h-[200px]"
                    className="mb-7"
                  />
                </div>
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
              </>
            ) : (
              <div className="flex w-full">
                <PieChart initData={analyzeCustomer} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="my-5">
        <div className="flex gap-2 mx-6 justify-between items-center">
          <span className="text-base font-bold ">ออเดอร์ที่สั่งซื้อล่าสุด</span>
          <Button onClick={() => setTab("order")}>ดูทั้งหมด</Button>
        </div>
        <CardContent>
          <DataTable
            offSearch
            offFilter
            queryFunction={({ pageIndex, pageSize }) =>
              useOrdersPaginateFilter({
                pageIndex,
                pageSize: 5,
                customerId: id,
                sortField: "orderDetails_createdAt",
                sortingBy: "desc",
              })
            }
            offPaginate={true}
            columns={columns}
          />
        </CardContent>
      </Card>
    </>
  );
}
