import { WorkInfoForm } from '@src/components/modules/app/attendance';
import { TitleBar } from '@src/components/shared';
import { Button, Divider, Form, Space, Spin } from 'antd';
import { useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import dayjs from 'dayjs';

const convertDate = (d: any) => {
  return d && dayjs(d).format('YYYY-MM-DDTHH:mm:ss[Z]');
};

export const AttendanceEdit = () => {
  const navigation = useNavigation();

  const { workInfo } = useLoaderData() as any;

  const submit = useSubmit();
  const [form] = Form.useForm();

  const onFormFinished = (values: any) => {
    const payload = Object.assign({}, values);

    payload.startDate = convertDate(values.startDate);
    payload.dueDate = convertDate(values.dueDate);
    payload.payDay = convertDate(values.payDay);

    submit({ data: JSON.stringify(payload) }, { method: 'put' });
  };

  const onLoading =
    navigation.state === 'submitting' || navigation.state === 'loading';

  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 5,
          padding: '20px 0px',
          position: 'sticky',
          zIndex: 10,
          borderImageSlice: 1,
          top: '-10px',
        }}
      >
        <TitleBar
          title={'การเข้างาน - ออกงาน'}
          buttons={[
            <Button type="primary" htmlType="submit" form="work-info">
              บันทึก
            </Button>,
          ]}
        />
        <Divider />

        <Spin spinning={onLoading}>
          <WorkInfoForm
            form={form}
            initialvalues={workInfo}
            onFinish={onFormFinished}
          />
        </Spin>
      </Space>
    </>
  );
};
