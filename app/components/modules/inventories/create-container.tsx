"use client";

import React from "react";

import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import { IndexLayoutTableLoading } from "~/components/shared/index-table-loading";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Save, PlusCircleIcon } from "lucide-react";
import { Card } from "~/components/ui/card";
import { useInventoryViewModel } from "~/hooks/inventories/viewmodels/useInventoryViewModel";
import { CreateInventory } from "./data/form-data-create";
import { SelectorItemsModal } from "~/components/shared/modal/selector-items-modal";
import { useGetProducts } from "~/api/client/product/useProductQuery";
import { Button } from "~/components/ui/button";
import { useProductsColumnTable } from "./no-data/product-column-table";
import { DataTable } from "~/components/shared/data-table";

const InventoryCreateContainer = () => {
  const {
    loading,
    form,
    isSubmitting,
    actions: { onSubmit },
  } = useInventoryViewModel();

  const columns = useProductsColumnTable();
  const { data: products = [] } = useGetProducts();

  const [inventoryProducts, setInventoryProducts] = React.useState<any[]>([]);
  const [selectItemIds, setSelectItemIds] = React.useState<string[]>([]);

  const handleChangeItems = (ids: string[]) => {
    setSelectItemIds(ids);
    const added = products.filter((p: { id: string }) => ids.includes(p.id));
    setInventoryProducts((prev) => {
      const map = new Map(prev.map((p: any) => [p.id, p]));
      for (const p of added) map.set(p.id, p);
      return Array.from(map.values());
    });
  };

  // const handleCreate = async () => {
  //   const base = form.getValues();
  //   const payload = {
  //     ...base,
  //     productIds: inventoryProducts.map((p: any) => p.id),
  //   };
  //   await onSubmit.create(payload);
  // };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex-1 flex-col space-y-3 p-8 md:flex">
        <TabControl
          title={
            loading.inventory ? (
              <SkeletonLoading className="w-[200px]" />
            ) : (
              "สร้างคลังสินค้า"
            )
          }
          backpath="/inventory"
          buttons={[
            <GlobalButton
              key="create button"
              label={
                <>
                  <Save className="mr-2" /> สร้าง
                </>
              }
              type="submit"
              form="inventory"
              loading={isSubmitting}
              // onClick={handleCreate}
            />,
            // <GlobalButton
            //   label="ยกเลิก"
            //   variant="outline"
            //   key="cancel"
            //   onClick={() => ...}
            // />,
          ]}
        />

        <Card className="p-4">
          {loading.inventory ? (
            <IndexLayoutTableLoading />
          ) : (
            <CreateInventory form={form} onSubmit={onSubmit.create} />
          )}
        </Card>

        <Card className="p-4 mt-5">
          <div className="flex items-center mb-2">
            <h2 className="text-lg font-bold mr-5">สินค้าในคลัง</h2>

            <div className="flex gap-2">
              <SelectorItemsModal
                items={products.filter((item: { id: string }) => !!item.id)}
                selected={selectItemIds}
                onChange={handleChangeItems}
                customButton={
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-[30px] w-[110px] p-2 gap-2 border-amber-500"
                  >
                    <PlusCircleIcon />
                    <span className="text-[12px]">เพิ่มสินค้า</span>
                  </Button>
                }
              />
            </div>
          </div>

          <div>
            <DataTable data={inventoryProducts} columns={columns} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InventoryCreateContainer;
