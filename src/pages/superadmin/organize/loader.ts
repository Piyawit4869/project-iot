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
    return { organize: {}, param: {} };
  }
}

export async function organizeSingleLoader(params: any) {
  const url = new URL(params.request.url);
  const query = url.searchParams;
  const param = Object.fromEntries(query);

  try {
    const { data: organize } = await API.organize.get(params.params.id);
    const { data: branches } =
      await API.organize.getBranchesWithOrrganiaztionId(params.params.id);

    return { organize: organize.data, branches: branches, param };
  } catch (error) {
    return { organize: {}, branches: {}, param: {} };
  }
}

export async function createOrganizationLoader(params: any) {
  const url = new URL(params.request.url);
  const query = url.searchParams;
  const param = Object.fromEntries(query);

  try {
    const uniqFields = await API.organize.getUniqFields(param);

    return { uniqFields: uniqFields.data, param };
  } catch (error) {
    return { uniqFields: {} };
  }
}
