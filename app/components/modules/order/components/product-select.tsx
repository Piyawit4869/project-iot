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
import { Coins, Percent, Receipt, ShoppingCart, Trash2 } from "lucide-react";
import type { ProductColumn } from "~/schemas/order/type";
import { GlobalImage } from "~/components/shared/global-image";
import { calculateTotals } from "./order-function";
import { formatNumber } from "~/components/shared/global-format";
import type { Product } from "~/schemas/product/product";

type ProductOption = {
  id: string;
  name: string;
  label: string;
  value: string;
};

export function ListProduct({
  products,
  productDetails,
  onChangeProducts,
}: {
  productDetails: ProductColumn[];
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

  // ❗ formOrder ใช้แค่ฟิลด์อื่น ๆ — ไม่ใช้ควบคุม products
  const formOrder = useForm<any>({
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
        products: [], // ใช้เก็บเฉย ๆ ถ้าต้อง submit form
      },
    },
  });

  const displayProducts =
    (productDetails?.length ?? 0) > 0 ? productDetails : products;
  /** ------------------------------
   *  แก้ตรงนี้เต็มๆ → updateQuantity ใช้ products (props)
   *  ------------------------------ */
  const updateQuantity = (index: number, newQty: number) => {
    const qty = Math.max(1, newQty);

    const updatedProducts = products.map((product, idx) => {
      if (idx === index) return { ...product, quantity: qty };
      return product;
    });

    // อัปเดต UI
    onChangeProducts(updatedProducts);

    // sync ไป form ถ้าต้องใช้ตอน submit
    formOrder.setValue("orderDetail.products", updatedProducts);
  };

  const handleRemove = (index: number) => {
    const updated = products.filter((_, i) => i !== index);
    onChangeProducts(updated);
    formOrder.setValue("orderDetail.products", updated);
  };

  const handleSelectProduct = (productId: string) => {
    const productDetail = getProducts?.find(
      (prod: ProductType) => prod.id === productId
    );

    const idx = products.findIndex((prod) => prod.id === productId);

    if (idx === -1) {
      const added = [
        ...products,
        {
          ...productDetail,
          id: productId,
          quantity: 1,
        },
      ];
      onChangeProducts(added);
      formOrder.setValue("orderDetail.products", added);
      return;
    }

    const updatedProducts = products.map((p, index) =>
      index === idx ? { ...p, quantity: p.quantity + 1 } : p
    );

    onChangeProducts(updatedProducts);
    formOrder.setValue("orderDetail.products", updatedProducts);
  };

  // const discountPrice = products.reduce((sum, p) => sum + p.discountPrice, 0);

  return (
    <div className="gap-4">
      <div className="flex flex-col gap-2">
        {!productDetails && (
          <>
            <Label className="font-semibold">เลือกรายการสินค้า</Label>
            <SingleSelectOnModalProduct
              options={productOptions}
              onChange={(productId) => handleSelectProduct(productId)}
            />
          </>
        )}

        {displayProducts.length > 0 && (
          <>
            <div className={productDetails ? "productDetails" : "mt-6"}>
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

              <div className="mt-6 flex flex-col gap-4 overflow-y-auto">
                {displayProducts.map((p, i) => {
                  const prod =
                    getProducts?.find(
                      (prod: ProductType) => prod.id === p.id
                    ) ?? null;

                  const price = prod?.salePrice ?? 0;
                  const totalPrice = price * (p.quantity ?? 1);

                  return (
                    <div key={p.id}>
                      <div className="grid grid-cols-[1fr_150px_100px_120px] items-center">
                        <div className="flex items-center gap-4">
                          <GlobalImage
                            src={
                              prod?.imageUrl ||
                              "https://ui-avatars.com/api/?name=" +
                                encodeURIComponent(prod?.name ?? "image")
                            }
                            alt={prod?.name ?? "Unknown"}
                            className="w-16 h-16 rounded-md object-cover border border-gray-200"
                          />

                          <div className="flex flex-col">
                            <h3 className="text-sm font-semibold text-gray-900">
                              {prod?.name ?? "Unknown Product"}
                            </h3>
                            <p className="text-xs text-gray-500">{prod?.sku}</p>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center justify-center gap-2 ml-4">
                          {!productDetails && (
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(i, (p.quantity ?? 1) - 1)
                              }
                              className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300"
                            >
                              –
                            </button>
                          )}

                          {productDetails ? (
                            <span>{p.quantity}</span>
                          ) : (
                            <input
                              type="number"
                              value={p.quantity ?? 1}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                updateQuantity(i, value <= 0 ? 1 : value);
                              }}
                              className="
                              w-10 text-center text-sm border rounded-md h-9
                              focus:outline-none focus:ring-2 focus:ring-primary
                            "
                            />
                          )}

                          {!productDetails && (
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(i, (p.quantity ?? 1) + 1)
                              }
                              className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300"
                            >
                              +
                            </button>
                          )}
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

                      {!productDetails && (
                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => handleRemove(i)}
                            className="flex text-red-500 text-sm hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-1.5" />
                            ลบ
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <hr />
          </>
        )}
      </div>
    </div>
  );
}
