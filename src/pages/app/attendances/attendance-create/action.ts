import * as API from '@src/apis';
import { redirect } from 'react-router-dom';

export async function attendanceCreateAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  console.log({ submitData });
  console.log({ params });

  try {
    const { data: res } = await API.attendance.create(
      JSON.parse(submitData.data),
    );
    console.log({ res });
    return redirect(`/attendance/${res.data[0].id}`);
  } catch (error) {
    return {
      data: {
        action: 'create',
        status: 'error',
        message: 'Organize Created Failed !',
      },
    };
  }
}
