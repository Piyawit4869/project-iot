import * as API from '@src/apis';
import { notification } from 'antd';
import { redirect } from 'react-router-dom';

export async function organizeCreateAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
    const res = await API.organize.create(JSON.parse(submitData.data));

    notification['success']({
      message: 'สร้างข้อมูลองค์กรเสร็จสิ้น',
      placement: 'bottomRight',
      duration: 3,
    });

    return redirect(`/admin/organize/${res.data.slug}`);
  } catch (error) {
    notification['error']({
      message: 'สร้างข้อมูลองค์กรล้มเหลว',
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

export async function organizeSingleAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  switch (submitData.action) {
    case 'edit':
      try {
        await API.organize.update(params.id, JSON.parse(submitData.data));
        notification['success']({
          message: 'แก้ไขข้อมูลองค์กรเสร็จสิ้น',
          placement: 'bottomRight',
          duration: 3,
        });
        return redirect(`/admin/organize/${params.id}`);
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
    case 'delete':
      try {
        await API.organize.deleted(params.id);
        notification['success']({
          message: 'ลบข้อมูลองค์กรเสร็จสิ้น',
          placement: 'bottomRight',
          duration: 3,
        });
        return redirect('/admin/organize');
      } catch (error) {
        notification['error']({
          message: 'ลบข้อมูลองค์กรล้มเหลว',
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
