"use client";

import React from "react";

import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { IndexLayoutTableLoading } from "~/components/shared/index-table-loading";
import { PlusCircleIcon, Trash2 } from "lucide-react";
import { SelectorItemsModal } from "~/components/shared/modal/selector-items-modal";
import { useEntityBreadcrumb } from "~/providers/RouteProvider";
import { DataTable } from "~/components/shared/data-table";
import { GlobalImage } from "~/components/shared/global-image";
import { cn } from "~/lib/utils";
import { useParams } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { FormInventory } from "./form-inventory";
import { useInventoryViewModel } from "~/hooks/inventories/viewmodels/useInventoryViewModel";
import { useProductColumnTable } from "../products/product-column-table";
import { useInventory } from "~/api/client/inventories/useInventoryQuery";
import type { Product } from "~/schemas/product/product";
import { useGetProducts } from "~/api/client/product/useProductQuery";

const InventoryDetailContainer = () => {
  const {
    inventory,
    loading,
    form,
    isSubmitting,
    actions: { onSubmit },
  } = useInventoryViewModel();
  const columns = useProductColumnTable();

  const params = useParams<{ id: string }>();
  const { data } = useInventory(params.id ?? "");

  const { data: products = [] } = useGetProducts();
  const [selectItemIds, setSelectItemIds] = React.useState<string[]>([]);
  const [productSelected, setProductSelected] = React.useState<Product[]>([]);

  const handleChangeItems = (ids: string[]) => {
    setSelectItemIds(ids);
    const byId = new Set(ids);
    setProductSelected(products.filter((p: Product) => byId.has(p.id ?? "")));
  };

  const handleRemoveSelected = (id: string) => {
    setProductSelected((prev) => prev.filter((p) => p.id !== id));
    setSelectItemIds((prev) => prev.filter((x) => x !== id));
  };

  const renderAvailabilityBadge = (status?: string) => {
    const isAvailable =
      status === "available" || status === "in_stock" || status === "IN_STOCK";
    return (
      <Badge
        variant="outline"
        className={cn(
          "px-2 py-0 text-[10px] rounded-full",
          isAvailable
            ? "bg-green-400 text-black font-bold pt-1"
            : "bg-gray-500 text-white font-bold pt-1"
        )}
      >
        {isAvailable ? "สั่งซื้อได้" : "สินค้าหมด"}
      </Badge>
    );
  };

  // const products = inventory?.products?.length ? inventory.res : [];

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

  return (
    <div className="flex flex-col w-full space-y-8 p-8">
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
            label="บันทึก"
            key={"create button"}
            type="submit"
            loading={isSubmitting}
            form="inventory"
          />,
          <GlobalButton
            label="ลบคลังสินค้า"
            variant="outline"
            key={"delete button"}
            loading={isSubmitting}
            onClick={onSubmit.remove}
          />,
        ]}
      />
      <Card className="p-4">
        {loading.inventory ? (
          <IndexLayoutTableLoading />
        ) : (
          <FormInventory form={form} onSubmit={onSubmit.update} />
        )}
      </Card>

      {loading.inventory ? (
        <IndexLayoutTableLoading />
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">ข้อมูลคลังสินค้า</h2>

            <div className="flex gap-2 mb-2">
              <SelectorItemsModal
                items={products.filter((item: { id: string }) => !!item.id)}
                selected={selectItemIds}
                onChange={handleChangeItems}
                customButton={
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-[30px] w-[90px] p-2 gap-2 border-amber-500"
                  >
                    <PlusCircleIcon />
                    <span className="text-[12px]">เพิ่มสินค้า</span>
                  </Button>
                }
              />
            </div>
          </div>

          {/* <div className="flex flex-col">
            {productSelected.length > 0 ? (
              productSelected.map((ps: any) => (
                <div
                  key={ps.id ?? "-"}
                  className="flex flex-row items-center gap-2 mb-2"
                >
                  <GlobalImage
                    src={ps.imageUrl ?? "-"}
                    alt="product-image"
                    className="rounded-xl w-[35px] h-[35px] object-cover object-center"
                  />
                  <div className="flex flex-col w-1/2 gap-1">
                    <div>
                      <span className="text-sm font-medium truncate">
                        {ps.name ?? "-"}
                      </span>
                      <h2 className="text-sm font-light text-gray-400 truncate">
                        {ps.description ?? "-"}
                      </h2>
                    </div>

                    <div className="flex flex-row justify-between">
                      <span className="font-semibold text-sm text-blue-600">
                        {ps.salePrice ?? "-"} ฿
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-1">
                    {renderAvailabilityBadge(ps.status)}
                    <button
                      className="border-l-2"
                      onClick={() => handleRemoveSelected(ps.id!)}
                      aria-label="remove-selected-product"
                    >
                      <Trash2 size="18px" color="red" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xs text-gray-400 mt-10"></p>
            )}
          </div> */}

          <DataTable data={data?.products ?? []} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default InventoryDetailContainer;
