import * as API from '@src/apis';
import { notification } from 'antd';
import { redirect } from 'react-router-dom';

export async function branchCreateAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
      await API.branch.create(JSON.parse(submitData.data));
      notification['success']({
        message: 'สร้างข้อมูลสาขาเสร็จสิ้น',
        placement: 'top',
        duration: 3,
      });
  
      return redirect(`/branch`);
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
