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
