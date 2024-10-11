import * as API from '@src/apis';

export async function attendanceAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  const data = JSON.parse(submitData.data);

  try {
    await API.attendance.attendanceAction(data);

    return { status: 'success' };
  } catch (e) {
    return { status: 'fail' };
  }
}
