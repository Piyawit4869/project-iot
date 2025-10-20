"use client";

import * as React from "react";
import { Search, TextSearch, X } from "lucide-react";
import type { FilterField as BaseFilterField } from "../modules/customer/utils/filter";
import type { Table } from "@tanstack/react-table";

import { useLocation, useSearchParams } from "react-router";
import { useSidebar } from "../ui/sidebar";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";

type ExtendedFilterField = BaseFilterField & {
  showIn?: "main" | "advanced" | "both";
};

function encodeValue(kind: ExtendedFilterField["kind"], val: any): string {
  if (
    val == null ||
    val === "" ||
    (typeof val === "object" && !Object.keys(val).length)
  )
    return "";
  switch (kind) {
    case "text":
    case "select":
      return String(val);
    case "boolean":
      return String(Boolean(val));
    case "numberRange": {
      const { min, max } = (val ?? {}) as { min?: number; max?: number };
      return [min ?? "", max ?? ""].join(":");
    }

    case "number": {
      return String(val);
    }
    case "dateRange": {
      const { from, to } = (val ?? {}) as { from?: string; to?: string };
      return [from ?? "", to ?? ""].join(":");
    }

    case "date": {
      return String(val);
    }
    default:
      return "";
  }
}

function decodeValue(kind: ExtendedFilterField["kind"], raw: string | null) {
  if (!raw) return undefined;
  switch (kind) {
    case "text":
    case "select":
      return raw;
    case "boolean":
      return raw === "true";
    case "numberRange": {
      const [minRaw, maxRaw] = raw.split(":");
      const min = minRaw !== "" ? Number(minRaw) : undefined;
      const max = maxRaw !== "" ? Number(maxRaw) : undefined;
      if (min == null && max == null) return undefined;
      return { min, max };
    }

    case "number": {
      const n = Number(raw);
      return Number.isNaN(n) ? undefined : n;
    }
    case "dateRange": {
      const [from, to] = raw.split(":");
      if (!from && !to) return undefined;
      return { from: from || undefined, to: to || undefined };
    }

    case "date": {
      return raw || undefined;
    }
    default:
      return undefined;
  }
}

function isVisibleForMode(
  f: ExtendedFilterField,
  isMobile: boolean,
  mode: "main" | "advanced"
): boolean {
  if (!isMobile && f.showOnlyMobile) return false;
  const showIn = f.showIn ?? "both";
  return showIn === "both" || showIn === mode;
}

function formatDisplayValue(
  kind: ExtendedFilterField["kind"],
  val: any,
  field: ExtendedFilterField
): string {
  if (
    val == null ||
    val === "" ||
    (typeof val === "object" && !Object.keys(val).length)
  )
    return "";
  switch (kind) {
    case "text":
      return String(val);
    case "select": {
      const s = String(val);
      const label =
        field.options?.find((o: any) => String(o.value) === s)?.label ?? s;
      return String(label);
    }
    case "boolean":
      return val ? "ใช่" : "ไม่ใช่";
    case "numberRange": {
      const { min, max } = val ?? {};
      if (min != null && max != null) return `${min} – ${max}`;
      if (min != null) return `≥ ${min}`;
      if (max != null) return `≤ ${max}`;
      return "";
    }

    case "number":
      return val != null && val !== "" ? String(val) : "";
    case "dateRange": {
      const { from, to } = val ?? {};
      if (from && to) return `${from} – ${to}`;
      if (from) return `ตั้งแต่ ${from}`;
      if (to) return `ถึง ${to}`;
      return "";
    }

    case "date": {
      return val || "";
    }
    default:
      return "";
  }
}

function resetValueByKind(kind: ExtendedFilterField["kind"]) {
  switch (kind) {
    case "text":
    case "select":
      return "";
    case "boolean":
      return false;
    case "numberRange":
      return { min: undefined, max: undefined };
    case "dateRange":
      return { from: undefined, to: undefined };
    case "number":
    case "date":
      return undefined;
    default:
      return undefined;
  }
}

type Props<TData> = {
  table: Table<TData>;
  fields: BaseFilterField[];
  className?: string;
  showAdvanced?: boolean;
};

