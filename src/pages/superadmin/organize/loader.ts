import * as API from '@src/apis';

export async function organizeLoader(params: any) {
  const url = new URL(params.request.url);
  const query = url.searchParams;
  const param = Object.fromEntries(query);

  try {
    const search = { ...param };

    const organize = await API.organize.getAll(search);
    return { organize: organize.data, param };
  } catch (error) {
    return { error: 'error', message: error };
  }
}

export async function organizeSingleLoader(params: any) {
  const url = new URL(params.request.url);
  const query = url.searchParams;
  const param = Object.fromEntries(query);

  try {
    const { data: organize } = await API.organize.get(params.params.id);

    return { organize: organize.data, param };
  } catch (error) {
    return { error: 'error', message: error };
  }
}
