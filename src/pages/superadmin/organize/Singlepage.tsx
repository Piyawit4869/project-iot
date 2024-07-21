import { DynamicForm } from '@src/forms';

import {
  Link,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import { Row, Form, Flex } from 'antd';
import { branchColumns } from './organizeData';
import { TableComponent } from '@src/components/shared/TableComponent';
import { FormButtonsEdit } from '@src/components/shared/FormButtons';
import dayjs from 'dayjs';
import React from 'react';
import { renderEditForm } from './renderForm';
import { TitleBar } from '@src/components/shared';
import { CreateButton } from '@src/components/shared/CreateButton';

export const OrganizeSingle: React.FC = () => {
  const { organize, branches, param } = useLoaderData() as any;

  const [form] = Form.useForm();
  const submit = useSubmit();

  const [loading, setLoading] = React.useState<boolean>(true);
  const { state } = useNavigation();

  const formatDate = (isoDateString: any) => {
    return dayjs(isoDateString).format('DD/MM/YYYY');
  };

  const onFinish = (values: any) => {
    const payload = { ...values };
    payload.openingDate = formatDate(payload.openingDate);
    payload.active = true;
    payload.addressData = [];
    payload.branchesData = [];
    payload.userData = [];
    payload.descriptions = '-';
    payload.logoUrl =
      'https://cdn.discordapp.com/attachments/1235856320280924213/1244954526155542598/575757.png?ex=6656fdc1&is=6655ac41&hm=96242e1d5d4f232411d9434a17f5053d4a7e6c788030f515e5da25d03813da86&';

    submit(
      { data: JSON.stringify(payload), action: 'edit' },
      { method: 'put' },
    );
  };

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  React.useEffect(() => {
    let businessRegister = null;
    if (organize && organize.openingDate) {
      businessRegister = dayjs(organize.openingDate);
    }
    form.setFieldsValue({
      ...organize,
      openingDate: businessRegister,
    });
  }, [form, organize]);

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <FormButtonsEdit form={form} />
        <Row gutter={20} style={{ paddingTop: '20px' }}>
          {renderEditForm.map((item: any, index: number) => {
            return (
              <DynamicForm
                key={index}
                name={item.name}
                label={item.label}
                placeholder={item.placeholder}
                type={item.type}
                col={item.col}
                icon={item.icon}
                value={item.value}
                ruleMessage={item.message}
                require={item.require}
                option={item.options}
                disabled={item.disabled}
                checked={item.checked}
                maxLength={item.maxLength}
                validator={item.validator}
                form={form}
              />
            );
          })}
        </Row>
      </Form>

      <Flex vertical gap={'small'}>
        {/* Title section from title component */}
        <TitleBar
          title={'ตั้งค่าสาขา'}
          buttons={[
            <Link to={'#'}>
              <CreateButton label={'เพิ่มข้อมูลสาขา'} />
            </Link>,
          ]}
        />

        {/* Filter section from search bar component */}
        {/* <div style={{ height: '25px' }} />
        <SearchBar /> */}

        {/* Index data from table component */}
        <TableComponent
          columns={branchColumns}
          dataSource={branches}
          loading={loading || state === 'loading' || state === 'submitting'}
          pagination={{
            current: param && param.page ? Number(param?.page) : 1,
            pageSize: param && param.limit ? Number(param?.limit) : 10,
            total: organize && organize.meta ? organize.meta.totalItems : 10,
            showTotal: (total: any, range: any) =>
              `${range[0]}-${range[1]} ของ ${total} สาขาทั้งหมด`,
          }}
          bordered
        />
      </Flex>
    </div>
  );
};
