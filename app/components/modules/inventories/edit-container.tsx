"use client";

import React from "react";
import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { IndexLayoutTableLoading } from "~/components/shared/index-table-loading";
import { useEntityBreadcrumb } from "~/providers/RouteProvider";
import { Card } from "~/components/ui/card";
import { useInventoryViewModel } from "~/hooks/inventories/viewmodels/useInventoryViewModel";
import InventoryViewPage from "./view/inventory-view";
import { EditInventory } from "./data/form-data-Edit";
import { DataTable } from "~/components/shared/data-table";
import { useInventory } from "~/api/client/inventories/useInventoryQuery";
import { useParams } from "react-router";
import { useProductsColumnTable } from "./no-data/product-column-table";
import { SelectorItemsModal } from "~/components/shared/modal/selector-items-modal";
import { useGetProducts } from "~/api/client/product/useProductQuery";
import { Button } from "~/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

const InventoryDetailContainer = () => {
  const {
    inventory,
    loading,
    form,
    isSubmitting,
    actions: { onSubmit },
  } = useInventoryViewModel();

  const [isEdit, setIsEdit] = React.useState(false);
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const { data } = useInventory(id);
  const { data: products = [] } = useGetProducts();
  const columns = useProductsColumnTable();

  const [inventoryProducts, setInventoryProducts] = React.useState<any[]>([]);
  const [selectItemIds, setSelectItemIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (data?.products) {
      setInventoryProducts(data.products);
    }
  }, [data?.products]);

  const handleChangeItems = (ids: string[]) => {
    setSelectItemIds(ids);
    const added = products.filter((p: { id: string }) => ids.includes(p.id));
    setInventoryProducts((prev) => {
      const map = new Map(prev.map((p: any) => [p.id, p]));
      for (const p of added) map.set(p.id, p);
      return Array.from(map.values());
    });
  };

  useEntityBreadcrumb({
    feature: "inventory",
    entity: inventory
      ? { id: inventory.id, name: inventory?.name ?? inventory.id }
      : undefined,
    base: inventory && {
      href: `/inventory/${inventory?.id}`,
      label: inventory?.name,
      uuid: inventory?.id,
    },
  });

  const handleSave = () => {
    const base = form.getValues();
    const payload = {
      ...base,

      id: base.id ?? id,
      productIds: inventoryProducts.map((p: any) => p.id),
    };
    onSubmit.update(payload);
  };

  return (
    <div className="flex flex-col w-full space-y-8 p-8">
      {isEdit ? (
        <TabControl
          title={
            loading.inventory ? (
              <SkeletonLoading className="w-[200px]" />
            ) : (
              `แก้ไขคลังสินค้า ${inventory?.name}`
            )
          }
          backpath="/inventory"
          buttons={[
            <GlobalButton
              key="cancel"
              label="ยกเลิก"
              variant="outline"
              onClick={() => setIsEdit(false)}
              className="mr-2"
            />,
            <GlobalButton
              label="บันทึก"
              key="save"
              type="button"
              loading={isSubmitting}
              onClick={handleSave}
            />,
          ]}
        />
      ) : (
        <TabControl
          title={
            loading.inventory ? (
              <SkeletonLoading className="w-[200px]" />
            ) : (
              `ข้อมูลคลังสินค้า ${inventory?.name}`
            )
          }
          backpath="/inventory"
          buttons={[
            <GlobalButton
              key="edit"
              label="แก้ไข"
              onClick={() => setIsEdit(true)}
            />,
          ]}
        />
      )}

      <Card className="p-4">
        {isEdit ? (
          loading.inventory ? (
            <IndexLayoutTableLoading />
          ) : (
            <EditInventory
              form={form}
              onSubmit={{ update: onSubmit.update, remove: onSubmit.remove }}
            />
          )
        ) : (
          <InventoryViewPage />
        )}
      </Card>
      <Card className="p-4">
        <div className="flex items-center mb-2">
          <h2 className="text-lg font-bold mr-5">สินค้าในคลัง</h2>

          {isEdit && (
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
          )}
        </div>
        <div>
          <DataTable data={inventoryProducts} columns={columns} />
        </div>
      </Card>
    </div>
  );
};

export default InventoryDetailContainer;
