"use client";

import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import GlobalButton from "~/components/shared/global-button";
import { formatForNumber } from "~/components/shared/global-format";

interface ModalCalculateProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  discountPerItem: number;
  setDiscountPerItem: React.Dispatch<React.SetStateAction<number>>;
  totalDiscount: number;
  setTotalDiscount: React.Dispatch<React.SetStateAction<number>>;
  finalPricePerItem: number;
  setFinalPricePerItem: React.Dispatch<React.SetStateAction<number>>;
  finalTotalPrice: number;
  setFinalTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  discountRules: any;
}

interface DiscountRule {
  minQty: number;
  discount: number;
}
export function ModalCalculate({
  quantity,
  setQuantity,
  price,
  setPrice,
  discountPerItem,
  setDiscountPerItem,
  totalDiscount,
  setTotalDiscount,
  finalPricePerItem,
  setFinalPricePerItem,
  finalTotalPrice,
  setFinalTotalPrice,
  discountRules,
}: ModalCalculateProps) {
  const handleCalculate = () => {
    if (!quantity || !price) {
      setDiscountPerItem(0);
      setTotalDiscount(0);
      setFinalPricePerItem(0);
      setFinalTotalPrice(0);
      return;
    }

    const matchedRule = discountRules
      .filter((rule: DiscountRule) => quantity >= rule.minQty)
      .sort((a: DiscountRule, b: DiscountRule) => b.minQty - a.minQty)[0];
    const discount = matchedRule ? matchedRule.discount : 0;
    const perItemDiscount = discount;
    const totalDiscountCalc = perItemDiscount * quantity;
    const finalPerItem = price - perItemDiscount;
    const totalPrice = finalPerItem * quantity;

    setDiscountPerItem(perItemDiscount);
    setTotalDiscount(totalDiscountCalc);
    setFinalPricePerItem(finalPerItem);
    setFinalTotalPrice(totalPrice);
  };

  return (
    <DialogContent className="max-w-none min-w-[50vw]">
      <DialogHeader>
        <DialogTitle className="flex flex-row gap-3">
          <Calculator /> <span className="mt-1">คำนวณส่วนลด</span>
        </DialogTitle>
      </DialogHeader>

      <div className="flex flex-row gap-4">
        <Card className="w-full">
          <CardContent>
            <div className="grid gap-3">
              <span>จำนวนสินค้า</span>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="กรอกจำนวนสินค้า"
              />
              <span>ราคาสินค้าต่อชิ้น</span>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="กรอกราคาสินค้า"
              />
            </div>

            <GlobalButton
              label="คำนวณ"
              className="mt-5"
              onClick={handleCalculate}
            />
          </CardContent>
        </Card>

        <Card className="w-full ">
          <CardContent>
            <div className="grid gap-4">
              <span className="font-semibold">ผลการคำนวณ</span>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span>ส่วนลดต่อชิ้น</span>
                  <span>฿{formatForNumber(discountPerItem)}</span>
                </div>
                <div className="flex flex-col text-left">
                  <span>ส่วนลดรวมทั้งหมด</span>
                  <span>฿{formatForNumber(totalDiscount)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <Card className="p-3 bg-[#F0EEF7] text-center">
                  <div className="flex flex-col">
                    <span>ราคาสินค้าต่อชิ้น</span>
                    <span className="text-lg font-extrabold">
                      ฿{formatForNumber(finalPricePerItem)}
                    </span>
                  </div>
                </Card>
                <Card className="p-3 bg-[#B3A9D6]">
                  <div className="flex flex-col text-center">
                    <span>ราคาสินค้ารวมทั้งหมด</span>
                    <span className="text-lg font-extrabold">
                      ฿{formatForNumber(finalTotalPrice)}
                    </span>
                  </div>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  );
}
