import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';

import { useFetcher } from 'react-router-dom';
import { debounce } from 'lodash';

import buddhistEra from 'dayjs/plugin/buddhistEra';

dayjs.extend(buddhistEra);

interface WorkInfoFormProps {
  form: any;
  initialvalues?: any;
  onFinish: (values: any) => void;
}

const convertDate = (d: any) => {
  return d && dayjs(d);
};

export const WorkInfoForm = (props: WorkInfoFormProps) => {
  const { form, initialvalues, onFinish } = props;
  const fetcher = useFetcher(); // Using fetcher to load data
  const [users, setUsers] = useState<any>([]);

  const handleSeach = () => {
    fetcher.load('user-search');
  };

  // Debounced function for handling search input, delay is set to 3 seconds
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      fetcher.load(`user-search?name=${value}`);
    }, 500),
    [],
  );

  // Handle search input change
  const onSearch = (value: string) => {
    debouncedSearch(value); // Use the debounced version of search
  };
  // Filter users based on search input using useMemo for optimization

  React.useEffect(() => {
    if (initialvalues) {
      form.setFieldsValue({
        ...initialvalues,
        startDate: convertDate(initialvalues.startDate),
        dueDate: convertDate(initialvalues.dueDate),
        payDay: convertDate(initialvalues.payDay),
      });
    }
  }, [initialvalues]);

  // Update users when fetcher data changes
  useEffect(() => {
    if (fetcher.data && fetcher.data?.user) {
      setUsers(fetcher.data.user.items); // Type casting the fetched data as User[]
    }
  }, [fetcher.data]);

  return (
    <Row
      style={{
        width: '100%',
      }}
    >
      <Col span={18}>
        <Form
          form={form}
          onFinish={onFinish}
          name="work-info"
          initialValues={{
            active: true,
            isCurrent: true,
          }}
          labelAlign="left"
          wrapperCol={{ span: 10 }}
          labelCol={{ span: 6 }}
          style={{
            marginTop: 20,
          }}
        >
          <Form.Item valuePropName="checked" label="การมองเห็น" name="active">
            <Switch checkedChildren="เปิด" unCheckedChildren="ปิด" checked />
          </Form.Item>
          <Form.Item
            label="สถานะของงาน"
            valuePropName="checked"
            name="isCurrent"
          >
            <Switch
              checkedChildren="งานหลัก"
              unCheckedChildren="งานรอง"
              checked
            />
          </Form.Item>
          {/* 
        <Form.Item
          label="Status"
          name="status"
          required
          rules={[{ required: true, message: 'กรุณากรอกสถานะ!' }]}
        >
          <Select
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'In Active' },
            ]}
          />
        </Form.Item> */}

          {/* Name */}
          <Form.Item
            label="ชื่องาน"
            name="name"
            rules={[{ required: true, message: 'กรุณากรอกขื่อ!' }]}
          >
            <Input />
          </Form.Item>

          {/* Descriptions */}
          <Form.Item label="คำอธิบาย" name="descriptions">
            <TextArea rows={3} />
          </Form.Item>

          {/* Priority */}
          <Form.Item
            label="ความสำคัญ"
            name="priority"
            rules={[{ required: true, message: 'กรุณากรอกความสำคัญ!' }]}
          >
            <Select>
              <Select.Option value="low">ต่ำ</Select.Option>
              <Select.Option value="medium">ปานกลาง</Select.Option>
              <Select.Option value="high">สูง</Select.Option>
            </Select>
          </Form.Item>

          {/* Start Date */}
          <Form.Item
            label="วันเริ่มงาน"
            name="startDate"
            rules={[{ required: true, message: 'กรุณากรอกวันเริ่มงาน!' }]}
          >
            <DatePicker format="DD/MM/BBBB" placeholder="วัน/เดือน/ปี" />
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="วันจบงาน"
            rules={[{ required: true, message: 'กรุณากรอกวันจบงาน!' }]}
          >
            <DatePicker format="DD/MM/BBBB" placeholder="วัน/เดือน/ปี" />
          </Form.Item>

          {/* Limit Time */}
          <Form.Item
            label="เวลาทำงานของคนต่อวัน (ชม.)"
            name="limitTimePerDay"
            rules={[{ required: true, message: 'กรุณากรอก!' }]}
          >
            <InputNumber min={1} max={8} precision={0} />
          </Form.Item>

          {/* Start Credit */}
          <Form.Item
            label="ค่าจ้างของคนต่อชั่วโมง"
            name="startCredit"
            rules={[{ required: true, message: 'กรุณากรอก!' }]}
          >
            <InputNumber min={0} />
          </Form.Item>

          {/* Pay Day */}
          <Form.Item
            label="วันจ่ายเงิน"
            name="payDay"
            rules={[{ required: true, message: 'กรุณากรอกวัน!' }]}
          >
            <DatePicker format="DD/MM/BBBB" placeholder="วัน/เดือน/ปี" />
          </Form.Item>

          {/* Note */}
          <Form.Item label="หมายเหตุ" name="note">
            <TextArea />
          </Form.Item>

          {initialvalues?.id ? (
            <Form.Item name="userId" hidden>
              <Input />
            </Form.Item>
          ) : (
            <Form.Item
              label="Users"
              name="userIds"
              rules={[{ required: true, message: 'กรุณาเลือกพนักงาน!' }]}
            >
              <Select
                mode="multiple" // Enable multiple selection
                allowClear // Allow clear selection
                style={{ width: '100%' }} // Set full width
                placeholder="Select users" // Placeholder text
                filterOption={false} // Disable default filter since we handle it manually
                showSearch // Enable search input
                onClick={handleSeach}
                onSearch={onSearch} // Trigger search on input change
              >
                {users.map((user: any) => (
                  <Select.Option key={user.id} value={user.id}>
                    {user.email}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      </Col>

      <Col span={6}>
        {initialvalues && (
          <Card
            styles={{
              body: {
                // border: '2px solid black',
                // background: 'white',
                color: 'white',
              },
            }}
          >
            รายละเอียดพนักงาน
            <div>อีเมล : {initialvalues?.user.email}</div>
            <div>ชื่อผู้ใช้งาน : {initialvalues?.user.userName}</div>
          </Card>
        )}
      </Col>
    </Row>
  );
};
