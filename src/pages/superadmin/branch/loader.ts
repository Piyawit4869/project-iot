import * as API from '../../../apis';

export async function branchLoader() {
  return { branch: {} };
}

export async function branchSingleLoader(params: any) {
  const url = new URL(params.request.url);

  console.log({ url });

  console.log({ params });

  try {
    const { data: branch } = await API.branch.getBranch(
      params.params.id,
      params.params.branchId,
    );

    return { branch: branch.data };
  } catch (error) {
    return { branch: {} };
  }
}
