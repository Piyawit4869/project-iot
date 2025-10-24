"use client";

import React, { useState } from "react";

import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { IndexLayoutTableLoading } from "~/components/shared/index-table-loading";
import { PlusCircleIcon, Trash2 } from "lucide-react";
import { SelectorItemsModal } from "~/components/shared/modal/selector-items-modal";
import { useEntityBreadcrumb } from "~/providers/RouteProvider";
import { DataTable } from "~/components/shared/data-table";
import { cn } from "~/lib/utils";
import { useParams } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { FormInventory } from "./form-inventory";
import { useInventoryViewModel } from "~/hooks/inventories/viewmodels/useInventoryViewModel";
import { useProductColumnTable } from "../products/product-column-table";
import {
  useGetAiInventory,
  useInventory,
} from "~/api/client/inventories/useInventoryQuery";
import type { Product } from "~/schemas/product/product";
import { useGetProducts } from "~/api/client/product/useProductQuery";
import { InfoRow } from "~/components/shared/InfoRow";
import { Switch } from "~/components/ui/switch";
import { AiInventoryView } from "./no-data/ai-inventory-view-modal";
import { GetNoteInventoryAI } from "./no-data/modal-get-noteAi";
import InventoryViewPage from "./inventory-view";

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
  const { data: getData } = useGetAiInventory(params?.id ?? "");
  const dataFromAI = getData?.inventoryData;

  const { data: products = [] } = useGetProducts();
  const [selectItemIds, setSelectItemIds] = React.useState<string[]>([]);
  const [productSelected, setProductSelected] = React.useState<Product[]>([]);

  const [isEdit, setIsEdit] = React.useState(false);
  const [AIOpen, setAIOpen] = useState(false);

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
              key="create button"
              type="submit"
              loading={isSubmitting}
              form="inventory"
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
            // <GlobalButton
            //   key="ai-inventory"
            //   type="button"
            //   label="ข้อมูลคลังสินค้าผ่าน AI"
            //   variant="secondary"
            //   className="bg-muted-foreground text-background hover:bg-gray-200 w-full px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
            //   onClick={() => setAIOpen(true)}
            // />,

            // <GlobalButton
            //   label="ลบคลังสินค้า"
            //   variant="outline"
            //   key="delete button"
            //   loading={isSubmitting}
            //   onClick={onSubmit.remove}
            // />,
            <GlobalButton
              key="edit"
              label="แก้ไข"
              onClick={() => setIsEdit(true)}
            />,
          ]}
        />
      )}

      {isEdit ? (
        <Card className="p-4">
          {loading.inventory ? (
            <IndexLayoutTableLoading />
          ) : (
            <FormInventory form={form} onSubmit={onSubmit} />
          )}
        </Card>
      ) : (
        <InventoryViewPage />
      )}
    </div>
  );
};

export default InventoryDetailContainer;
