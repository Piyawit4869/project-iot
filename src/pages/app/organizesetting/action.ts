import { notification } from 'antd';
import * as API from '../../../apis';
import { redirect } from 'react-router-dom';

export async function organizeSingleLoader() {
  try {
    const setting = await API.organize.getSetting();

    return {
      setting: setting.data.data,
    };
  } catch (error) {
    return { organize: {}, params: [] };
  }
}

export async function organizeSingleAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  const me = JSON.parse(localStorage.getItem('me') as any);

  switch (submitData.action) {
    case 'edit':
      try {
        await API.organize.update(
          me.organizationId,
          JSON.parse(submitData.data),
        );
        notification['success']({
          message: 'แก้ไขข้อมูลองค์กรเสร็จสิ้น',
          placement: 'bottomRight',
          duration: 3,
        });
        return redirect(`/information`);
      } catch (error) {
        notification['error']({
          message: 'แก้ไขข้อมูลองค์กรล้มเหลว',
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
    case 'update':
      try {
        await API.organize.updateSystem(JSON.parse(submitData.data));
        notification['success']({
          message: 'แก้ไขข้อมูลองค์กรเสร็จสิ้น',
          placement: 'bottomRight',
          duration: 3,
        });
        return redirect(`/information`);
      } catch (error) {
        notification['error']({
          message: 'แก้ไขข้อมูลองค์กรล้มเหลว',
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

    default:
      break;
  }
}
