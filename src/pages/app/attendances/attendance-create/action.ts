import * as API from '@src/apis';

export async function attendanceCreateAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  console.log({ submitData });
  console.log({ params });

  try {
    await API.attendance.create(JSON.parse(submitData.data));
    return {
      data: {
        action: 'create',
        status: 'success',
        message: 'Organize Created Successfully !',
      },
    };
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
