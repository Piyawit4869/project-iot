import * as API from '@src/apis';
import { notification } from 'antd';
import { redirect } from 'react-router-dom';

export async function branchCreateAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
    await API.branch.create(JSON.parse(submitData.data));
    notification['success']({
      message: 'สร้างข้อมูลสาขาเสร็จสิ้น',
      placement: 'bottomRight',
      duration: 3,
    });

    return redirect(`/branch`);
  } catch (error) {
    notification['error']({
      message: 'สร้างข้อมูลสาขาล้มเหลว',
      placement: 'bottomRight',
      duration: 3,
    });
    return {
      data: {
        action: 'create',
        status: 'error',
        message: 'Organize Created Failed !',
      },
    };
  }
}

export async function branchSingleAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
    await API.branch.update(params.id, JSON.parse(submitData.data));
    notification['success']({
      message: 'แก้ไขข้อมูลสาขาเสร็จสิ้น',
      placement: 'bottomRight',
      duration: 3,
    });

    return redirect(`/branch/${params.id}`);
  } catch (error) {
    notification['error']({
      message: 'แก้ไขข้อมูลสาขาล้มเหลว',
      placement: 'bottomRight',
      duration: 3,
    });
    return {
      data: {
        action: 'create',
        status: 'error',
        message: 'Organize Created Failed !',
      },
    };
  }
}
