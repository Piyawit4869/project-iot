import { FormButtonsCreate } from '@src/components/shared/FormButtons';
import { FormFields } from '@src/forms';
import { renderAddress } from '@src/pages/superadmin/organize/renderForm';
import { Form, Typography } from 'antd';

export const AddressCreate = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <FormButtonsCreate
          form={form}
          titleModalReset="คุณต้องการเคลียร์ข้อมูลที่อยู่องค์กร ใช่หรือไม่?"
          contentModalReset="ข้อมูลที่คุณกรอกจะถูกเคลียร์"
          titleModalSubmit="คุณต้องการสร้างข้อมูลที่อยู่องค์กร ใช่หรือไม่?"
          contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
        />
        <Typography.Title level={3}>สร้างที่อยู่ใหม่</Typography.Title>
        <FormFields renderForm={renderAddress} form={AddressCreate} />
      </Form>
    </>
  );
};
