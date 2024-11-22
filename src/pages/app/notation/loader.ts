import * as API from '@src/apis';

export async function notationsLoader(params: any) {
  const url = new URL(params.request.url);
  const query = url.searchParams;
  const param = Object.fromEntries(query);

  try {
    const search = { ...param };

    const notations = await API.notations.pagination(search);

    return { notations: notations.data, param };
  } catch (error) {
    return { notations: { items: [], meta: {} }, param };
  }
}

export async function notationLoader({ params, request }: any) {
  const url = new URL(request.url);
  const query = url.searchParams;
  const param = Object.fromEntries(query);

  try {
    const { data: notation } = await API.notations.get(params.id);

    return { notation, param };
  } catch (error) {
    return { notation: {}, param };
  }
}
