import React from "react";
import { Badge } from "../ui";
import { GlobalImage } from "./global-image";
import { SelectorItemsModal } from "../modules/order/components/form/selector-items-modal";
import { Item } from "@/types/global";

interface CardSelectorItemsProps {
  multiple?: boolean;
  item?: Item;
  selectedItems?: Item[];
  label: string;
  items: Item[];
  labelButton?: string;
  selectItemIds: string[];
  messageError?: string;
  isLoading?: boolean;
  handleChangeItems: (productIds: string[]) => void;
}

export const CardSelectorItems: React.FC<CardSelectorItemsProps> = (
  props: CardSelectorItemsProps
) => {
  const {
    label,
    items,
    item,
    selectItemIds,
    labelButton,
    isLoading,
    multiple = false,
    messageError = "",
    handleChangeItems,
  } = props;

  return (
    <div>
      <h2 className="text-lg font-semibold">
        {label} <span className="text-red-500 text-sm">{messageError} </span>
      </h2>
      {item && (
        <div className="flex flex-row items-center gap-4">
          <GlobalImage
            src={item?.imageUrl || ""}
            alt="user-image"
            width={60}
            height={60}
            className="rounded-xl w-[60px] h-[60px] object-cover object-center"
          />
          <div className="flex flex-col gap-1">
            <span className="text-md font-bold">{item.name}</span>
            <Badge
              variant="outline"
              className={
                item.status
                  ? "bg-green-400 text-white font-bold"
                  : "bg-red-500 text-white font-bold"
              }
            >
              {item.status ? item.status : "Inactive"}
            </Badge>
          </div>
        </div>
      )}

      <div className="flex justify-center ">
        <SelectorItemsModal
          multiple={multiple}
          label={labelButton ?? "เลือกสินค้า"}
          items={items}
          isLoading={isLoading}
          selected={selectItemIds}
          onChange={handleChangeItems}
        />
      </div>
    </div>
  );
};
