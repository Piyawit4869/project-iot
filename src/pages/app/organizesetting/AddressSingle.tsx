import { FormButtonsEdit } from '@src/components/shared/FormButtons';
import { FormFields } from '@src/forms';
import { renderAddress } from '@src/pages/superadmin/organize/renderForm';
import { Form, Typography } from 'antd';
import { AddressCreate } from './AddressCreate';

export const AddressSingle = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <FormButtonsEdit
          form={form}
          titleModalReset="คุณต้องการเคลียร์ข้อมูลที่อยู่องค์กร ใช่หรือไม่?"
          contentModalReset="ข้อมูลที่คุณกรอกจะถูกเคลียร์"
          titleModalSubmit="คุณต้องการสร้างข้อมูลที่อยู่องค์กร ใช่หรือไม่?"
          contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
          titleModalDelete="คุณต้องการลบข้อมูลที่อยู่องค์กร ใช่หรือไม่?"
          contentModalDelete="ข้อมูลของคุณจะถูกลบหากกดยืนยัน"
        />
        <Typography.Title level={3}>ชื่อที่อยู่</Typography.Title>
        <FormFields renderForm={renderAddress} form={AddressCreate} />
      </Form>
    </>
  );
};
