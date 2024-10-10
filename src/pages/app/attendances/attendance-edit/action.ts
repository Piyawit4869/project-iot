import * as API from '@src/apis';

export async function attendanceEditAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
    await API.attendance.update(params.id, JSON.parse(submitData.data));
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