export function DynamicFilterBar<TData>({
  table,
  fields,
  className,
  showAdvanced = true,
}: Props<TData>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMobile } = useSidebar();
  const { pathname } = useLocation();

  const extFields = React.useMemo(
    () => fields as ExtendedFilterField[],
    [fields]
  );

  const [form, setForm] = React.useState<Record<string, any>>({});
  const [applied, setApplied] = React.useState<Record<string, any>>({});
  const [advancedOpen, setAdvancedOpen] = React.useState(false);

  const hasAdvanced = React.useMemo(
    () =>
      extFields.some((f) => {
        const showIn = f.showIn ?? "both";
        return showIn === "advanced" || showIn === "both";
      }),
    [extFields]
  );
  const shouldShowAdvanced = showAdvanced && hasAdvanced;

  React.useEffect(() => {
    const next: Record<string, any> = {};
    extFields.forEach((f) => {
      next[f.id] = decodeValue(f.kind, searchParams.get(f.id));
    });
    setForm(next);
    setApplied(next);
    extFields.forEach((f) => {
      table.getColumn(f.id)?.setFilterValue(next[f.id]);
    });
  }, [searchParams, extFields, table]);

  const update = (id: string, value: any) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault?.();

    extFields.forEach((f) => {
      table.getColumn(f.id)?.setFilterValue(form[f.id]);
    });

    const nextSp = new URLSearchParams(searchParams.toString());
    extFields.forEach((f) => nextSp.delete(f.id));
    extFields.forEach((f) => {
      const encoded = encodeValue(f.kind, form[f.id]);
      if (encoded) nextSp.set(f.id, encoded);
    });
    nextSp.set("page", "1");
    setSearchParams(nextSp);

    setApplied(form);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onClear = () => {
    setApplied({});

    table.resetColumnFilters();

    const nextSp = new URLSearchParams(searchParams.toString());
    extFields.forEach((f) => nextSp.delete(f.id));
    nextSp.set("page", "1");
    setSearchParams(nextSp);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeChips = React.useMemo(() => {
    return extFields
      .map((f) => {
        const val = applied[f.id];
        const display = formatDisplayValue(f.kind, val, f);
        if (!display) return null;
        return {
          id: f.id,
          label: String(f.label ?? f.id),
          valueText: display,
          kind: f.kind,
        };
      })
      .filter(Boolean) as Array<{
      id: string;
      label: string;
      valueText: string;
      kind: ExtendedFilterField["kind"];
    }>;
  }, [extFields, applied]);

  const removeChip = (fieldId: string) => {
    const field = extFields.find((f) => f.id === fieldId);
    if (!field) return;
    const nextVal = resetValueByKind(field.kind);

    setForm((prev) => ({ ...prev, [fieldId]: nextVal }));
    setApplied((prev) => ({ ...prev, [fieldId]: nextVal }));

    table.getColumn(fieldId)?.setFilterValue(nextVal);

    const nextSp = new URLSearchParams(searchParams.toString());
    nextSp.delete(fieldId);
    nextSp.set("page", "1");
    setSearchParams(nextSp);
  };

  const renderSameFieldsBlock = (mode: "main" | "advanced") => (
    <div className={`flex flex-wrap items-center gap-5 ${className ?? ""}`}>
      {extFields
        .filter((f) => isVisibleForMode(f, isMobile, mode))
        .map((f) => {
          const kind = f.kind;
          switch (kind) {
            case "text":
              return (
                <div key={f.id} className="mb-3">
                  <span className="block text-sm font-medium mb-1">
                    {String(f.label)}
                  </span>
                  <Input
                    key={f.id}
                    placeholder={`ค้นหา${String(f.label)}`}
                    value={(form[f.id] as string) ?? ""}
                    onChange={(e) => update(f.id, e.target.value)}
                    className="w-full md:w-[240px]"
                  />
                </div>
              );
            case "select":
              return (
                <div key={f.id} className="mb-3 w-[214px]">
                  <span className="block text-sm font-medium mb-1">
                    {String(f.label)}
                  </span>
                  <Select
                    value={typeof form[f.id] === "string" ? form[f.id] : ""}
                    onValueChange={(v) => update(f.id, v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={f.label as string} />
                    </SelectTrigger>
                    <SelectContent>
                      {f.options?.map((o: any) => (
                        <SelectItem
                          key={`${f.id}-${o.value}`}
                          value={String(o.value)}
                        >
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            case "boolean":
              return (
                <label
                  key={f.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/20"
                >
                  <Checkbox
                    checked={Boolean(form[f.id])}
                    onCheckedChange={(v) => update(f.id, Boolean(v))}
                  />
                  <span className="text-sm">{f.label}</span>
                </label>
              );
            case "numberRange":
              return (
                <div key={f.id} className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder={`${f.label} min`}
                    className="w-[110px]"
                    value={(form[f.id]?.min ?? "") as any}
                    onChange={(e) =>
                      update(f.id, {
                        ...(form[f.id] ?? {}),
                        min: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      })
                    }
                  />
                  <Input
                    type="number"
                    placeholder={`${f.label} max`}
                    className="w-[110px]"
                    value={(form[f.id]?.max ?? "") as any}
                    onChange={(e) =>
                      update(f.id, {
                        ...(form[f.id] ?? {}),
                        max: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      })
                    }
                  />
                </div>
              );
            case "number":
              return (
                <div key={f.id} className="mb-3">
                  <span className="block text-sm font-medium mb-1">
                    {String(f.label)}
                  </span>
                  <Input
                    type="number"
                    placeholder={`${f.label}`}
                    className="min-w-[160px]"
                    value={
                      form[f.id] === undefined || form[f.id] === null
                        ? ""
                        : (form[f.id] as number | string)
                    }
                    onChange={(e) =>
                      update(
                        f.id,
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                  />
                </div>
              );
            case "dateRange":
              return (
                <div key={f.id} className="flex flex-col gap-1">
                  <span className="block text-sm font-medium mb-1">
                    {String(f.label)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Input
                      type="date"
                      className="w-[160px]"
                      value={(form[f.id]?.from ?? "") as any}
                      onChange={(e) =>
                        update(f.id, {
                          ...(form[f.id] ?? {}),
                          from: e.target.value || undefined,
                        })
                      }
                    />
                    <Input
                      type="date"
                      className="w-[160px]"
                      value={(form[f.id]?.to ?? "") as any}
                      onChange={(e) =>
                        update(f.id, {
                          ...(form[f.id] ?? {}),
                          to: e.target.value || undefined,
                        })
                      }
                    />
                  </div>
                </div>
              );

            case "date":
              return (
                <div key={f.id} className="mb-3">
                  <span className="block text-sm font-medium mb-1">
                    {String(f.label)}
                  </span>
                  <Input
                    type="date"
                    className="w-[160px]"
                    value={(form[f.id] ?? "") as any}
                    onChange={(e) => update(f.id, e.target.value || undefined)}
                  />
                </div>
              );
            default:
              return null;
          }
        })}
    </div>
  );

  return (
    <div
      className="flex flex-col p-4 rounded-2xl bg-white dark:bg-card"
      data-pathname={pathname}
    >
      <h2 className="font-semibold mb-3 text-md">กรองข้อมูล</h2>

      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <form id="search" onSubmit={onSubmit}>
            {renderSameFieldsBlock("main")}
          </form>

          {activeChips.length > 0 && (
            <div className="mt-3 mb-2 flex flex-wrap items-center gap-2">
              {activeChips.map((chip) => (
                <span
                  key={chip.id}
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs bg-muted/40"
                >
                  <span className="font-medium">{chip.label}:</span>
                  <span className="text-muted-foreground">
                    {chip.valueText}
                  </span>
                  <button
                    type="button"
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full hover:bg-muted/70"
                    aria-label={`ลบตัวกรอง ${chip.label}`}
                    onClick={() => removeChip(chip.id)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="ml-auto mt-3 flex items-center gap-2">
          {shouldShowAdvanced && (
            <Dialog open={advancedOpen} onOpenChange={setAdvancedOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline">
                  <TextSearch />
                  กรองข้อมูลเพิ่มเติม
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>กรองข้อมูลเพิ่มเติม</DialogTitle>
                </DialogHeader>

                {renderSameFieldsBlock("advanced")}

                <DialogFooter className="flex items-center justify-between gap-2">
                  <Button type="button" variant="outline" onClick={onClear}>
                    <X />
                    ล้างค้นหา
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setAdvancedOpen(false)}
                    >
                      ปิด
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        onSubmit();
                        setAdvancedOpen(false);
                      }}
                    >
                      <Search />
                      ค้นหา
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          <Button type="button" variant="outline" onClick={onClear}>
            <X />
            ล้างค้นหา
          </Button>
          <Button type="submit" form="search">
            <Search />
            ค้นหา
          </Button>
        </div>
      </div>
    </div>
  );
}
