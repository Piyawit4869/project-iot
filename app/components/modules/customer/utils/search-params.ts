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
