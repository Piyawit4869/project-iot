import React from "react";
import { OrganizeCreateForm } from "@src/forms";
import { BranchForm } from "@src/forms/BranchForm";
import * as API from "@src/apis";
import { Form } from "antd";
import dayjs from "dayjs";

//no intitial value
export async function organizeCreateAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  try {
    await API.organize.create(JSON.parse(submitData.data));
    return {
      data: {
        action: "create",
        status: "success",
        message: "Organize Created Successfully !",
      },
    };
  } catch (error) {
    return {
      data: {
        action: "create",
        status: "error",
        message: "Organize Created Failed !",
      },
    };
  }
}

export const OrganizeCreate: React.FC = () => {
  const [form] = Form.useForm();
  // const submit = useSubmit();
  // const [imageSrc, setImageSrc] = React.useState("image-placeholder.png");

  // const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const input = event.target;
  //   if (input.files && input.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setImageSrc(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // };
  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    payload.businessRegister = formatDate(payload.businessRegister);
    payload.active = true;
    payload.addressData = [];
    payload.branchesData = [];
    payload.userData = [];

    payload.logoUrl =
      "https://cdn.discordapp.com/attachments/1235856320280924213/1244954526155542598/575757.png?ex=6656fdc1&is=6655ac41&hm=96242e1d5d4f232411d9434a17f5053d4a7e6c788030f515e5da25d03813da86&";
    // submit({ data: JSON.stringify(payload) }, { method: "post" });
    console.log("this is a payload data :", payload);
  };

  const formatDate = (isoDateString: any) => {
    return dayjs(isoDateString);
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <OrganizeCreateForm />
        <BranchForm />
      </Form>
    </div>
  );
};
