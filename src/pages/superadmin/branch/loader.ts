import * as API from '../../../apis';

export async function branchLoader() {
  return { branch: {} };
}

export async function branchSingleLoader(params: any) {
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
