import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import { useProductViewModel } from "~/hooks/products/viewmodels/useProductViewModel";
import { IndexLayoutTableLoading } from "~/components/shared/index-table-loading";
import { FormProductNew } from "./form-product-new";

export const CreateProducts = () => {
  const {
    loading,
    form,
    inventories,
    categories,
    isSubmitting,
    inventoriesSelected,
    selectedInventoryIds,
    selectedCategoryIds,
    categoriesSelected,
    handleChangeInventory,
    handleChangeCategory,
    actions: { onSubmit },

    // materials,
    // attributes,
    // selections,

    // selectedMaterialIds,
    // materialsSelected,
    // selectedAttributeIds,
    // attributesSelected,
    // selectedSelectionIds,
    // selectionsSelected,

    // handleChangeMaterial,
    // handleChangeAttribute,
    // handleChangeSelection,
  } = useProductViewModel();

  return (
    <div className="flex-1 flex-col space-y-3 p-8 md:flex">
      <TabControl
        title={"เพิ่มสินค้า"}
        backpath="/products"
        buttons={[
          <GlobalButton
            label="สร้าง"
            key={"create button"}
            type="submit"
            loading={isSubmitting}
            form="products"
          />,
        ]}
      />
      {loading.product ? (
        <IndexLayoutTableLoading />
      ) : (
        <FormProductNew
          form={form}
          handleChangeInventory={handleChangeInventory}
          onSubmit={onSubmit.create}
          selectedInventoryIds={selectedInventoryIds}
          categories={categories}
          selectedCategoryIds={selectedCategoryIds}
          categoriesSelected={categoriesSelected}
          handleChangeCategory={handleChangeCategory}
          // selections={selections}

          // selectedMaterialIds={selectedMaterialIds}
          // handleChangeMaterial={handleChangeMaterial}
          // selectedAttributeIds={selectedAttributeIds}
          // handleChangeAttribute={handleChangeAttribute}
          // selectedSelectionIds={selectedSelectionIds}
          // handleChangeSelection={handleChangeSelection}
          // selectionsSelected={selectionsSelected}

          // inventories={inventories}
          // inventoriesSelected={inventoriesSelected}
          // materials={materials}
          // attributes={attributes}
          // materialsSelected={materialsSelected}
          // attributesSelected={attributesSelected}
        />
      )}
    </div>
  );
};
