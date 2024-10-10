import * as API from '@src/apis';

export async function attendanceLoader() {
  try {
    const { data: workInfos } = await API.attendance.getAllWorkInfo();
    const me = JSON.parse(localStorage.getItem('me') || '');
    let wf;
    let attendances;
    if (me?.role?.name !== 'owner') {
      const { data: currentWf } = await API.attendance.getCurrentWorkInfo();
      wf = currentWf.data;

      attendances = wf.attendances;
    }

    return { workInfos, data: attendances, wf };
  } catch (error) {
    return { workInfos: {}, data: [], wf: {} };
  }
}
