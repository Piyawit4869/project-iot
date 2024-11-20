import * as API from '@src/apis';
import { notification } from 'antd';
import { redirect } from 'react-router-dom';

export async function branchCreateAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
    const res = await API.branch.createBranch(
      params.id,
      JSON.parse(submitData.data),
    );

    notification['success']({
      message: 'สร้างข้อมูลสาขาเสร็จสิ้น',
      placement: 'bottomRight',
      duration: 3,
    });

    return redirect(`/admin/organization/${params.id}/branch/${res.data.data}`);
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

export async function branchEditAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  console.log({ params });

  switch (submitData.action) {
    case 'edit':
      try {
        const res = await API.branch.updateBranch(
          params.id,
          params.branchId,
          JSON.parse(submitData.data),
        );

        console.log({ res });

        notification['success']({
          message: 'แก้ไขข้อมูลสาขาเสร็จสิ้น',
          placement: 'bottomRight',
          duration: 3,
        });
        return redirect(
          `/admin/organization/${params.id}/branch/${res.data.data.id}`,
        );
      } catch (error) {
        notification['error']({
          message: 'แก้ไขข้อมูลสาขาล้มเหลว',
          placement: 'bottomRight',
          duration: 3,
        });
        return {
          data: {
            action: 'update',
            status: 'error',
            message: 'Branch Created Failed !',
          },
        };
      }
    // case 'delete':
    //   try {
    //     await API.organize.deleted(params.id);
    //     notification['success']({
    //       message: 'ลบข้อมูลองค์กรเสร็จสิ้น',
    //       placement: 'bottomRight',
    //       duration: 3,
    //     });
    //     return redirect('/admin/organize');
    //   } catch (error) {
    //     notification['error']({
    //       message: 'ลบข้อมูลองค์กรล้มเหลว',
    //       placement: 'bottomRight',
    //       duration: 3,
    //     });
    //     return {
    //       data: {
    //         action: 'create',
    //         status: 'error',
    //         message: 'Organize Created Failed !',
    //       },
    //     };
    //   }
    default:
      break;
  }
}
