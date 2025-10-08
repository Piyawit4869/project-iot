import React from "react";
import { Badge, Card } from "../ui";
import { GlobalImage } from "./global-image";
import { SelectorItemsModal } from "./modal/selector-items-modal";
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
  handleChangeItems: (productIds: string[]) => void;
}

export const CardSelectorItems: React.FC<CardSelectorItemsProps> = (
  props: CardSelectorItemsProps
) => {
  const {
    label,
    items,
    item,
    selectedItems,
    selectItemIds,
    labelButton,
    multiple = false,
    messageError = "",
    handleChangeItems,
  } = props;

  return (
    <Card className="p-6">
      <h2 className="text-[16px] mb-4">
        {label} <span className="text-red-500 text-sm">{messageError} </span>
      </h2>
      {item && (
        <div className="flex flex-row items-center gap-4 mb-4">
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

      {selectedItems && selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedItems.map((selectedItem: Item) => (
            <Badge key={selectedItem && selectedItem.id} variant="secondary">
              {selectedItem && selectedItem.name}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-12">
        <SelectorItemsModal
          multiple={multiple ?? false}
          label={labelButton ?? "เลือกสินค้า"}
          items={items}
          selected={selectItemIds}
          onChange={handleChangeItems}
        />
      </div>
    </Card>
  );
};
