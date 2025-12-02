import * as React from "react";
import { Label } from "~/components/ui/label";
import { useForm } from "react-hook-form";
import { useGetProducts } from "~/api/client/product/useProductQuery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { CreateCRUDOrderInput, ProductType } from "~/schemas/order/order";
import { SingleSelectOnModalProduct } from "../../message";
import { Coins, Percent, Receipt, ShoppingCart } from "lucide-react";
import type { ProductColumn } from "~/schemas/order/type";

type ProductOption = {
  id: string;
  name: string;
  label: string;
  value: string;
};

export function ListProduct({
  products,
  onChangeProducts,
}: {
  products: ProductColumn[];
  onChangeProducts: (items: ProductColumn[]) => void;
}) {
  const { data: getProducts, isLoading } = useGetProducts();

  const productOptions: ProductOption[] = React.useMemo(() => {
    if (!getProducts) return [];
    return getProducts.map((p: ProductType) => ({
      id: p.id,
      name: p.name,
      label: p.name,
      value: p.id,
      imageUrl: p.imageUrl,
      quantity: p.quantity,
      sku: p.sku,
      price: p.price,
    }));
  }, [getProducts]);

  // const toggleAddOn = (addon: string) => {
  //   const newAddOns = order.addOns.includes(addon)
  //     ? order.addOns.filter((a) => a !== addon)
  //     : [...order.addOns, addon];
  //   setOrder({ ...order, addOns: newAddOns });
  // };

  const formOrder = useForm<CreateCRUDOrderInput>({
    mode: "onSubmit",
    defaultValues: {
      active: true,
      docNo: "123",
      docName: "example doc",
      branchId: "",
      notationType: "quotation",
      startDate: new Date().toISOString(),
      discount: 0,
      vat: 0,
      wht: 0,
      customerId: "",
      orderDetail: {
        products: [],
      },
    },
  });

  const updateQuantity = (index: number, newQty: number) => {
    const qty = Math.max(1, newQty);
    const currentProducts = formOrder.getValues("orderDetail.products");

    const updatedProducts = currentProducts.map((product, idx) => {
      if (idx === index) {
        return { ...product, quantity: qty };
      }
      return product;
    });

    // onChangeProducts(updatedProducts);
    formOrder.setValue("orderDetail.products", updatedProducts);
  };

  const handleRemove = (index: number) => {
    const updated = products.filter((_, i) => i !== index);
    onChangeProducts(updated);
    // formOrder.setValue("orderDetail.products", updated);
  };

  const handleSelectProduct = (productId: string) => {
    const productDetail = getProducts?.find(
      (prod: ProductType) => prod.id === productId
    );

    const idxProductInCart = products.findIndex(
      (prod) => prod.id === productId
    );
    if (idxProductInCart === -1) {
      const cartItems = [
        ...products,
        {
          ...productDetail,
          id: productId,
          quantity: 1,
        },
      ];
      onChangeProducts(cartItems);
      formOrder.setValue("orderDetail.products", cartItems);
      return;
    }

    const updatedProducts = products.map((p, index) =>
      index === idxProductInCart ? { ...p, quantity: p.quantity + 1 } : p
    );
    onChangeProducts(updatedProducts);
    // formOrder.setValue("orderDetail.products", updatedProducts);
  };

  // React.useEffect(() => {
  //   if (products && products.length) {
  //     formOrder.setValue("orderDetail.products", products);
  //   }
  // }, [products, formOrder]);

  return (
    <div className="gap-4 mt-3">
      <div className="flex flex-col gap-2">
        <Label className="font-semibold">เลือกรายการสินค้า</Label>

        <SingleSelectOnModalProduct
          options={productOptions}
          onChange={(productId) => {
            handleSelectProduct(productId);
          }}
        />

        <div className="mt-6">
          <div className="grid grid-cols-[1fr_150px_100px_120px] items-center border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-700">
              รายละเอียดสินค้า
            </span>
            <span className="text-sm font-semibold text-gray-700 text-center">
              จำนวน
            </span>
            <span className="text-sm font-semibold text-gray-700 text-center">
              ราคา
            </span>
            <span className="text-sm font-semibold text-gray-700 text-center">
              ราคารวม
            </span>
          </div>

          {/* List of product cards with quantity input */}
          <div className="mt-6 flex flex-col gap-4 overflow-y-auto">
            {products.map((p, i) => {
              const productDetails =
                getProducts &&
                getProducts.length &&
                getProducts?.find((prod: ProductType) => prod.id === p?.id);
              const fallbackImage =
                "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(productDetails?.name ?? "image");

              const price = productDetails?.price ?? 0;
              const totalPrice = price * (p.quantity ?? 1);

              return (
                <div>
                  <div
                    key={p.id}
                    className="grid grid-cols-[1fr_150px_100px_120px] items-center"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={productDetails?.imageUrl || fallbackImage}
                        alt={productDetails?.name || "Unknown Product"}
                        className="w-16 h-16 rounded-md object-cover border border-gray-200"
                      />
                      <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {productDetails?.name || "Unknown Product"}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {productDetails?.sku}
                        </p>
                        <div className="mt-1">
                          <Select>
                            <SelectTrigger className="">
                              <SelectValue placeholder="ดำ, S" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectItem key="test" value="test">
                                ดำ, S
                              </SelectItem>
                              <SelectItem key="test2" value="test2">
                                ขาว, M
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(i, (p.quantity ?? 1) - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300"
                      >
                        –
                      </button>
                      <span className="w-6 text-center text-sm">
                        {p.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(i, (p.quantity ?? 1) + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-sm text-center text-gray-800">
                      {price} ฿
                    </div>
                    <div className="flex flex-col items-center justify-end gap-3">
                      <span className="text-sm font-semibold text-gray-900">
                        {totalPrice} ฿
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => handleRemove(i)}
                      className="flex text-red-500 text-sm hover:text-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22m-5-4H6a2 2 0 00-2 2v2h16V5a2 2 0 00-2-2z"
                        />
                      </svg>
                      ลบ
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <hr />

        <div className="p-4 mt-3 w-full rounded-2xl bg-gray-50 shadow-inner">
          <h3 className="font-semibold text-lg mb-4">สรุปราคาสินค้า</h3>

          <div className="flex justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-gray-500" />
              <span>จำนวนสินค้า :</span>
            </div>
            <span>
              {/* {(quantities || []).reduce((sum, q) => sum + q.quantity, 0)}{" "} */}
              ชิ้น
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-gray-500" />
              <span>ราคารวมสินค้า :</span>
            </div>
            {/* <span>{formatNumber(Price)} บาท</span> */}
            <span>บาท</span>
          </div>

          <div className="flex justify-between mb-3">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-gray-500" />
              <span>ส่วนลด : </span>
            </div>
            <span>บาท</span>
            {/* <span>{formatNumber(discount)} บาท</span> */}
          </div>

          <div className="flex justify-between mb-3">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-gray-500" />
              <span>ภาษีมูลค่าเพิ่ม : </span>
            </div>
            <span>
              {/* <span>{formatNumber(totalVat)} บาท</span> */}
              <span>%</span>
            </span>
          </div>

          <div className="flex justify-between font-bold text-lg mb-3">
            <div className="flex items-center gap-2">
              <span>ยอดรวม : </span>
            </div>
            <span>บาท</span>
            {/* <span>{formatNumber(totalAddVat)} บาท</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
