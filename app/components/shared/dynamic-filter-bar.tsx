"use client";

import * as React from "react";

import { Search, X } from "lucide-react";
import type { FilterField } from "../modules/customer/utils/filter";
import type { Table } from "@tanstack/react-table";

import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
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

// --- helpers: encode/decode values into URL params -----------------

function encodeValue(kind: FilterField["kind"], val: any): string {
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
      return String(Boolean(val)); // "true"/"false"
    case "numberRange": {
      const { min, max } = (val ?? {}) as { min?: number; max?: number };
      return [min ?? "", max ?? ""].join(":");
    }
    case "dateRange": {
      const { from, to } = (val ?? {}) as { from?: string; to?: string };
      return [from ?? "", to ?? ""].join(":");
    }
    default:
      return "";
  }
}

function decodeValue(kind: FilterField["kind"], raw: string | null) {
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
    case "dateRange": {
      const [from, to] = raw.split(":");
      if (!from && !to) return undefined;
      return { from: from || undefined, to: to || undefined };
    }
    default:
      return undefined;
  }
}

type Props<TData> = {
  table: Table<TData>;
  fields: FilterField[];
  className?: string;
};

export function DynamicFilterBar<TData>({
  table,
  fields,
  className,
}: Props<TData>) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const params = useParams();
  const id = params?.id as string;

  const { isMobile } = useSidebar();

  const [form, setForm] = React.useState<Record<string, any>>({});

  React.useEffect(() => {
    const next: Record<string, any> = {};
    fields.forEach((f) => {
      next[f.id] = decodeValue(f.kind, id);
    });
    setForm(next);
    fields.forEach((f) => {
      table.getColumn(f.id)?.setFilterValue(next[f.id]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, fields, table]);

  // convenience setter
  const update = (id: string, value: any) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  // Submit → apply to table + write search params
  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault?.();

    fields.forEach((f) => {
      table.getColumn(f.id)?.setFilterValue(form[f.id]);
    });

    const nextSp = new URLSearchParams(id?.toString() ?? "");
    // clear old filters
    fields.forEach((f) => nextSp.delete(f.id));

    fields.forEach((f) => {
      const encoded = encodeValue(f.kind, form[f.id]);
      if (encoded) nextSp.set(f.id, encoded);
    });

    nextSp.set("page", "1"); // optional
    navigate(`${pathname}?${nextSp.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear → reset everything
  const onClear = () => {
    const cleared: Record<string, any> = {};
    fields.forEach((f) => (cleared[f.id] = undefined));
    setForm(cleared);

    table.resetColumnFilters();

    const nextSp = new URLSearchParams(id?.toString() ?? "");
    fields.forEach((f) => nextSp.delete(f.id));
    nextSp.set("page", "1");
    navigate(`${pathname}?${nextSp.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col p-4 rounded-2xl bg-white dark:bg-card">
      <h2 className="font-semibold mb-3 text-md">กรองข้อมูล</h2>
      <div className="flex flex-col md:flex-row">
        <form
          id="search"
          onSubmit={onSubmit}
          className={`flex flex-wrap items-center gap-5 ${className ?? ""}`}
        >
          {fields
            .filter((f) => (isMobile ? true : !f.showOnlyMobile))
            .map((f) => {
              switch (f.kind) {
                case "text":
                  return (
                    <div key={f.id}>
                      <span>ค้นหา{String(f.label)}</span>
                      <Input
                        key={f.id}
                        placeholder={String(f.label)}
                        value={(form[f.id] as string) ?? ""}
                        onChange={(e) => update(f.id, e.target.value)}
                        className="w-full mt-1 md:w-[240px]"
                      />
                    </div>
                  );

                case "select":
                  return (
                    <div key={f.id} className="flex flex-col w-[214px]">
                      <span>{String(f.label)}</span>
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

                case "dateRange":
                  return (
                    <div key={f.id} className="flex items-center gap-2">
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
                  );

                default:
                  return null;
              }
            })}
        </form>
        <div className="ml-auto mt-3 flex items-center gap-2">
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
