import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import { useProductViewModel } from "~/hooks/products/viewmodels/useProductViewModel";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { IndexLayoutTableLoading } from "~/components/shared/index-table-loading";
import { FormProductNew } from "./form-product-new";
import { useEntityBreadcrumb } from "~/providers/RouteProvider";
import React from "react";
import { Save, Trash2, X } from "lucide-react";

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

  const [isEdit, setIsEdit] = React.useState(false);

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
            isEdit ? (
              <div className="w-full flex flex-row gap-3">
                <GlobalButton
                  type="button"
                  key={"delete button"}
                  variant="outline"
                  className="flex-1   flex items-center gap-1 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
                  icon={<Trash2 />}
                  loading={isSubmitting}
                  onClick={onSubmit.remove}
                  label={<span className="hidden sm:inline">ลบสินค้า</span>}
                />

                <GlobalButton
                  type="button"
                  key={"cancle button"}
                  variant="outline"
                  className="flex-1 bg-[#EF4343] text-white hover:bg-[#d73232] flex items-center gap-1   text-xs sm:px-4 sm:py-2 sm:text-sm dark:bg-[#ea5e5e]  dark:hover:bg-[#d73232]"
                  icon={<X />}
                  onClick={() => setIsEdit(false)}
                  label={<span className="hidden sm:inline">ยกเลิก</span>}
                />

                <GlobalButton
                  icon={<Save />}
                  label={<span className="hidden sm:inline">บันทึกสินค้า</span>}
                  key={"create button"}
                  type="submit"
                  loading={isSubmitting}
                  className="flex-1  flex items-center gap-1 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm dark:disabled:bg-transparent dark:disabled:text-white dark:disabled:border-white  dark:disabled:border-1"
                  form="products"
                />
              </div>
            ) : (
              <GlobalButton
                label="แก้ไข"
                key="update-button"
                type="button"
                onClick={() => setIsEdit(true)}
              />
            ),
          ]}
        />
      )}
      {loading.product ? (
        <IndexLayoutTableLoading />
      ) : (
        <FormProductNew
          form={form}
          isEdit={isEdit}
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
