// chat/helpers/refs.ts
export function assignRef({ refObj, id, el }: any) {
  refObj.current[id] = el;
}

export function getRef({ refObj, id }: any) {
  return refObj.current[id] ?? null;
}
