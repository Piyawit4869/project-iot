// import { ColumnDef } from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

interface SortableHeaderProps {
  column: any;
}

export const SortableHeader = ({ column }: SortableHeaderProps) => {
  const title =
    typeof column.columnDef.header === "function"
      ? column.columnDef.header({ column })
      : column.columnDef.header;

  const isSorted = column.getIsSorted();

  return (
    <div
      className="flex items-center cursor-pointer select-none"
      onClick={() => column.toggleSorting(isSorted === "asc")}
    >
      <span>{title}</span>
      {!isSorted ? (
        <ArrowUpDown className="ml-2 h-3 w-3" color="#737373" />
      ) : null}

      {isSorted ? (
        <span>
          {isSorted === "asc" ? (
            <ArrowDown className="ml-2 h-3 w-3" color="#737373" />
          ) : (
            <ArrowUp className="ml-2 h-3 w-3" color="#737373" />
          )}
        </span>
      ) : null}
    </div>
  );
};
