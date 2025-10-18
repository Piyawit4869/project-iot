import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router";

interface SortableHeaderProps {
  column: any;
  keys?: {
    sort?: string;
    order?: string;
    page?: string;
  };
}

export const SortableHeader = ({ column, keys }: SortableHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sp] = useSearchParams();

  const SORT_KEY = keys?.sort ?? "sortBy";
  const ORDER_KEY = keys?.order ?? "orderBy";
  const PAGE_KEY = keys?.page ?? "page";

  const title =
    typeof column.columnDef.header === "function"
      ? column.columnDef.header({ column })
      : column.columnDef.header;

  const isSorted = column.getIsSorted(); // "asc" | "desc" | false
  const columnId = column.id ?? column.columnDef?.id ?? String(title);

  const applyUrlSorting = (nextOrder: "asc" | "desc" | null) => {
    const next = new URLSearchParams(sp);

    next.set(PAGE_KEY, "1");

    if (nextOrder) {
      next.set(SORT_KEY, columnId);
      next.set(ORDER_KEY, nextOrder);
    } else {
      next.delete(SORT_KEY);
      next.delete(ORDER_KEY);
    }

    navigate(
      { pathname: location.pathname, search: next.toString() },
      { replace: true, preventScrollReset: true }
    );
  };

  const handleClick = () => {
    if (isSorted === false) {
      // none -> asc
      column.toggleSorting(false);
      applyUrlSorting("asc");
    } else if (isSorted === "asc") {
      // asc -> desc
      column.toggleSorting(true);
      applyUrlSorting("desc");
    } else {
      // desc -> none
      column.clearSorting();
      applyUrlSorting(null);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="flex items-center cursor-pointer select-none"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Sort by ${String(title)}${isSorted ? ` (${isSorted})` : ""}`}
    >
      <span>{title}</span>

      {isSorted === false && (
        <ArrowUpDown className="ml-2 h-3 w-3 opacity-60" />
      )}
      {isSorted === "asc" && <ArrowDown className="ml-2 h-3 w-3 opacity-70" />}
      {isSorted === "desc" && <ArrowUp className="ml-2 h-3 w-3 opacity-70" />}
    </div>
  );
};
