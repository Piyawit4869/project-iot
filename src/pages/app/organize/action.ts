import { notification } from "antd";
import { redirect } from "react-router-dom";
import * as API from "../../../apis"

export async function organizeSingleAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  switch (submitData.action) {
    case "edit":
      try {
        await API.organize.update(params.id, JSON.parse(submitData.data));
        notification["success"]({
          message: "แก้ไขข้อมูลองค์กรเสร็จสิ้น",
          placement: "top",
          duration: 3,
        });
        return redirect(`/admin/organize/${params.id}`);
      } catch (error) {
        notification["error"]({
          message: "แก้ไขข้อมูลองค์กรล้มเหลว",
          placement: "top",
          duration: 3,
        });
        return {
          data: {
            action: "create",
            status: "error",
            message: "Organize Created Failed !",
          },
        };
      }
    
    default:
      break;
  }
}