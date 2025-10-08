export const uid = (): string =>
  (globalThis.crypto?.randomUUID?.() as string) ||
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

export const ensureIds = <T extends { id?: string }>(
  arr: T[] = []
): (T & { id: string })[] => {
  const used = new Set<string>();
  return arr.map((item) => {
    let id = item.id && typeof item.id === "string" ? item.id : uid();
    while (used.has(id)) id = uid();
    used.add(id);
    return { ...item, id };
  });
};

// สะดวกเวลา append
export const withId = <T extends object>(obj: T): T & { id: string } => ({
  id: uid(),
  ...obj,
});
