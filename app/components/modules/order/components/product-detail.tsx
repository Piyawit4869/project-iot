import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { ProductType } from "~/schemas/order/order";
import { Coins, Percent, Receipt, ShoppingCart } from "lucide-react";
import type { ProductColumn } from "~/schemas/order/type";

export function DetailProduct({ products }: { products: ProductColumn[] }) {
  return (
    <div className="gap-4 mt-3">
      <div className="flex flex-col gap-2">
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
                products &&
                products.length &&
                products?.find((prod: ProductType) => prod.id === p?.id);
              const fallbackImage =
                "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(p?.name ?? "image");

              const price = p?.costPrice ?? 0;
              const totalPrice = price * (p.quantity ?? 1);

              return (
                <div>
                  <div
                    key={p.id}
                    className="grid grid-cols-[1fr_150px_100px_120px] items-center"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={p?.imageUrl || fallbackImage}
                        alt={p?.name || "Unknown Product"}
                        className="w-16 h-16 rounded-md object-cover border border-gray-200"
                      />
                      <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {p?.name || "Unknown Product"}
                        </h3>
                        <p className="text-xs text-gray-500">{p?.sku}</p>
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
                      <span className="w-6 text-center text-sm">
                        {p.quantity}
                      </span>
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
