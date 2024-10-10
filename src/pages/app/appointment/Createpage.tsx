import { CalendarComponent, TitleBar } from '@src/components/shared';
import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Segmented,
  Select,
  TimePicker,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Dayjs } from 'dayjs';
import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/th'; // Import Thai locale for dayjs
import * as API from '../../../apis';
import { json, redirect } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { GoogleOutlined } from '@ant-design/icons';

dayjs.locale('th');

const clientId =
  '23189663829-jbftuq5rc78ct17qkjd48f97lcmd28h0.apps.googleusercontent.com';

const clientSecret = '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';

async function loginWithGoogleAction(data: any) {
  try {
    const res = await API.auth.loginWithGoogle(data);
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
    notification.success({
      message: 'Login Success',
      placement: 'bottomRight',
      description: 'You have successfully logged in',
    });
    return redirect(
      data.user === 'super.admin@utotech.org' ? '/admin/analytic' : '/analytic',
    );
  } catch (error) {
    notification.error({
      message: 'Login Failed',
      placement: 'bottomRight',
      description: 'Invalid email or password',
    });

    return json({ status: 'error', message: 'Invalid email or password' });
  }
}

export const AppointmentCreate = () => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [system, setSystem] = React.useState('system');
  console.log(selectedDate);

  const onDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    console.log('Selected date:', date.format('YYYY-MM-DD'));
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        const tokensResponse = await axios.post(
          'https://oauth2.googleapis.com/token',
          {
            code: codeResponse.code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: 'http://localhost:8080',
            grant_type: 'authorization_code',
          },
        );

        const userInfoResponse = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokensResponse.data.access_token}`,
            },
          },
        );

        const response = {
          accessToken: tokensResponse.data.access_token,
          refreshToken: tokensResponse.data.refresh_token,
          type: 'web',
          provider: 'google',
          details: {
            idToken: tokensResponse.data.id_token,
            scopes: codeResponse.scope?.split(' ') || [],
            serverAuthCode: codeResponse.code,
            user: {
              email: userInfoResponse.data.email,
              familyName: userInfoResponse.data.family_name,
              givenName: userInfoResponse.data.given_name,
              id: userInfoResponse.data.sub,
              name: userInfoResponse.data.name,
              photo: userInfoResponse.data.picture,
            },
          },
        };

        await loginWithGoogleAction(response);
      } catch (error) {
        console.error('Error during login process:', error);
      }
    },
    onError: (errorResponse) => {
      console.error('Login Failed:', errorResponse);
    },
  });

  return (
    <>
      <TitleBar
        title={'สร้างการนัดหมาย'}
        subTitle={'สร้างการนัดหมายเสร็จแล้วจะได้ลิงค์ Google Meet ไว้ใช้งาน'}
        buttons={[<Button type="primary">ยืนยัน</Button>]}
      />
      <Form layout="vertical">
        <div style={{ marginTop: '12px' }}>
          <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <CalendarComponent
                fullWidth={false}
                onSelect={onDateSelect}
                headerRender={({ value, onChange }: any) => {
                  const start = 0;
                  const end = 12;
                  const monthOptions = [];

                  let current = value.clone();
                  const localeData = value.localeData();
                  const months = [];
                  for (let i = 0; i < 12; i++) {
                    current = current.month(i);
                    months.push(localeData.monthsShort(current));
                  }

                  for (let i = start; i < end; i++) {
                    monthOptions.push(
                      <Select.Option key={i} value={i} className="month-item">
                        {months[i]}
                      </Select.Option>,
                    );
                  }

                  const year = value.year();
                  const month = value.month();
                  const options = [];
                  for (let i = year - 10; i < year + 10; i += 1) {
                    options.push(
                      <Select.Option key={i} value={i} className="year-item">
                        {i}
                      </Select.Option>,
                    );
                  }
                  return (
                    <Row gutter={8} justify={'end'} style={{ margin: '8px' }}>
                      <Col>
                        <Select
                          popupMatchSelectWidth={false}
                          className="my-year-select"
                          value={year}
                          onChange={(newYear: any) => {
                            const now = value.clone().year(newYear);
                            onChange(now);
                          }}
                        >
                          {options}
                        </Select>
                      </Col>
                      <Col>
                        <Select
                          popupMatchSelectWidth={false}
                          value={month}
                          onChange={(newMonth: any) => {
                            const now = value.clone().month(newMonth);
                            onChange(now);
                          }}
                        >
                          {monthOptions}
                        </Select>
                      </Col>
                    </Row>
                  );
                }}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Row gutter={8}>
                <Col span={24}>
                  <Form.Item label="ตัวเลือกใช้งาน">
                    <Segmented
                      type="primary"
                      defaultValue="system"
                      options={[
                        { value: 'system', label: 'ระบบ' },
                        { value: 'google', icon: <GoogleOutlined /> },
                      ]}
                      onChange={(value) => {
                        setSystem(value);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    label="ชื่อการนัดหมาย"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'จำเป็นต้องกรอกชื่อการนัดหมาย',
                      },
                    ]}
                  >
                    <Input placeholder="กรอกชื่อการนัดหมาย" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    label="เวลานัดหมาย"
                    name="duedate"
                    rules={[
                      {
                        required: true,
                        message: 'จำเป็นต้องเลือกเวลานัดหมาย',
                      },
                    ]}
                  >
                    <TimePicker
                      use12Hours
                      format="h:mm a"
                      placeholder="กรุณาเลือกเวลานัดหมาย"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="ผู้เข้าร่วมนัดหมาย"
                name="joiners"
                rules={[
                  {
                    required: true,
                    message: 'จำเป็นต้องเลือกผู้เข้าร่วมนัดหมาย',
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="เลือกผู้เข้าร่วมนัดหมาย"
                  defaultValue={['Phuwis Watthana']}
                  onChange={handleChange}
                  options={employeeOptions}
                />
              </Form.Item>
              <Form.Item label="สถานที่" name="location">
                <TextArea placeholder="กรอกสถานที่" />
              </Form.Item>
              <Form.Item label="รายละเอียด" name="descriptions">
                <TextArea placeholder="กรอกรายละเอียด" />
              </Form.Item>
              {system === 'google' && (
                <Button
                  onClick={() => login()}
                  size="large"
                  type="primary"
                  htmlType="submit"
                  icon={<GoogleOutlined />}
                  style={{ width: '100%' }}
                >
                  เชื่อมต่อกับ Google
                </Button>
              )}
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
};

const employeeOptions = [
  {
    label: 'Phuwis Watthana',
    value: 'Phuwis Watthana',
  },
  {
    label: 'Employee 01',
    value: 'Employee 01',
  },
  {
    label: 'Employee 02',
    value: 'Employee 02',
  },
  {
    label: 'Employee 03',
    value: 'Employee 03',
  },
  {
    label: 'Employee 04',
    value: 'Employee 04',
  },
];
