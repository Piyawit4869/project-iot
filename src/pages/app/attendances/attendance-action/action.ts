import * as API from '@src/apis';

export async function attendanceAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  const data = JSON.parse(submitData.data);

  try {
    const { data: res } = await API.attendance.attendanceAction(data);

    console.log({ res });

    return { status: 'success' };
  } catch (e) {
    return { status: 'fail' };
  }
}
