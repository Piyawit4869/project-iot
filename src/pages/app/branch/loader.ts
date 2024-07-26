import * as API from '@src/apis';

export async function branchLoader(params: any) {
  const url = new URL(params.request.url);
  const query = url.searchParams;
  const param = Object.fromEntries(query);
  try {
    const search = { ...param };

    const branch = await API.branch.getAll(search);
    return { branch: branch.data, param };
  } catch (error) {
    return { error: 'error', message: error };
  }
}

export async function branchSingleLoader(params: any) {
  const url = new URL(params.request.url);
  const query = url.searchParams;
  const param = Object.fromEntries(query);

  try {
    const { data: branch } = await API.branch.get(params.params.id);
    return { branch: branch.data, param };
  } catch (error) {
    return { error: 'error', message: error };
  }
}
