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
import { DatePicker } from "./date-picker";
import { formatDateTH } from "./global-format";

type ExtendedFilterField = BaseFilterField & {
  showIn?: "main" | "advanced" | "both";
  min?: number;
  max?: number;
  step?: number;
};

const clampBetween = (
  val: string | number | undefined,
  min?: number,
  max?: number
) => {
  if (val === "" || val == null) return undefined;
  const n = Number(val);
  if (Number.isNaN(n)) return undefined;
  if (typeof min === "number" && typeof max === "number" && min > max) {
    return Math.min(Math.max(n, max), min);
  }
  if (typeof min === "number")
    return typeof max === "number"
      ? Math.min(Math.max(n, min), max)
      : Math.max(n, min);
  if (typeof max === "number") return Math.min(n, max);
  return n;
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
    case "number":
      return String(val);
    case "dateRange": {
      const { from, to } = (val ?? {}) as { from?: string; to?: string };
      return [from ?? "", to ?? ""].join(":");
    }
    case "date":
      return String(val);
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
    case "date":
      return raw || undefined;
    default:
      return undefined;
  }
}

function isVisibleForMode(
  f: ExtendedFilterField,
  isMobile: boolean,
  mode: "main" | "advanced"
): boolean {
  if (!isMobile && (f as any).showOnlyMobile) return false;
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
      const fromText = formatDateTH(from);
      const toText = formatDateTH(to);
      if (fromText && toText) return `${fromText} – ${toText}`;
      if (fromText) return `ตั้งแต่ ${fromText}`;
      if (toText) return `ถึง ${toText}`;
      return "";
    }
    case "date":
      return formatDateTH(val);
    default:
      return "";
  }
}

