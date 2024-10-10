import * as API from '@src/apis';

export async function indexActionLoader() {
  try {
    const { data: workInfos } = await API.attendance.getAllWorkInfo();
    const { data: data } = await API.attendance.getAll();
    //   return { organize: organize.data };

    return { workInfos, data };
  } catch (error) {
    return { workInfos: {}, data: [] };
  }
}
