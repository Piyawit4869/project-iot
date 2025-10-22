import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { useProductFetch } from "./useProductFetch";
import React from "react";

// import { useMaterials } from "@/hooks/queries/useMaterialQuery";
// import { useAttributes } from "@/hooks/queries/useAttributeQuery";
// import { useSelections } from "@/hooks/queries/useSelectionQuery";

// import { Material } from "@/apis/data/material/MaterialSchema";
// import { Attribute } from "@/apis/data/attribute/AttributeSchema";
// import { Selection } from "@/apis/data/selection/SelectionSchema";
import {
  ProductCreateSchema,
  type ProductCreateDTO,
} from "~/schemas/product/product";
import type { Inventory } from "~/schemas/product/detail/InventorySchema";
import type { Category } from "~/schemas/product/detail/CategorySchema";
import { useInventories } from "~/api/client/inventories/useInventoryQuery";
import { useCategories } from "~/api/client/categories/useCategoryQuery";

export const useFormProductSetup = (id: string) => {
  const { data: inventories } = useInventories();
  const { data: categories } = useCategories();
  const inventoriesSafe = Array.isArray(inventories) ? inventories : [];
  const categoriesSafe = Array.isArray(categories) ? categories : [];

  // const { data: materials } = useMaterials();
  // const { data: attributes } = useAttributes();
  // const { data: selections } = useSelections();

  const fetch = useProductFetch(id);
  const { product: data } = fetch;

  const [selectedInventoryIds, setSelectedInventoryIds] = React.useState<
    string[]
  >([]);
  const [inventoriesSelected, setInventoriesSelected] = React.useState<
    Inventory[]
  >([]);

  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState<
    string[]
  >([]);
  const [categoriesSelected, setCategoriesSelected] = React.useState<
    Category[]
  >([]);

  // const [selectedMaterialIds, setSelectedMaterialIds] = React.useState<
  //   string[]
  // >([]);
  // const [materialsSelected, setMaterialsSelected] = React.useState<Material[]>(
  //   []
  // );

  // const [selectedAttributeIds, setSelectedAttributeIds] = React.useState<
  //   string[]
  // >([]);
  // const [attributesSelected, setAttributesSelected] = React.useState<
  //   Attribute[]
  // >([]);
  // const [selectedSelectionIds, setSelectedSelectionIds] = React.useState<
  //   string[]
  // >([]);
  // const [selectionsSelected, setSelectionsSelected] = React.useState<
  //   Selection[]
  // >([]);

  const form = useForm<ProductCreateDTO>({
    resolver: zodResolver(ProductCreateSchema) as Resolver<ProductCreateDTO>,
    values: {
      unit: "kilogram",
      imageUrls: [],
    } as unknown as ProductCreateDTO,
  });

  const { isSubmitting } = form.formState;

  const handleChangeInventory = (inventoryIds: string[]) => {
    setSelectedInventoryIds(inventoryIds);
    form.setValue("inventoryId", inventoryIds.join(","));

    form.clearErrors("inventoryId");
    setInventoriesSelected(
      inventoriesSafe.filter((inv: Inventory) =>
        inventoryIds.includes(inv.id ?? "")
      )
    );
  };

  const handleChangeCategory = (categoryIds: string[]) => {
    setSelectedCategoryIds(categoryIds);
    form.setValue(
      "categories",
      categoryIds.map((id) => ({ id, custom: false }))
    );
    setCategoriesSelected(
      categoriesSafe.filter((cat: Category) =>
        categoryIds.includes(cat.id ?? "")
      )
    );
  };

  // const handleChangeMaterial = (materialIds: string[]) => {
  //   setSelectedMaterialIds(materialIds);
  //   form.setValue(
  //     "materials",
  //     materialIds.map((id) => ({ id, custom: false }))
  //   );
  //   setMaterialsSelected(
  //     materials.filter((mat: Material) => materialIds.includes(mat.id ?? ""))
  //   );
  // };

  // const handleChangeAttribute = (attributeIds: string[]) => {
  //   setSelectedAttributeIds(attributeIds);
  //   form.setValue(
  //     "attributes",
  //     attributeIds.map((id) => ({ id, custom: false }))
  //   );
  //   setAttributesSelected(
  //     attributes.filter((attr: Attribute) =>
  //       attributeIds.includes(attr.id ?? "")
  //     )
  //   );
  // };

  // const handleChangeSelection = (selectionIds: string[]) => {
  //   setSelectedSelectionIds(selectionIds);
  //   form.setValue(
  //     "selections",
  //     selectionIds.map((id) => ({ id, custom: false }))
  //   );
  //   setSelectionsSelected(
  //     selections.filter((sel: Selection) => selectionIds.includes(sel.id ?? ""))
  //   );
  // };

  React.useEffect(() => {
    if (data?.inventoryId) {
      const inventoryIds = [data.inventoryId];
      setSelectedInventoryIds(inventoryIds);
      form.setValue("inventoryId", inventoryIds.join(","));
      setInventoriesSelected(
        inventoriesSafe.filter((inv: Inventory) =>
          inventoryIds.includes(inv.id ?? "")
        )
      );
    }

    if (data?.categories?.length) {
      const categoryIds = data.categories.map((cat: Category) => cat.id);
      setSelectedCategoryIds(categoryIds);
      form.setValue("categories", data.categories);
      setCategoriesSelected(
        categoriesSafe.filter((cat: Category) =>
          categoryIds.includes(cat.id ?? "")
        )
      );
    }
    // if (data?.materials?.length) {
    //   const materialIds = data.materials.map((mat: Material) => mat.id);
    //   setSelectedMaterialIds(materialIds);
    //   form.setValue("materials", data.materials);
    //   setMaterialsSelected(
    //     materials.filter((mat: Material) => materialIds.includes(mat.id ?? ""))
    //   );
    // }
    // if (data?.attributes?.length) {
    //   const attributeIds = data.attributes.map((attr: Attribute) => attr.id);
    //   setSelectedAttributeIds(attributeIds);
    //   form.setValue("attributes", data.attributes);
    //   setAttributesSelected(
    //     attributes.filter((attr: Attribute) =>
    //       attributeIds.includes(attr.id ?? "")
    //     )
    //   );
    // }
    // if (data?.selections?.length) {
    //   const selectionIds = data.selections.map((sel: Selection) => sel.id);
    //   setSelectedSelectionIds(selectionIds);
    //   form.setValue("selections", data.selections);
    //   setSelectionsSelected(
    //     selections.filter((sel: Selection) =>
    //       selectionIds.includes(sel.id ?? "")
    //     )
    //   );
    // }

    if (data) {
      form.reset({
        id: data?.id ?? "",
        name: data.name ?? "",
        quantity: data.quantity ?? "0",
        sku: data.sku ?? "",
        matType: data.matType ?? "non_material",
        status: data.status ?? "active",
        vatPrice: data.vatPrice ?? 0,
        salePrice: data.salePrice ?? 0,
        costPrice: data.costPrice ?? 0,
        discountPrice: data.discountPrice ?? 0,
        productCategory: data.discountPrice ?? "",
        imageUrl: data.imageUrl ?? "",
        description: data.description ?? "",
        refCode: data.refCode ?? "",
        active: data.active ?? true,
      });
    } else {
      form.reset({
        name: "",
        quantity: "",
        sku: "",
        matType: "non_material",
        status: "available",
        discountPrice: "0",
        productCategory: "",
        vatPrice: "0",
        salePrice: "",
        costPrice: "",
        imageUrl: "",
        description: "",
        refCode: "",
        active: true,
      } as unknown as ProductCreateDTO);
    }

    //  if (data) {
    //    form.reset({
    //      id: data.id ?? "",
    //      name: data.name ?? "",
    //      sku: data.sku ?? "",
    //      status: data.status ?? "active",
    //      description: data.description ?? "",
    //      imageUrl: data.imageUrl ?? "",
    //      imageUrls: data.imageUrls ?? [],
    //      salePrice: data.salePrice ?? 0,
    //      compareAtPrice: data.compareAtPrice ?? 0,
    //      costPrice: data.costPrice ?? 0,
    //      discountPrice: data.discountPrice ?? 0,
    //      vatPrice: data.vatPrice ?? 0,
    //      availableForSale: data.availableForSale ?? 0,
    //      weight: data.weight ?? 0,
    //      unit: data.unit ?? "kilogram",
    //      matType: data.matType ?? "non_material",
    //      productCategory: data.productCategory ?? "",
    //      categories: data.categories ?? [],
    //      options: data.options ?? [],
    //      variants: data.variants ?? [],
    //      active: data.active ?? true,
    //    } as unknown as ProductCreateDTO);
    //  } else {
    //    form.reset({
    //      name: "",
    //      sku: "",
    //      status: "active",
    //      description: "",
    //      imageUrl: "",
    //      imageUrls: [],
    //      salePrice: 0,
    //      compareAtPrice: 0,
    //      costPrice: 0,
    //      discountPrice: 0,
    //      vatPrice: 0,
    //      availableForSale: 0,
    //      weight: 0,
    //      unit: "kilogram",
    //      matType: "non_material",
    //      productCategory: "",
    //      categories: [],
    //      options: [],
    //      variants: [],
    //      active: true,
    //    } as unknown as ProductCreateDTO);
    //  }
  }, [
    form,
    data,
    inventories,
    // attributes,
    categories,
    // materials,
    // selections
  ]);

  return {
    ...fetch,
    inventories: inventories?.length ? inventories : [],
    categories: categories?.length ? categories : [],
    // materials: materials?.length ? materials : [],
    // attributes: attributes?.length ? attributes : [],
    // selections: selections?.length ? selections : [],
    selectedInventoryIds,
    inventoriesSelected,
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
    form,
    isSubmitting,
  };
};
