import { WorkInfoForm } from '@src/components/modules/app/attendance';
import { TitleBar } from '@src/components/shared';
import { Button, Divider, Form, Spin } from 'antd';
import dayjs from 'dayjs';
import { useNavigation, useSubmit } from 'react-router-dom';

const convertDate = (d: any) => {
  return d && dayjs(d).format('YYYY-MM-DDTHH:mm:ss[Z]');
};

export const AttendanceCreate = () => {
  const submit = useSubmit();
  const [form] = Form.useForm();
  const navigation = useNavigation();

  const onFormFinished = (values: any) => {
    const payload = Object.assign({}, values);

    payload.startDate = convertDate(values.startDate);
    payload.dueDate = convertDate(values.dueDate);
    payload.payDay = convertDate(values.payDay);

    submit({ data: JSON.stringify(payload) }, { method: 'post' });
  };

  const onLoading =
    navigation.state === 'submitting' || navigation.state === 'loading';

  return (
    <>
      <TitleBar
        title={'การเข้างาน - ออกงาน'}
        buttons={[
          <Button
            type="primary"
            htmlType="submit"
            // onClick={() => form.submit()}
            form="work-info"
            loading={onLoading}
            disabled={onLoading}
          >
            บันทึก{' '}
          </Button>,
        ]}
      />
      <Divider />

      <Spin spinning={onLoading}>
        <WorkInfoForm form={form} onFinish={onFormFinished} />
      </Spin>
    </>
  );
};
