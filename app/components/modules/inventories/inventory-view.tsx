"use client";

import React from "react";
import { useParams } from "react-router";
import { Card } from "~/components/ui/card";
import { InfoRow } from "~/components/shared/InfoRow";
import { DataTable } from "~/components/shared/data-table";
import { DualProgressCircle } from "~/components/shared/dual-progress-circle";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { TabControl } from "~/components/shared/tab-control";
import { useEntityBreadcrumb } from "~/providers/RouteProvider";
import { Separator } from "~/components/ui/separator";

import {
  useInventory,
  useGetAnalyzeInventory,
} from "~/api/client/inventories/useInventoryQuery";
import { Switch } from "~/components/ui/switch";
import { Checkbox } from "~/components/ui/checkbox";
import { useProductsColumnTable } from "./no-data/product-column-table";
import GlobalButton from "~/components/shared/global-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { NotebookText } from "lucide-react";
import { GetNoteInventoryAI } from "./no-data/modal-get-noteAi";

const InventoryViewPage = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const { data, isLoading } = useInventory(id);
  const { data: analyzeInventory, isLoading: loadAnalyzeInventory } =
    useGetAnalyzeInventory(id);
  const columns = useProductsColumnTable();

  const [OpenAiNote, setOpenAiNote] = React.useState<boolean>(false);

  useEntityBreadcrumb({
    feature: "inventory",
    entity: data ? { id: data.id, name: data.name ?? data.id } : undefined,
    base: data && {
      href: `/inventory/${data.id}`,
      label: data.name,
      uuid: data.id,
    },
  });

  return (
    <>
      <Tabs defaultValue="details" className="w-full px-3">
        <TabsList className="flex border-gray-200 pb-0 h-max px-5 gap-6 bg-card">
          <TabsTrigger
            value="details"
            className="flex items-center gap-2 px-0 py-3 text-gray-600 rounded-none border-b-2 border-2 shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-primary"
          >
            รายละเอียดคลังสินค้า
          </TabsTrigger>
          <TabsTrigger
            value="Settings"
            className="flex items-center gap-2 px-0 py-3 text-gray-600 rounded-none border-b-2 border-2 shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-primary"
          >
            พื้นที่อันตราย
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card className="w-full p-6 space-y-8">
            <div className="flex flex-col md:flex-row gap-6 w-full">
              <Card className="md:w-[50%] w-full border rounded-lg shadow-sm p-6">
                <h1 className="font-bold text-lg mb-4">ข้อมูลคลังสินค้า</h1>

                {isLoading ? (
                  <SkeletonLoading />
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <InfoRow label="ชื่อคลัง" value={data?.name ?? "-"} />
                      <InfoRow
                        label="ความจุของสินค้า (ชิ้น)"
                        value={data?.capacity ?? "0"}
                      />
                      <InfoRow
                        label="รายละเอียด"
                        value={data?.description ?? "-"}
                      />
                      <InfoRow
                        label="ที่อยู่คลังสินค้า"
                        value={data?.address ?? "-"}
                      />
                      <InfoRow label="บริษัท" value={data?.company ?? "-"} />
                      <InfoRow label="สาขา" value={data?.branch ?? "-"} />

                      <div className="flex flex-col mt-2 md:mt-4">
                        <span className="text-sm font-medium">
                          สถานะการใช้งาน
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-700 select-none">
                            ปิด
                          </span>
                          <Switch
                            checked={!!data?.active}
                            disabled
                            id="switch-active"
                          />
                          <span className="text-sm text-gray-700 select-none">
                            เปิด
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full space-y-5">
                      <div>
                        <h2 className="text-xl font-bold">
                          สิทธิการอนุญาตสินค้า
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          ตั้งค่าสิทธิว่าจะสินค้าชิ้นนี้สามารถ ขาย, ให้ยืม หรือ
                          ให้เช่า ได้หรือไม่
                        </p>
                      </div>

                      <Separator />

                      <div className="flex flex-row items-center gap-3">
                        <Checkbox checked={data?.allowSell} disabled />
                        <span className="font-medium">อนุญาตให้ขายสินค้า</span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-row items-center gap-3">
                          <Checkbox checked={data?.allowBorrow} disabled />
                          <span className="font-medium">
                            อนุญาตให้ลูกค้ายืมสินค้า (ไม่คิดเงิน)
                          </span>
                        </div>

                        <div className="max-w-[280px] ml-7">
                          <span className="text-sm font-medium">
                            จำนวนสูงสุดที่ยืมได้ (ชิ้น)
                          </span>
                          <div className="mt-1 rounded-md border bg-muted/30 px-3 py-2 text-sm text-slate-700">
                            {data?.maxBorrowQty ?? "0"}
                          </div>
                        </div>
                      </div>

                      {/* เช่าสินค้า */}
                      <div className="space-y-3">
                        <div className="flex flex-row items-center gap-3">
                          <Checkbox checked={data?.allowRent} disabled />
                          <span className="font-medium">
                            อนุญาตให้เช่าสินค้า
                          </span>
                        </div>

                        <div className="max-w-[280px] ml-7">
                          <span className="text-sm font-medium">
                            ราคาค่าเช่า (บาท)
                          </span>
                          <div className="mt-1 rounded-md border bg-muted/30 px-3 py-2 text-sm text-slate-700">
                            {data?.rentPrice ?? "0"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Card>

              <Card className="md:w-[50%] w-full flex justify-center items-center rounded-lg border p-6">
                {loadAnalyzeInventory ? (
                  <div className="flex flex-col items-center w-full">
                    <SkeletonLoading
                      shape="rounded"
                      width="w-[190px]"
                      height="h-[190px]"
                      className="mb-10"
                    />
                    <SkeletonLoading />
                    <SkeletonLoading />
                    <SkeletonLoading />
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col space-y-6 w-full p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h1 className="font-bold text-lg">
                          ภาพรวมการจำหน่ายสินค้า
                        </h1>
                        <div className="w-[120px]">
                          <GlobalButton
                            label="สรุปโน้ต"
                            variant="outline"
                            icon={<NotebookText className="w-4 h-4 ml-1" />}
                            onClick={() => setOpenAiNote(true)}
                          />
                        </div>
                        <GetNoteInventoryAI
                          open={OpenAiNote}
                          setOpen={setOpenAiNote}
                        />
                      </div>
                      <div className="flex justify-center w-full">
                        <DualProgressCircle
                          chartData={analyzeInventory}
                          emptyMessage="ยังไม่มีข้อมูล"
                        />
                      </div>
                      <div className="rounded-lg border p-4 w-full mt-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm mb-1">
                              การแจ้งเตือนคลังสินค้า
                            </span>
                            <p className="text-xs text-slate-500">
                              เปิดใช้งานเพื่อให้ระบบแจ้งเตือนเมื่อความจุของคลังใกล้เต็ม
                              หรือมีการเปลี่ยนแปลงที่สำคัญในระดับคลังสินค้า
                            </p>
                          </div>
                          <Switch
                            checked={data?.hasCapacityLimit}
                            disabled
                            id="switch-hasCapacityLimit"
                          />
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              เกณฑ์แจ้งเตือนความจุคลัง (ชิ้น)
                            </span>
                            <div className="mt-1 rounded-md border bg-muted/30 px-3 py-2 text-sm text-slate-700">
                              {data?.capacityThreshold ?? "0"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4 w-full mt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm">
                              การแจ้งเตือนสินค้าคงเหลือต่ำ
                            </span>
                            <p className="text-xs text-slate-500">
                              เปิดใช้งานเพื่อให้ระบบแจ้งเตือนเมื่อจำนวนสินค้าคงเหลือต่ำกว่าค่าที่กำหนด
                            </p>
                          </div>
                          <Switch
                            checked={data?.enableLowStockAlert}
                            disabled
                            id="switch-enableLowStockAlert"
                          />
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              เกณฑ์แจ้งเตือนสินค้าคงเหลือต่ำ (ชิ้น)
                            </span>
                            <div className="mt-1 rounded-md border bg-muted/30 px-3 py-2 text-sm text-slate-700">
                              {data?.lowStockThreshold ?? "0"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Card>
            </div>

            <div className="p-4">
              <div className="flex items-center">
                <h2 className="text-lg font-bold mr-5">สินค้าในคลัง</h2>
              </div>
              <DataTable data={data?.products ?? []} columns={columns} />
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="Settings">
          <Card className="p-4">
            <span className="block font-bold my-4">Danger Zone</span>

            <Card className="p-4 mb-4 border border-red-500 bg-red-100">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-red-700">
                    Deactivate Account
                  </span>
                  <p className="text-xs text-red-600">
                    Temporarily disable this user account
                  </p>
                </div>
                <GlobalButton
                  label="Deactivate"
                  variant="outline"
                  key="delete-btn"
                  className="max-w-[90px] px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                  disabled
                />
              </div>
            </Card>

            <Card className="p-4 border border-red-500 bg-red-100">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-red-700">
                    Delete Account
                  </span>
                  <p className="text-xs text-red-600">
                    Permanently remove this user and all associated data
                  </p>
                </div>
                <GlobalButton
                  label="Delete"
                  variant="outline"
                  key="delete-btn"
                  className="max-w-[90px] px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                  // onClick={onSubmit.remove}
                  disabled
                />
              </div>
            </Card>
          </Card>

          <div className="hidden md:block col-span-4" />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default InventoryViewPage;
