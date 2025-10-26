import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm, type Resolver } from "react-hook-form";
import { useInventoryFetch } from "./useInventoryFetch";
import {
  InventoryCreateSchema,
  type InventoryCreateDTO,
} from "~/schemas/product/detail/InventorySchema";

type InventoryForm = InventoryCreateDTO & { id?: string };

export const useFormInventorySetup = (slug: string) => {
  const fetch = useInventoryFetch(slug);

  const { inventory, isLoading } = fetch as {
    inventory?: {
      id?: string;
      name?: string;

      hasCapacityLimit?: boolean;
      enableLowStockAlert?: boolean;
      lowStockThreshold?: number;
      capacityThreshold?: number;

      inventoryType?: string;
      contactName?: string;
      contactPhone?: string;
      contactEmail?: string;

      allowSell?: boolean;
      allowBorrow?: boolean;
      maxBorrowQty?: number;
      allowRent?: boolean;
      rentPrice?: number;

      description?: string;
      address?: string;
      company?: string;
      branch?: string;
      capacity?: string;

      // productcapacity?: number;
      // stockQty?: number;
      active?: boolean;
      productIds?: string[];

      // targetQty?: number;
      // soldQtyThisPeriod?: number;
      monthlyTarget?: number;
    };
    isLoading?: boolean;
  };

  const form = useForm<InventoryForm>({
    resolver: zodResolver(InventoryCreateSchema) as Resolver<InventoryForm>,
    defaultValues: {
      id: "",
      name: "",

      hasCapacityLimit: false,
      enableLowStockAlert: false,
      lowStockThreshold: 0,
      capacityThreshold: 0,

      inventoryType: "main_warehouse",
      contactName: "",
      contactPhone: "",
      contactEmail: "",

      allowSell: false,
      allowBorrow: false,
      maxBorrowQty: 0,
      allowRent: false,
      rentPrice: 0,

      description: "",
      address: "",
      company: "",
      branch: "",
      capacity: "",

      // productcapacity: 0,
      // stockQty: 0,
      active: true,
      productIds: [],

      // targetQty: 0,
      // soldQtyThisPeriod: 0,
      monthlyTarget: 0,
    },
  });

  React.useEffect(() => {
    if (inventory) {
      form.reset({
        id: inventory.id ?? "",
        name: inventory.name ?? "",

        hasCapacityLimit: inventory.hasCapacityLimit ?? false,
        enableLowStockAlert: inventory.enableLowStockAlert ?? false,
        lowStockThreshold: inventory.lowStockThreshold ?? 0,
        capacityThreshold: inventory.capacityThreshold ?? 0,

        inventoryType:
          (inventory.inventoryType as InventoryForm["inventoryType"]) ??
          "main_warehouse",
        contactName: inventory.contactName ?? "",
        contactPhone: inventory.contactPhone ?? "",
        contactEmail: inventory.contactEmail ?? "",

        allowSell: inventory.allowSell ?? false,
        allowBorrow: inventory.allowBorrow ?? false,
        maxBorrowQty: inventory.maxBorrowQty ?? 0,
        allowRent: inventory.allowRent ?? false,
        rentPrice: inventory.rentPrice ?? 0,

        description: inventory.description ?? "",
        address: inventory.address ?? "",
        company: inventory.company ?? "",
        branch: inventory.branch ?? "",
        capacity: inventory.capacity ?? "",

        // productcapacity: inventory.productcapacity ?? 0,
        // stockQty: inventory.stockQty ?? 0,
        active: inventory.active ?? true,
        productIds: inventory.productIds ?? [],

        // targetQty: inventory.targetQty ?? 0,
        // soldQtyThisPeriod: inventory.soldQtyThisPeriod ?? 0,
        monthlyTarget: inventory.monthlyTarget ?? 0,
      });
    } else {
      form.reset({
        id: "",
        name: "",

        hasCapacityLimit: false,
        enableLowStockAlert: false,
        lowStockThreshold: 0,
        capacityThreshold: 0,

        inventoryType: "main_warehouse",
        contactName: "",
        contactPhone: "",
        contactEmail: "",

        allowSell: false,
        allowBorrow: false,
        maxBorrowQty: 0,
        allowRent: false,
        rentPrice: 0,

        description: "",
        address: "",
        company: "",
        branch: "",
        capacity: "",

        // productcapacity: 0,
        // stockQty: 0,
        active: true,
        productIds: [],

        // targetQty: 0,
        // soldQtyThisPeriod: 0,
        monthlyTarget: 0,
      });
    }
  }, [inventory, form]);

  const { isSubmitting, errors } = form.formState;
  const ready = !isLoading;
  const isEdit = Boolean(inventory?.id || form.getValues("id"));

  const buildPayload = (): InventoryCreateDTO & { id?: string } => {
    const base = form.getValues();

    if (isEdit) {
      const id =
        inventory?.id ||
        base.id ||
        (slug && slug.trim().length > 0 ? slug : undefined);

      if (!id) {
        throw new Error("ไม่พบรหัสคลังสินค้า (id) สำหรับการแก้ไข");
      }
      const { id: _omit, ...rest } = base;
      return { ...rest, id };
    }

    const { id: _omit, ...createPayload } = base;
    return createPayload;
  };

  return {
    ...fetch,
    form,
    isSubmitting,
    isEdit,
    ready,
    buildPayload,
    errors,
  };
};