function resetValueByKind(kind: ExtendedFilterField["kind"]) {
  switch (kind) {
    case "text":
    case "select":
      return "";
  }
  switch (kind) {
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
  debounceMs?: number;
};

export function DynamicFilterBar<TData>({
  table,
  fields,
  className,
  showAdvanced = true,
  debounceMs = 400,
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

  const applyNow = React.useCallback(
    (draft: Record<string, any>) => {
      extFields.forEach((f) => {
        table.getColumn(f.id)?.setFilterValue(draft[f.id]);
      });
      const nextSp = new URLSearchParams(searchParams.toString());
      extFields.forEach((f) => nextSp.delete(f.id));
      extFields.forEach((f) => {
        const encoded = encodeValue(f.kind, draft[f.id]);
        if (encoded) nextSp.set(f.id, encoded);
      });
      nextSp.set("page", "1");
      setSearchParams(nextSp);
      setApplied(draft);
    },
    [extFields, searchParams, setSearchParams, table]
  );

  const updateState = (id: string, value: any) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleImmediateMainChange = (id: string, value: any) => {
    const draft = { ...form, [id]: value };
    setForm(draft);
    applyNow(draft);
  };

  const onSubmitAdvanced = () => {
    applyNow(form);
    setAdvancedOpen(false);
  };

  const onClear = () => {
    setApplied({});
    table.resetColumnFilters();
    const nextSp = new URLSearchParams(searchParams.toString());
    extFields.forEach((f) => nextSp.delete(f.id));
    nextSp.set("page", "1");
    setSearchParams(nextSp);
    setForm({});
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
    const draft = { ...form, [fieldId]: nextVal };
    setForm(draft);
    applyNow(draft);
  };

  const blockInvalidNumberKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "e" || e.key === "E" || e.key === "+") {
      e.preventDefault();
    }
  };
  const blockInvalidPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text");
    if (!/^\d*\.?\d*$/.test(text)) {
      e.preventDefault();
    }
  };

  const isInit = React.useRef(true);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const mainTypingIds = React.useMemo(
    () =>
      extFields
        .filter(
          (f) =>
            isVisibleForMode(f, isMobile, "main") &&
            (f.kind === "text" ||
              f.kind === "number" ||
              f.kind === "numberRange")
        )
        .map((f) => f.id),
    [extFields, isMobile]
  );
  const typingSubsetKey = React.useMemo(() => {
    const subset: Record<string, any> = {};
    mainTypingIds.forEach((id) => (subset[id] = form[id]));
    return JSON.stringify(subset);
  }, [form, mainTypingIds]);

  React.useEffect(() => {
    if (advancedOpen) return;
    if (isInit.current) {
      isInit.current = false;
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      applyNow(form);
    }, debounceMs);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [typingSubsetKey, applyNow, form, debounceMs, advancedOpen]);

  const renderBlock = (mode: "main" | "advanced") => (
    <div className={`flex flex-wrap items-center gap-5 ${className ?? ""}`}>
      {extFields
        .filter((f) => isVisibleForMode(f, isMobile, mode))
        .map((f) => {
          const isMain = mode === "main";
          const isImmediateKind =
            f.kind === "select" ||
            f.kind === "boolean" ||
            f.kind === "date" ||
            f.kind === "dateRange";

          const onChange = (id: string, value: any) => {
            if (isMain && isImmediateKind) {
              handleImmediateMainChange(id, value);
            } else {
              updateState(id, value);
            }
          };

          switch (f.kind) {
            case "text":
              return (
                <div key={f.id} className="mb-3">
                  <span className="block text-sm font-medium mb-1">
                    {String(f.label)}
                  </span>
                  <Input
                    placeholder={`ค้นหา${String(f.label)}`}
                    value={(form[f.id] as string) ?? ""}
                    onChange={(e) => onChange(f.id, e.target.value)}
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
                    onValueChange={(v) => onChange(f.id, v)}
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
                    onCheckedChange={(v) => onChange(f.id, Boolean(v))}
                  />
                  <span className="text-sm">{f.label}</span>
                </label>
              );

            case "numberRange":
              return (
                <div key={f.id} className="mb-3">
                  <span className="block text-sm font-medium mb-1">
                    {String(f.label)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={f.min ?? 0}
                      max={typeof f.max === "number" ? f.max : undefined}
                      step={f.step ?? "any"}
                      inputMode="decimal"
                      pattern="\d*\.?\d*"
                      placeholder={`${f.label} min`}
                      value={(form[f.id]?.min ?? "") as any}
                      onKeyDown={blockInvalidNumberKey}
                      onPaste={blockInvalidPaste}
                      onChange={(e) => {
                        const rawMin = clampBetween(
                          e.target.value,
                          f.min,
                          f.max
                        );
                        const current = form[f.id] ?? {};
                        let nextMax = current.max;
                        if (
                          typeof rawMin === "number" &&
                          typeof nextMax === "number" &&
                          rawMin > nextMax
                        ) {
                          nextMax = rawMin;
                        }
                        onChange(f.id, {
                          ...current,
                          min: rawMin,
                          max: clampBetween(nextMax, f.min, f.max),
                        });
                      }}
                    />
                    <Input
                      type="number"
                      min={f.min ?? 0}
                      max={typeof f.max === "number" ? f.max : undefined}
                      step={f.step ?? "any"}
                      inputMode="decimal"
                      pattern="\d*\.?\d*"
                      placeholder={`${f.label} max`}
                      value={(form[f.id]?.max ?? "") as any}
                      onKeyDown={blockInvalidNumberKey}
                      onPaste={blockInvalidPaste}
                      onChange={(e) => {
                        const rawMax = clampBetween(
                          e.target.value,
                          f.min,
                          f.max
                        );
                        const current = form[f.id] ?? {};
                        let nextMin = current.min;
                        if (
                          typeof rawMax === "number" &&
                          typeof nextMin === "number" &&
                          rawMax < nextMin
                        ) {
                          nextMin = rawMax;
                        }
                        onChange(f.id, {
                          ...current,
                          min: clampBetween(nextMin, f.min, f.max),
                          max: rawMax,
                        });
                      }}
                    />
                  </div>
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
                    min={typeof f.min === "number" ? f.min : undefined}
                    max={typeof f.max === "number" ? f.max : undefined}
                    step={f.step ?? "any"}
                    inputMode="decimal"
                    pattern="\d*\.?\d*"
                    placeholder={`${f.label}`}
                    className="min-w-[160px]"
                    value={
                      form[f.id] === undefined || form[f.id] === null
                        ? ""
                        : (form[f.id] as number | string)
                    }
                    onKeyDown={blockInvalidNumberKey}
                    onPaste={blockInvalidPaste}
                    onChange={(e) =>
                      onChange(f.id, clampBetween(e.target.value, f.min, f.max))
                    }
                  />
                </div>
              );

            case "dateRange":
              return (
                <div key={f.id} className="mb-3 flex flex-col gap-1">
                  <span className="block text-sm font-medium mb-1">
                    {String(f.label)}
                  </span>
                  <div className="flex items-center gap-2">
                    <DatePicker
                      value={form[f.id]?.from ?? ""}
                      onChange={(val) =>
                        onChange(f.id, { ...(form[f.id] ?? {}), from: val })
                      }
                      placeholder="จากวันที่"
                    />
                    <DatePicker
                      value={form[f.id]?.to ?? ""}
                      onChange={(val) =>
                        onChange(f.id, { ...(form[f.id] ?? {}), to: val })
                      }
                      placeholder="ถึงวันที่"
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
                  <DatePicker
                    value={form[f.id] ?? ""}
                    onChange={(val) => onChange(f.id, val)}
                    placeholder={`เลือก${f.label}`}
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
          {renderBlock("main")}

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

        <div className="ml-auto mb-3 md:mt-0 md:self-stretch flex items-end gap-2">
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

                {renderBlock("advanced")}

                <DialogFooter className="mt-6 flex justify-end">
                  <div className="flex gap-2 ">
                    <Button type="button" variant="outline" onClick={onClear}>
                      <X />
                      ล้างค้นหา
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setAdvancedOpen(false)}
                    >
                      ปิด
                    </Button>
                    <Button type="button" onClick={onSubmitAdvanced}>
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
          <Button type="button" onClick={onSubmitAdvanced}>
            <Search />
            ค้นหา
          </Button>
        </div>
      </div>
    </div>
  );
}
