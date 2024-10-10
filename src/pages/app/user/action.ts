import { notification } from 'antd';
import * as API from '../../../apis';
import { redirect } from 'react-router-dom';

export async function userCreateAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
    const res = await API.user.create(JSON.parse(submitData.data));

    notification.success({
      message: 'สร้างผู้ใช้งานสำเร็จ',
      placement: 'bottomRight',
      duration: 3,
    });

    return redirect(`/user/${res.data.data.id}`);
  } catch (error) {
    notification.error({
      message: 'สร้างผู้ใช้งานล้มเหลว',
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

export async function userEditAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  switch (submitData.action) {
    case 'edit':
      try {
        await API.user.edit(JSON.parse(submitData.data), params.id);
        notification['success']({
          message: 'แก้ไขข้อมูลผู้ใช้งานเสร็จสิ้น',
          placement: 'bottomRight',
          duration: 3,
        });
        return redirect(`/user/${params.id}`);
      } catch (error) {
        notification['error']({
          message: 'แก้ไขข้อมูลผู้ใช้งานล้มเหลว',
          placement: 'bottomRight',
          duration: 3,
        });
        return {
          data: {
            action: 'edit',
            status: 'error',
            message: 'User Updated Failed !',
          },
        };
      }
    case 'delete':
      try {
        await API.user.deleted(params.id);
        notification['success']({
          message: 'ลบข้อมูลผู้ใช้งานเสร็จสิ้น',
          placement: 'bottomRight',
          duration: 3,
        });
        return redirect('/user');
      } catch (error) {
        notification['error']({
          message: 'ลบข้อมูลผู้ใช้งานล้มเหลว',
          placement: 'bottomRight',
          duration: 3,
        });
        return {
          data: {
            action: 'delete',
            status: 'error',
            message: 'User Deleted Failed !',
          },
        };
      }
    case 'resetPassword':
      try {
        await API.user.resetPassword(params.id, JSON.parse(submitData.data));
        notification['success']({
          message: 'แก้ไขรหัสผ่านสำเร็จ',
          placement: 'bottomRight',
          duration: 3,
        });
        return redirect(`/user/${params.id}`);
      } catch (error) {
        notification['error']({
          message: 'แก้ไขรหัสผ่านล้มเหลว',
          placement: 'bottomRight',
          duration: 3,
        });
        return {
          data: {
            action: 'edit',
            status: 'error',
            message: 'User Updated Failed !',
          },
        };
      }
    default:
      break;
  }
}
