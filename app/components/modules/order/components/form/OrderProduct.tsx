import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useProducts } from "~/api/client/product/useProductQuery";
import { Form } from "~/components/ui/form";
import { CardSelectorItems } from "./order-card-selector-items";

interface ProductColumn {
  id: string;
  name: string;
  sku: string;
  imageUrl?: string;
  description: string;
  salePrice: number;
  matType: string;
  status: string;
  wht: number;
  discountPrice: number;
  vatPrice: number;
  costPrice: number;
  quantity: number;
  active: boolean;
}

interface OrderProductProps {
  selectedProducts: ProductColumn[];
  onAddProduct: (products: ProductColumn[]) => void;
}

interface YourFormDataType {
  product: {
    [id: string]: {
      name: string;
      price: number;
      description: string;
    };
  };
}

export const OrderProduct: React.FC<OrderProductProps> = ({
  onAddProduct,
  selectedProducts,
}) => {
  const { data: products = [], isLoading } = useProducts();
  const form = useForm<YourFormDataType>({ defaultValues: { product: {} } });

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
    selectedProducts.map((p) => p.id)
  );

  useEffect(() => {
    setSelectedProductIds(selectedProducts.map((p) => p.id));
  }, [selectedProducts]);

  const handleChangeItems = (ids: string[]) => {
    setSelectedProductIds(ids);

    const map = new Map(products.map((p: any) => [p.id, p]));
    const updatedSelected = ids
      .map((id) => map.get(id))
      .filter((p): p is ProductColumn => !!p);

    onAddProduct(updatedSelected);
  };

  return (
    <Form {...form}>
      <CardSelectorItems
        multiple
        label=""
        labelButton="เลือกสินค้า"
        items={products}
        isLoading={isLoading}
        selectedItems={selectedProducts}
        selectItemIds={selectedProductIds}
        handleChangeItems={handleChangeItems}
      />
    </Form>
  );
};
