import { CalendarComponent, TitleBar } from '@src/components/shared';
import { Button, Form } from 'antd';

export const AppointmentCreate = () => {
  return (
    <>
      <TitleBar
        title={'สร้างการนัดหมาย'}
        subTitle={'สร้างการนัดหมายเสร็จแล้วจะได้ลิงค์ Google Meet ไว้ใช้งาน'}
        buttons={[<Button type="primary">ยืนยัน</Button>]}
      />
      <Form layout="vertical">
        <div style={{ marginTop: '12px' }}>
          <CalendarComponent />
        </div>
      </Form>
    </>
  );
};
