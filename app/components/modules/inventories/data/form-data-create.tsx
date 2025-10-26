import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { Textarea } from "~/components/ui/textarea";
import { type UseFormReturn } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { RequiredLabel } from "~/components/shared/required-design";
import { Switch } from "~/components/ui/switch";
import type { InventoryCreateDTO } from "~/schemas/product/detail/InventorySchema";
import {
  useGetAnalyzeInventory,
  useInventory,
} from "~/api/client/inventories/useInventoryQuery";
import { useParams } from "react-router";
import { useGetProducts } from "~/api/client/product/useProductQuery";
import type { Product } from "~/schemas/product/product";
import { NotebookText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { DualProgressCircle } from "~/components/shared/dual-progress-circle";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Checkbox } from "~/components/ui/checkbox";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import GlobalButton from "~/components/shared/global-button";
import { useProductsColumnTable } from "../no-data/product-column-table";
import { GetNoteInventoryAI } from "../no-data/modal-get-noteAi";
import { branchList, companyList, inventoryTypeList } from "../indata/inData";
import { Progress } from "~/components/ui/progress";

interface FormInventoryProps {
  form: UseFormReturn<InventoryCreateDTO>;
  onSubmit: (values: InventoryCreateDTO) => void;
}

export const CreateInventory: React.FC<FormInventoryProps> = (props) => {
  const { form, onSubmit } = props;
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const { data: analyzeInventory, isLoading: loadAnalyzeInventory } =
    useGetAnalyzeInventory(id);

  const [OpenAiNote, setOpenAiNote] = React.useState<boolean>(false);

  const [progress, setProgress] = React.useState(13);
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(0), 500);
    return () => clearTimeout(timer);
  }, []);

  const currentQty = analyzeInventory?.soldQtyThisMonth ?? 0;
  const targetQty = analyzeInventory?.monthlyTarget ?? 0;
  const percent =
    targetQty > 0
      ? Math.min(Math.round((currentQty / targetQty) * 100), 100)
      : Math.round(progress);

  return (
    <>
      <Tabs defaultValue="details" className="w-full px-3">
        <TabsList className="flex border-gray-200 pb-0 h-max px-5 gap-6 bg-card">
          <TabsTrigger
            value="details"
            className="text-lg flex items-center gap-2 px-0 py-3 rounded-none border-b-2 border-2 shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-primary"
          >
            รายละเอียดคลังสินค้า
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Form {...form}>
            <form
              id="inventory"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row gap-6 w-full p-4">
                <div className="md:w-[50%] w-full border rounded-lg shadow-sm p-6">
                  <h1 className="font-bold text-lg mb-4">ข้อมูลคลังสินค้า</h1>

                  <div>
                    <FormField
                      control={form.control}
                      name="active"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>สถานะการใช้งาน</FormLabel>
                          <FormControl>
                            <div className="flex items-center flex-row gap-2 mt-1">
                              <label
                                htmlFor="switch-status"
                                className="text-sm text-gray-700 select-none"
                              >
                                ปิด
                              </label>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                id="switch-status"
                              />
                              <label
                                htmlFor="switch-status"
                                className="text-sm text-gray-700 select-none"
                              >
                                เปิด
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <RequiredLabel required>ชื่อคลังสินค้า</RequiredLabel>
                          <FormControl>
                            <Input placeholder="เช่น คลังสินค้า A" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ความจุของคลังสินค้า</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="เช่น 1000"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="inventoryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ประเภทคลังสินค้า</FormLabel>
                          <FormControl className="w-full">
                            <Select
                              value={field.value}
                              onValueChange={(v) => field.onChange(v)}
                            >
                              <SelectTrigger
                                className="w-full"
                                // disabled
                              >
                                <SelectValue placeholder="เช่น หลัก / ย่อย / ฝาก / จำหน่าย" />
                              </SelectTrigger>
                              <SelectContent className="w-full">
                                {inventoryTypeList.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>รายละเอียด</FormLabel>
                          <FormControl>
                            <Textarea
                              className="mt-3"
                              placeholder="รายละเอียดคลังสินค้า / เงื่อนไขการจัดเก็บ"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>เลือกบริษัท</FormLabel>
                          <FormControl className="w-full">
                            <Select
                              value={field.value}
                              onValueChange={(v) => field.onChange(v)}
                            >
                              <SelectTrigger
                                className="w-full"
                                // disabled
                              >
                                <SelectValue placeholder="เลือกบริษัท" />
                              </SelectTrigger>
                              <SelectContent className="w-full">
                                {companyList.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="branch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>เลือกสาขา</FormLabel>
                          <FormControl className="w-full">
                            <Select
                              value={field.value}
                              onValueChange={(v) => field.onChange(v)}
                            >
                              <SelectTrigger
                                className="w-full"
                                // disabled
                              >
                                <SelectValue placeholder="เลือกสาขาของบริษัท" />
                              </SelectTrigger>
                              <SelectContent className="w-full">
                                {branchList.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-4 w-[100%]">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ที่อยู่คลังสินค้า</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="ที่อยู่คลังสินค้า / พิกัด หรือรายละเอียดเพิ่มเติม"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ผู้ดูแลคลัง</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ชื่อผู้รับผิดชอบหลัก"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>เบอร์ติดต่อ</FormLabel>
                          <FormControl>
                            <Input placeholder="เช่น 080 0000 000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>อีเมลติดต่อ</FormLabel>
                          <FormControl>
                            <Input placeholder="เช่น DE1@ogga.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full mt-5 space-y-5">
                    <div>
                      <h2 className="text-xl font-bold">
                        สิทธิ์การอนุญาตสินค้า
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        ตั้งค่าสิทธิว่าจะสินค้าชิ้นนี้สามารถ ขาย, ให้ยืม หรือ
                        ให้เช่า ได้หรือไม่
                      </p>
                    </div>

                    <Separator />

                    <FormField
                      control={form.control}
                      name="allowSell"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center gap-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={(ck) => field.onChange(!!ck)}
                            />
                          </FormControl>
                          <FormLabel className="font-medium">
                            อนุญาตให้ขายสินค้า
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="allowBorrow"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center gap-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={!!field.value}
                                onCheckedChange={(ck) => field.onChange(!!ck)}
                              />
                            </FormControl>
                            <FormLabel className="font-medium">
                              อนุญาตให้ลูกค้ายืมสินค้า (ไม่คิดเงิน)
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maxBorrowQty"
                        render={({ field }) => (
                          <FormItem className="max-w-[280px] ml-7">
                            <FormLabel>จำนวนสูงสุดที่ยืมได้ (ชิ้น)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                inputMode="numeric"
                                placeholder="เช่น 3"
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value === ""
                                      ? null
                                      : Number(e.target.value)
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="allowRent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center gap-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={!!field.value}
                                onCheckedChange={(ck) => field.onChange(!!ck)}
                              />
                            </FormControl>
                            <FormLabel className="font-medium">
                              อนุญาตให้เช่าสินค้า
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="rentPrice"
                        render={({ field }) => (
                          <FormItem className="max-w-[280px] ml-7">
                            <FormLabel>ราคาค่าเช่า (บาท)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                inputMode="decimal"
                                placeholder="เช่น 100"
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value === ""
                                      ? null
                                      : Number(e.target.value)
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="md:w-[50%] w-full flex justify-center rounded-lg border">
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

                        <div className="space-y-1">
                          <div className="w-full rounded-md bg-muted/60 px-4 py-2 text-sm font-medium">
                            ขายแล้ว {currentQty}/{targetQty} ชิ้น ({percent}%)
                            จากเป้าหมาย
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <h1 className="font-bold text-lg">ความคืบหน้า</h1>
                            <span className="text-2xl font-bold">
                              {percent}%
                            </span>
                          </div>

                          <Progress
                            value={percent}
                            className="w-full h-3 rounded-full"
                          />

                          <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                            <span>0</span>
                            <span className="font-medium">
                              {currentQty}/{targetQty} = ชิ้น
                            </span>
                            <span>{targetQty}</span>
                          </div>

                          <div className="rounded-lg border p-4 w-full mt-4 space-y-3">
                            <h2 className="font-bold">ตั้งค่าเป้าหมาย</h2>

                            <FormField
                              control={form.control}
                              name="monthlyTarget"
                              render={({ field }) => (
                                <FormItem className="max-w-[320px]">
                                  <FormLabel>เป้าหมายใหม่ (ชิ้น)</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      inputMode="numeric"
                                      placeholder="เช่น 50"
                                      value={field.value ?? ""}
                                      onChange={(e) =>
                                        field.onChange(
                                          e.target.value === ""
                                            ? null
                                            : Number(e.target.value)
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <div className="rounded-lg border p-4 w-full space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="font-semibold text-sm mb-1">
                                การแจ้งเตือนคลังสินค้า
                              </span>
                              <p className="text-xs text-slate-500">
                                เปิดใช้งานเพื่อให้ระบบแจ้งเตือนเมื่อความจุของคลังใกล้เต็ม
                                หรือมีการเปลี่ยนแปลงที่สำคัญในระดับคลังสินค้า
                              </p>
                            </div>

                            <FormField
                              control={form.control}
                              name="hasCapacityLimit"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={(ck) =>
                                        field.onChange(ck)
                                      }
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="capacityThreshold"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  เกณฑ์แจ้งเตือนความจุคลัง (ชิ้น)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="เช่น 100"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.value === ""
                                          ? null
                                          : Number(e.target.value)
                                      )
                                    }
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* การแจ้งเตือนสินค้าคงเหลือต่ำ */}
                        <div className="rounded-lg border p-4 w-full space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="font-semibold text-sm">
                                การแจ้งเตือนสินค้าคงเหลือต่ำ
                              </span>
                              <p className="text-xs text-slate-500">
                                เปิดใช้งานเพื่อให้ระบบแจ้งเตือนเมื่อจำนวนสินค้าคงเหลือต่ำกว่าค่าที่กำหนด
                              </p>
                            </div>

                            <FormField
                              control={form.control}
                              name="enableLowStockAlert"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Switch
                                      checked={!!field.value}
                                      onCheckedChange={(ck) =>
                                        field.onChange(ck)
                                      }
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="lowStockThreshold"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  เกณฑ์แจ้งเตือนสินค้าคงเหลือต่ำ (ชิ้น)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="เช่น 10"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.value === ""
                                          ? null
                                          : Number(e.target.value)
                                      )
                                    }
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </>
  );
};
