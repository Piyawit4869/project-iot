import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import { useProductViewModel } from "~/hooks/products/viewmodels/useProductViewModel";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { IndexLayoutTableLoading } from "~/components/shared/index-table-loading";
import { FormProductNew } from "./form-product-new";
import { useEntityBreadcrumb } from "~/providers/RouteProvider";

export const EditProducts = () => {
  const {
    product,
    loading,
    form,
    inventories,
    categories,
    // materials,
    // attributes,
    // selections,
    isSubmitting,
    inventoriesSelected,
    selectedInventoryIds,
    selectedCategoryIds,
    categoriesSelected,
    // selectedMaterialIds,
    // materialsSelected,
    // selectedAttributeIds,
    // attributesSelected,
    // selectedSelectionIds,
    // selectionsSelected,
    handleChangeInventory,
    handleChangeCategory,
    // handleChangeMaterial,
    // handleChangeAttribute,
    // handleChangeSelection,
    actions: { onSubmit },
  } = useProductViewModel();

  useEntityBreadcrumb({
    feature: "product",
    entity: product
      ? { id: product.id, name: product?.name ?? product.id }
      : undefined,
    base: product && {
      href: `/products/${product?.id}`,
      label: product?.name,
      uuid: product?.id,
    },
  });

  return (
    <div className="flex-1 flex-col space-y-3 p-8 md:flex">
      {loading.product ? (
        <SkeletonLoading />
      ) : (
        <TabControl
          title={`${product?.name}`}
          backpath="/products"
          tag={{ label: "เปิดใช้งาน", variant: "success" }}
          buttons={[
            <GlobalButton
              label="ลบสินค้า"
              variant="outline"
              key={"delete button"}
              loading={isSubmitting}
              onClick={onSubmit.remove}
            />,
            <GlobalButton
              label="บันทึก"
              key={"create button"}
              type="submit"
              loading={isSubmitting}
              form="products"
            />,
          ]}
        />
      )}
      {loading.product ? (
        <IndexLayoutTableLoading />
      ) : (
        <FormProductNew
          form={form}
          handleChangeInventory={handleChangeInventory}
          onSubmit={onSubmit.update}
          selectedInventoryIds={selectedInventoryIds}
          categories={categories}
          selectedCategoryIds={selectedCategoryIds}
          categoriesSelected={categoriesSelected}
          handleChangeCategory={handleChangeCategory}
          // inventories={inventories}
          // inventoriesSelected={inventoriesSelected}
          // materials={materials}
          // selections={selections}
          // attributes={attributes}

          // selectedMaterialIds={selectedMaterialIds}
          // materialsSelected={materialsSelected}
          // handleChangeMaterial={handleChangeMaterial}
          // selectedAttributeIds={selectedAttributeIds}
          // attributesSelected={attributesSelected}
          // handleChangeAttribute={handleChangeAttribute}
          // selectedSelectionIds={selectedSelectionIds}
          // handleChangeSelection={handleChangeSelection}
          // selectionsSelected={selectionsSelected}
        />
      )}
    </div>
  );
};
