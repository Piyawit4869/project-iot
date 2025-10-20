export function pickSearchParams<T extends string>(
  sp: URLSearchParams,
  keys: readonly T[]
): Partial<Record<T, string>> {
  const out: Partial<Record<T, string>> = {};
  for (const k of keys) {
    const v = sp.get(k);
    if (v != null && v !== "") out[k] = v;
  }
  return out;
}

export function parseDateRangeParam(
  sp: URLSearchParams,
  key = "date"
): { fromDate?: string; toDate?: string } | undefined {
  const raw = sp.get(key);
  if (!raw) return undefined;

  const [fromDate, toDate] = raw.split(":");
  const isIso = (s?: string) => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);

  const from = isIso(fromDate) ? fromDate : fromDate || undefined;
  const to = isIso(toDate) ? toDate : toDate || undefined;

  if (!from && !to) return undefined;
  return { fromDate: from, toDate: to };
}

export const getBoolParam = (
  sp: URLSearchParams,
  key: string
): boolean | undefined => {
  const v = sp.get(key);
  return v === "true" ? true : v === "false" ? false : undefined;
};

export const getNumParam = (
  sp: URLSearchParams,
  key: string
): number | undefined => {
  const v = sp.get(key);
  if (v == null || v === "") return undefined;
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
};

type Caster<T> = (raw: string | null) => T | undefined;

export function pickAndCastParams<S extends Record<string, Caster<any>>>(
  sp: URLSearchParams,
  schema: S
): { [K in keyof S]?: ReturnType<S[K]> } {
  const out: any = {};
  for (const key in schema) {
    const caster = schema[key];
    const raw = sp.get(key);
    const val = caster(raw);
    if (val !== undefined) out[key] = val;
  }
  return out;
}

export const asString: Caster<string> = (raw) =>
  raw != null && raw !== "" ? raw : undefined;

export const asBool: Caster<boolean> = (raw) =>
  raw === "true" ? true : raw === "false" ? false : undefined;

export const asNumber: Caster<number> = (raw) => {
  if (raw == null || raw === "") return undefined;
  const n = Number(raw);
  return Number.isNaN(n) ? undefined : n;
};
