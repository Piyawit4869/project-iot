import { data } from './notationData';

export async function notationsLoader(params: any) {
  const url = new URL(params.request.url);
  const query = url.searchParams;
  const param = Object.fromEntries(query);
  try {
    return { notations: { items: data, meta: {} }, param };
  } catch (error) {
    return { notations: { items: [], meta: {} }, param };
  }
}
