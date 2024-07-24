import * as API from '../../../apis';

export async function userLoader() {
  try {
    const user = await API.user.paginate();
    return { user: user.data };
  } catch (error) {
    return { error: 'error', message: error };
  }
}
