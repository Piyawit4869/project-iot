import { useInventory } from "~/api/client/inventories/useInventoryQuery";

export const useInventoryFetch = (slug: string) => {
  const inventory = useInventory(slug);

  return {
    inventory: inventory.data,
    loading: {
      inventory: inventory.isLoading,
    },
  };
};
