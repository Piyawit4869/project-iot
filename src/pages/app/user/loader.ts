import * as API from '@src/apis';

export async function userLoader() {
  try {
    const user = await API.user.paginate();
    return { user: user.data };
  } catch (error) {
    return { user: {}, error: 'error', message: error };
  }
}

export async function userSingleLoader(params: any) {
  const url = new URL(params.request.url);
  const query = url.searchParams;
  const param = Object.fromEntries(query);

  try {
    const user = await API.user.get(params.params.id);

    return { user: user.data.data, param };
  } catch (error) {
    return { user: {}, error: 'error', message: error };
  }
}
