import * as API from '@src/apis';

export async function indexActionLoader() {
  try {
    const atttendances = await API.attendance.getAll();
    //   return { organize: organize.data };

    return { data: atttendances.data };
  } catch (error) {
    return { status: 'error', message: error };
  }
}
