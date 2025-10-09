import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm, type Resolver } from "react-hook-form";
import { useInventoryFetch } from "./useInventoryFetch";
import {
  InventoryCreateSchema,
  type InventoryCreateDTO,
} from "~/schemas/product/detail/InventorySchema";

/**
 * เพิ่ม id?: string เข้าไปในฟอร์ม เพื่อพก id ในโหมดแก้ไข
 */
type InventoryForm = InventoryCreateDTO & { id?: string };

export const useFormInventorySetup = (slug: string) => {
  const fetch = useInventoryFetch(slug);
  const { inventory, isLoading } = fetch as {
    inventory?: {
      id?: string;
      active?: boolean;
      name?: string;
      description?: string;
      capacity?: string;
    };
    isLoading?: boolean;
  };

  const form = useForm<InventoryForm>({
    resolver: zodResolver(InventoryCreateSchema) as Resolver<InventoryForm>,
    defaultValues: {
      id: undefined,
      active: true,
      name: "",
      description: "",
      capacity: "",
    },
  });

  React.useEffect(() => {
    if (inventory) {
      form.reset({
        id: inventory.id ?? undefined,
        active: inventory.active ?? true,
        name: inventory.name ?? "",
        description: inventory.description ?? "",
        capacity: inventory.capacity ?? "",
      });
    } else {
      form.reset({
        id: undefined,
        active: true,
        name: "",
        description: "",
        capacity: "",
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
